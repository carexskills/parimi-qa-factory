// Spec: signed-in Silver patient home (seed); BR-IDs: none (starting-state check).
import { test, expect } from '../fixtures/patient.js';

test('signed-in Silver patient sees the patient home page', async ({ patientHomePage, signedInSilverPatient }) => {
  void signedInSilverPatient;
  await test.step('Check the patient home heading', async () => {
    await expect(patientHomePage.homeHeading).toBeVisible();
  });
});
