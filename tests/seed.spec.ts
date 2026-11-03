// Spec: signed-in Silver patient home (seed); BR-IDs: none (starting-state check).
import { test, expect } from '../fixtures/patient.js';

test('signed-in Silver patient sees the patient home page', async ({ page, signedInSilverPatient }) => {
  void signedInSilverPatient;
  await expect(page.getByRole('heading', { name: 'Home', exact: true })).toBeVisible();
});
