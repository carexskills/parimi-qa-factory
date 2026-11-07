// Spec: specs/booking.md; BR-IDs: BR-BOOK-05.
// Seed: tests/seed.spec.ts.
import { expect, test } from '../../fixtures/patient.js';

test.describe('Booking a visit', () => {
  test('CASE-BOOK-05-01 — @BR-BOOK-05 Confirmation uses Riverbend clinic timezone', async ({ signedInSilverPatient, bookingPage, bookingCleanup }) => {
    void signedInSilverPatient;
    await test.step('Open Find care', async () => {
      await bookingPage.findCare();
    });
    await test.step('Open booking for Daniel Okafor at Riverbend Clinic', async () => {
      await bookingPage.openFor('Daniel Okafor');
    });
    await test.step('Choose an in-person visit', async () => {
      await bookingPage.chooseVisitType('In person');
    });
    const slot = await test.step('Choose a future open slot shown in clinic time', async () => bookingPage.chooseFutureOpenSlot());
    bookingCleanup.track('Daniel Okafor', slot);
    await test.step('Confirm the booking', async () => {
      await bookingPage.confirmBooking();
    });
    await test.step('Finish booking and show appointments', async () => {
      await bookingPage.finishBooking();
    });
    await test.step('BR-BOOK-05: confirmation appointment time matches the Riverbend clinic-local slot time', async () => {
      await expect(bookingPage.appointment('Daniel Okafor', slot), 'BR-BOOK-05: confirmation appointment time matches the Riverbend clinic-local slot time').toBeVisible();
    });
  });
});
