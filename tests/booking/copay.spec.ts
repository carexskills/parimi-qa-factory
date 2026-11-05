// Spec: specs/booking.md; BR-IDs: BR-BOOK-04.
import { expect, test } from '../../fixtures/patient.js';

test.describe('Booking a visit', () => {
  test('BR-BOOK-04-A — @BR-BOOK-04 Silver standard price before booking', async ({ signedInSilverPatient, bookingPage }) => {
    void signedInSilverPatient;
    // 1. As the signed-in Silver patient, choose a standard visit and inspect its price before confirming.
    await bookingPage.findCare();
    await bookingPage.openFor('Daniel Okafor');
    try {
      await bookingPage.chooseVisitType('In person');
      await expect(bookingPage.standardVisitLabel).toBeVisible();
      await expect(bookingPage.copay, 'BR-BOOK-04: Silver standard visit copay is exactly $15.00').toHaveText('Your copay: $15.00');
    } finally {
      // Close the unconfirmed booking without creating a visit.
      await bookingPage.close();
    }
  });
});
