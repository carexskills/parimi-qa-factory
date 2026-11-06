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
    const dateIso = await day.getAttribute('data-iso');
    if (!dateIso) throw new Error('Available calendar day must identify its date.');
    await this.loadSlots(() => day.click(), dateIso);
    // The previous date's buttons can remain visible while the new slots load.
    const time = this.dialog.getByRole('group', { name: 'Available times' })
      .locator(`button[data-start^="${dateIso}T"]`)
      .and(this.dialog.getByRole('button', { disabled: false })).first();
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
    await expect(this.dialog.getByRole('heading', { name: 'Visit booked', exact: true })).toBeVisible();
    await this.dialog.getByRole('button', { name: 'Done', exact: true }).click();
  }

  appointment(providerName: string, slot: string): Locator {
    return this.page.getByRole('row').filter({ hasText: providerName }).filter({ hasText: slot });
  }

  appointmentReason(providerName: string, slot: string, reason: string): Locator {
    return this.appointment(providerName, slot).getByText(reason, { exact: true });
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
      await expect(visit).toBeHidden();
    } finally {
      this.page.removeListener('dialog', acceptCancellation);
    }
  }

  async openFor(providerName: string): Promise<void> {
    const provider = this.page.getByRole('article').filter({ hasText: providerName });
    await this.loadSlots(() => provider.getByRole('button', { name: 'Book' }).click());
    await expect(this.dialog.getByRole('heading', { name: new RegExp(`Book with ${providerName}`) })).toBeVisible();
  }

  async chooseVisitType(visitType: 'In person' | 'Video visit'): Promise<void> {
    await this.dialog.getByRole('radio', { name: visitType }).check();
  }

  private async loadSlots(click: () => Promise<void>, dateIso?: string): Promise<void> {
    const slotsResponse = this.page.waitForResponse((response) => {
      const url = new URL(response.url());
      return /\/providers\/[^/]+\/slots$/.test(url.pathname)
        && response.request().method() === 'GET'
        && response.ok()
        && (!dateIso || url.searchParams.get('date') === dateIso);
    });
    await click();
    await slotsResponse;
  }

  async enterReason(reason: string): Promise<void> {
    await this.dialog.getByRole('textbox', { name: 'Reason for visit' }).fill(reason);
  }

  async confirmBooking(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Confirm booking' }).click();
  }
}
