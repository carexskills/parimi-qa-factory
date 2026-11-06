// Spec: docs/auth-policy.md; BR-IDs: none (shared authentication setup).
import { mkdir, rm } from 'node:fs/promises';
import { test as setup, expect } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage.js';

type Message = { id: string; code: string; receivedAt: string };

setup('Sign in the Silver patient once and save the session', async ({ page, request }) => {
  const email = process.env.SILVER_PATIENT_EMAIL!;
  const password = process.env.SILVER_PATIENT_PASSWORD!;
  const statePath = '.auth/silver-patient.json';
  const inbox = async (): Promise<Message[]> => {
    const response = await request.get(`/api/dev/mailbox?email=${encodeURIComponent(email)}`);
    if (!response.ok()) throw new Error(`Test inbox returned ${response.status()}.`);
    return ((await response.json()) as { messages: Message[] }).messages;
  };
  let previousIds: Set<string>;
  const signInPage = new SignInPage(page);
  await setup.step('Prepare a fresh Silver patient sign-in', async () => {
    await mkdir('.auth', { recursive: true, mode: 0o700 });
    await rm(statePath, { force: true });
    previousIds = new Set((await inbox()).map((message) => message.id));
    await signInPage.open();
  });
  await setup.step('Submit the configured Silver patient credentials', async () => {
    await signInPage.signIn(email, password);
  });
  await setup.step('Read a fresh code from the test inbox and finish sign-in', async () => {
    let message: Message | undefined;
    await expect.poll(async () => {
      message = (await inbox()).filter((item) => !previousIds.has(item.id))
        .sort((a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt))[0];
      return Boolean(message?.code);
    }, { message: 'A fresh sign-in code must arrive in the test inbox.', timeout: 15_000 }).toBe(true);
    if (!message) throw new Error('No fresh sign-in code arrived in the test inbox.');
    await signInPage.enterOneTimeCode(message.code);
  });
  await setup.step('Save the authenticated browser state', async () => {
    await page.context().storageState({ path: statePath });
  });
});
