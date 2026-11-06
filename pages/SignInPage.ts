import { expect, type Page } from '@playwright/test';

export class SignInPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: 'Sign in to ParimiPractice' })).toBeVisible();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await expect(this.page.getByRole('heading', { name: 'Verify it’s you' })).toBeVisible();
  }

  async enterOneTimeCode(code: string): Promise<void> {
    for (const [index, digit] of [...code].entries()) {
      await this.page.getByRole('textbox', { name: `Digit ${index + 1} of 6` }).fill(digit);
    }
    await this.page.waitForURL(/#\/patient\/home$/);
  }
}
