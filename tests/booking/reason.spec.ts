// Spec: specs/booking.md; BR-IDs: BR-BOOK-06.
// Seed: tests/seed.spec.ts.
import { expect, test } from '../../fixtures/patient.js';

test.describe('Booking a visit', () => {
  test('BR-BOOK-06-A — @BR-BOOK-06 Empty booking reason defaults to General visit', async ({ signedInSilverPatient, bookingPage, bookingCleanup }) => {
    void signedInSilverPatient;
    // 1. Leave Reason for visit empty and confirm an otherwise valid booking.
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
    await test.step('Leave Reason for visit empty', async () => {
      await bookingPage.enterReason('');
    });
    await test.step('Check that Reason for visit is empty', async () => {
      await expect(bookingPage.reasonInput).toBeEmpty();
    });
    bookingCleanup.track('Daniel Okafor', slot);
    await test.step('Confirm the booking', async () => {
      await bookingPage.confirmBooking();
    });
    await test.step('Finish booking and show appointments', async () => {
      await bookingPage.finishBooking();
    });
    await test.step('BR-BOOK-06: empty reason becomes General visit', async () => {
      await expect(bookingPage.appointmentReason('Daniel Okafor', slot, 'General visit'), 'BR-BOOK-06: empty reason becomes General visit').toBeVisible();
    });
  });
});
