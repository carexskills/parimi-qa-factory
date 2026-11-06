// Spec: signed-in Silver patient home; BR-IDs: none (navigation smoke test).
import { expect, test } from '../../fixtures/patient.js';

test('signed-in Silver patient sees the patient home page', async ({ patientHomePage, signedInSilverPatient }) => {
  void signedInSilverPatient;
  await test.step('Check the patient home heading', async () => {
    await expect(patientHomePage.homeHeading).toBeVisible();
  });
  await test.step('Check the Silver patient greeting', async () => {
    await expect(patientHomePage.greeting).toBeVisible();
  });
});
