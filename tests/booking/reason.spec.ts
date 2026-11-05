// Spec: specs/booking.md; BR-IDs: BR-BOOK-06.
import { expect, test } from '../../fixtures/patient.js';

test.describe('Booking a visit', () => {
  test('BR-BOOK-06-A — @BR-BOOK-06 Empty booking reason defaults to General visit', async ({ signedInSilverPatient, bookingPage }) => {
    void signedInSilverPatient;
    // 1. Leave Reason for visit empty and confirm an otherwise valid booking.
    await bookingPage.findCare();
    await bookingPage.openFor('Daniel Okafor');
    await bookingPage.chooseVisitType('In person');
    const slot = await bookingPage.chooseFutureOpenSlot();
    await bookingPage.enterReason('');
    await expect(bookingPage.reasonInput).toBeEmpty();
    try {
      await bookingPage.confirmBooking();
      await bookingPage.finishBooking();
      await expect(bookingPage.appointment('Daniel Okafor', slot).getByText('General visit', { exact: true }), 'BR-BOOK-06: empty reason becomes General visit').toBeVisible();
    } finally {
      // Cancel the created visit before the test ends, including on assertion failure.
      await bookingPage.cancelVisit('Daniel Okafor', slot);
    }
  });
});
