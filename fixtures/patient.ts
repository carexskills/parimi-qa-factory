import { expect, test as base } from '@playwright/test';
import { PatientHomePage } from '../pages/PatientHomePage.js';
import { BookingPage } from '../pages/BookingPage.js';

type PatientFixtures = {
  signedInSilverPatient: void;
  bookingPage: BookingPage;
  patientHomePage: PatientHomePage;
  bookingCleanup: { track(providerName: string, slot: string): void };
};

export const test = base.extend<PatientFixtures>({
  signedInSilverPatient: async ({ page }, use) => {
    await base.step('Open the saved Silver patient session', async () => {
      await page.goto('/#/patient/home');
      await expect(page).toHaveURL(/#\/patient\/home$/);
    });
    await use();
  },
  patientHomePage: async ({ page }, use) => {
    await use(new PatientHomePage(page));
  },
  bookingPage: async ({ page }, use, testInfo) => {
    const bookingPage = new BookingPage(page, testInfo.parallelIndex, testInfo.config.workers);
    try {
      await use(bookingPage);
    } finally {
      await base.step('Close any remaining booking dialog', async () => {
        await bookingPage.closeIfOpen();
      });
    }
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
