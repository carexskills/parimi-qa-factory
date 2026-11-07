// Spec: specs/booking.md; BR-IDs: BR-BOOK-01.
// Seed: tests/seed.spec.ts.
import { expect, test } from '../../fixtures/patient.js';

test.describe('Booking a visit', () => {
  test('CASE-BOOK-01-01 — @BR-BOOK-01 Book an open future slot', async ({ signedInSilverPatient, bookingPage, bookingCleanup }) => {
    void signedInSilverPatient;
    await test.step('Open Find care', async () => {
      await bookingPage.findCare();
    });
    await test.step('Open booking for Daniel Okafor', async () => {
      await bookingPage.openFor('Daniel Okafor');
    });
    await test.step('Choose an in-person visit', async () => {
      await bookingPage.chooseVisitType('In person');
    });
    const slot = await test.step('Choose a future open slot', async () => bookingPage.chooseFutureOpenSlot());
    bookingCleanup.track('Daniel Okafor', slot);
    await test.step('Confirm the booking', async () => {
      await bookingPage.confirmBooking();
    });
    await test.step('Finish booking and show appointments', async () => {
      await bookingPage.finishBooking();
    });
    await test.step('BR-BOOK-01: booking is accepted for the open future slot', async () => {
      await expect(bookingPage.appointment('Daniel Okafor', slot), 'BR-BOOK-01: booking is accepted for the open future slot').toBeVisible();
    });
  });
});
