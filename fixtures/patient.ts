import { expect, test as base } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage.js';
import { SignInPage } from '../pages/SignInPage.js';

type PatientFixtures = {
  signedInSilverPatient: void;
  bookingPage: BookingPage;
  bookingCleanup: { track(providerName: string, slot: string): void };
};

type MailboxMessage = {
  code: string;
  receivedAt: string;
};

type MailboxResponse = {
  messages: MailboxMessage[];
};

const email = process.env.SILVER_PATIENT_EMAIL ?? 'silver@parimipractice.test';
const password = process.env.SILVER_PATIENT_PASSWORD ?? 'Silver@123';

export const test = base.extend<PatientFixtures>({
  signedInSilverPatient: async ({ page, request, baseURL }, use) => {
    if (!baseURL) {
      throw new Error('Playwright baseURL must be set to read the test inbox.');
    }

    await base.step('Use the seed sign-in flow for a Silver patient', async () => {
      const signInPage = new SignInPage(page);
      await signInPage.open();

      const signInStartedAt = Date.now();
      await signInPage.signIn(email, password);

      let message: MailboxMessage | undefined;
      await expect.poll(async () => {
        const response = await request.get(
          new URL(`/api/dev/mailbox?email=${encodeURIComponent(email)}`, baseURL).toString(),
        );
        if (!response.ok()) {
          throw new Error(`Test inbox returned ${response.status()}.`);
        }
        const inbox = (await response.json()) as MailboxResponse;
        message = inbox.messages.find((item) => Date.parse(item.receivedAt) > signInStartedAt);
        return message?.code;
      }, {
        message: 'A new one-time code should arrive in the test inbox after sign-in.',
        timeout: 15_000,
        intervals: [250, 500, 1_000],
      }).toBeTruthy();

      if (!message) {
        throw new Error('No new one-time code arrived in the test inbox.');
      }

      await signInPage.enterOneTimeCode(message.code);
      await expect(page).toHaveURL(/#\/patient\/home$/);
    });
    await use();
  },
  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },
  bookingCleanup: async ({ bookingPage }, use) => {
    const visits: { providerName: string; slot: string }[] = [];
    try {
      await use({ track: (providerName, slot) => { visits.push({ providerName, slot }); } });
    } finally {
      for (const { providerName, slot } of visits) {
        await base.step('Clean up the visit created by this test', async () => {
          await bookingPage.cancelVisit(providerName, slot);
        });
      }
    }
  },
});

export { expect };
