// Spec: specs/booking.md; BR-IDs: BR-BOOK-06.
// Seed: tests/seed.spec.ts.
import { expect, test } from '../../fixtures/patient.js';

test.describe('Booking a visit', () => {
  test('CASE-BOOK-06-02 — @BR-BOOK-06 Empty booking reason defaults to General visit', async ({ signedInSilverPatient, bookingPage, bookingCleanup }) => {
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

  test('CASE-BOOK-06-03 — @BR-BOOK-06 Spaces-only booking reason defaults to General visit', async ({ signedInSilverPatient, bookingPage, bookingCleanup }) => {
    test.fail(true, 'PP-103: spaces-only booking reason is not defaulted to General visit');
    test.info().annotations.push({
      type: 'PP-103',
      description: 'Spaces-only booking reason is not defaulted to General visit.',
    });
    void signedInSilverPatient;
    // Open Find care to begin a valid booking
    await test.step('Open Find care', async () => {
      await bookingPage.findCare();
    });
    // Open booking for Daniel Okafor
    await test.step('Open booking for Daniel Okafor', async () => {
      await bookingPage.openFor('Daniel Okafor');
    });
    // Choose a valid visit type
    await test.step('Choose an in-person visit', async () => {
      await bookingPage.chooseVisitType('In person');
    });
    // Choose an open future slot
    const slot = await test.step('Choose a future open slot', async () => bookingPage.chooseFutureOpenSlot());
    // Enter a reason containing only spaces
    await test.step('Enter a reason containing only spaces', async () => {
      await bookingPage.enterReason('   ');
    });
    await test.step('Check that the reason contains only spaces', async () => {
      await expect(bookingPage.reasonInput).toHaveValue('   ');
    });
    bookingCleanup.track('Daniel Okafor', slot);
    // Confirm an otherwise valid booking
    await test.step('Confirm the booking', async () => {
      await bookingPage.confirmBooking();
    });
    await test.step('Finish booking and show appointments', async () => {
      await bookingPage.finishBooking();
    });
    await test.step('BR-BOOK-06: spaces-only reason becomes General visit', async () => {
      await expect(bookingPage.appointmentReason('Daniel Okafor', slot, 'General visit'), 'BR-BOOK-06: spaces-only reason becomes General visit').toBeVisible();
    });
  });

  test('CASE-BOOK-06-01 — @BR-BOOK-06 Nonempty booking reason is retained', async ({ signedInSilverPatient, bookingPage, bookingCleanup }) => {
    void signedInSilverPatient;
    const reason = 'BR-BOOK-06 reason retained';
    // Open Find care to begin a valid booking
    await test.step('Open Find care', async () => {
      await bookingPage.findCare();
    });
    // Open booking for Daniel Okafor
    await test.step('Open booking for Daniel Okafor', async () => {
      await bookingPage.openFor('Daniel Okafor');
    });
    // Choose a valid visit type
    await test.step('Choose an in-person visit', async () => {
      await bookingPage.chooseVisitType('In person');
    });
    // Choose an open future slot
    const slot = await test.step('Choose a future open slot', async () => bookingPage.chooseFutureOpenSlot());
    // Enter a distinctive nonempty reason
    await test.step('Enter a distinctive nonempty reason', async () => {
      await bookingPage.enterReason(reason);
    });
    bookingCleanup.track('Daniel Okafor', slot);
    // Confirm an otherwise valid booking
    await test.step('Confirm the booking', async () => {
      await bookingPage.confirmBooking();
    });
    await test.step('Finish booking and show appointments', async () => {
      await bookingPage.finishBooking();
    });
    await test.step('BR-BOOK-06: nonempty reason is retained exactly', async () => {
      await expect(bookingPage.appointmentReason('Daniel Okafor', slot, reason), 'BR-BOOK-06: nonempty reason is retained exactly').toBeVisible();
    });
  });
});
