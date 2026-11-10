import { type Locator, type Page } from '@playwright/test';

export class BookingPage {
  private readonly dialog: Locator;

  constructor(private readonly page: Page) {
    this.dialog = page.getByRole('dialog');
  }

  async openFor(providerName: string): Promise<void> {
    const provider = this.page.getByRole('article').filter({ hasText: providerName });
    await provider.getByRole('button', { name: 'Book' }).click();
    await this.dialog.getByRole('heading', { name: new RegExp(`Book with ${providerName}`) }).waitFor({ state: 'visible' });
  }

  async chooseVisitType(visitType: 'In person' | 'Video visit'): Promise<void> {
    await this.dialog.getByRole('radio', { name: visitType }).check();
  }

  async chooseDate(date: string): Promise<void> {
    await this.dialog.getByRole('button', { name: date, exact: true }).click();
  }

  async chooseTime(time: string): Promise<void> {
    await this.dialog.getByRole('button', { name: time, exact: true }).click();
  }

  async enterReason(reason: string): Promise<void> {
    await this.dialog.getByRole('textbox', { name: 'Reason for visit' }).fill(reason);
  }

  async confirmBooking(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Confirm booking' }).click();
  }
}
