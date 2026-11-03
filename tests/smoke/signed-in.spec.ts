// Spec: signed-in Silver patient home; BR-IDs: none (navigation smoke test).
import { expect, test } from '../../fixtures/patient.js';

test('signed-in Silver patient sees the patient home page', async ({ page, signedInSilverPatient }) => {
  void signedInSilverPatient;
  await expect(page.getByRole('heading', { name: 'Home', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Good to see you, Sam' })).toBeVisible();
});
