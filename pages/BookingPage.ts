import { expect, type Locator, type Page } from '@playwright/test';

export class BookingPage {
  private readonly dialog: Locator;

  constructor(private readonly page: Page) {
    this.dialog = page.getByRole('dialog');
  }

  get copay(): Locator {
    return this.dialog.getByTestId('booking-copay');
  }

  get standardVisitLabel(): Locator {
    return this.dialog.getByText('Silver plan · standard visit', { exact: true });
  }

  get reasonInput(): Locator {
    return this.dialog.getByRole('textbox', { name: 'Reason for visit' });
  }

  async findCare(): Promise<void> {
    await this.page.getByRole('link', { name: 'Find care', exact: true }).click();
  }

  async close(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Close', exact: true }).click();
  }

  async chooseFutureOpenSlot(): Promise<string> {
    // The next calendar month guarantees that every enabled day is in the future.
    await this.dialog.getByRole('button', { name: 'Next month' }).click();
    const day = this.dialog.getByRole('grid').getByRole('button', { disabled: false }).first();
    const dateName = await day.getAttribute('aria-label');
    if (!dateName) throw new Error('Available calendar day must have an accessible date.');
    await day.click();
    const time = this.dialog.getByRole('group', { name: 'Available times' })
      .getByRole('button', { disabled: false }).first();
    await expect(time).toBeVisible();
    const timeName = await time.innerText();
    await time.click();
    const date = new Date(dateName);
    const dateSummary = new Intl.DateTimeFormat('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
    }).format(date);
    return `${dateSummary}, ${timeName}`;
  }

  async finishBooking(): Promise<void> {
    await this.dialog.getByRole('heading', { name: 'Visit booked', exact: true }).waitFor();
    await this.dialog.getByRole('button', { name: 'Done', exact: true }).click();
  }

  appointment(providerName: string, slot: string): Locator {
    return this.page.getByRole('row').filter({ hasText: providerName }).filter({ hasText: slot });
  }

  async cancelVisit(providerName: string, slot: string): Promise<void> {
    // Close either booking dialog so cleanup also runs after an assertion or confirmation error.
    if (await this.dialog.isVisible()) await this.close();
    await this.page.getByRole('link', { name: 'Appointments', exact: true }).click();
    await this.page.getByRole('tab', { name: 'Upcoming', exact: true }).click();
    const visit = this.appointment(providerName, slot);
    await expect(visit).toBeVisible();
    const acceptCancellation = (dialog: import('@playwright/test').Dialog): Promise<void> => dialog.accept();
    this.page.once('dialog', acceptCancellation);
    try {
      await visit.getByRole('button', { name: 'Cancel visit', exact: true }).click();
      await expect(visit).toHaveCount(0);
    } finally {
      this.page.removeListener('dialog', acceptCancellation);
    }
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
