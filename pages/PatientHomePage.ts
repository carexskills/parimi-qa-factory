import { type Page, type Locator } from '@playwright/test';

export class PatientHomePage {
  constructor(private readonly page: Page) {}

  get homeHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Home', exact: true });
  }

  get greeting(): Locator {
    return this.page.getByRole('heading', { name: 'Good to see you, Sam' });
  }
}
