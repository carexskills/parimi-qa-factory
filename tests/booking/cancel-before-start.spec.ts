// Spec: specs/booking.md; BR-IDs: BR-BOOK-03.
// Seed: tests/seed.spec.ts.
import { expect, test } from '../../fixtures/patient.js';

test.describe('Booking a visit', () => {
  test('CASE-BOOK-03-01 — @BR-BOOK-03 Cancel a visit before its start time', async ({ signedInSilverPatient, bookingPage }) => {
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
    await test.step('Confirm the visit booking', async () => {
      await bookingPage.confirmBooking();
    });
    await test.step('Finish booking and show appointments', async () => {
      await bookingPage.finishBooking();
    });
    await test.step('BR-BOOK-03: cancel the visit before its start time', async () => {
      await bookingPage.cancelVisit('Daniel Okafor', slot);
    });
    await test.step('BR-BOOK-03: canceled visit is no longer in upcoming appointments', async () => {
      await expect(bookingPage.appointment('Daniel Okafor', slot), 'BR-BOOK-03: canceled visit is no longer in upcoming appointments').toBeHidden();
    });
  });
});
