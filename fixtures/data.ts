import { randomUUID } from 'node:crypto';

export type SyntheticPatient = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
};

/** Create a unique, synthetic patient for an isolated test run. */
export function createSyntheticPatient(): SyntheticPatient {
  const id = randomUUID();
  const suffix = id.replaceAll('-', '').slice(0, 12);
  const firstName = 'Test';
  const lastName = `Patient${suffix}`;

  return {
    id,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email: `patient-${suffix}@parimipractice.test`,
  };
}
