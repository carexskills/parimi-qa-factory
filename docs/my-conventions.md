# Framework conventions (plain English)

One rule per line. Codex follows them for every page object and fixture.
One page object per screen, in pages/, named after the screen, like SignInPage or BookingPage.
Find elements the way a patient does: by role, label or visible text. Never by CSS class or generated id.
Page object methods are user actions in plain words, like signIn, chooseFirstOpenSlot, confirmBooking.
Page objects never check business rules. Tests do, with the BR-ID in the step name.
Fixtures live in fixtures/. A test asks for a signed-in patient; it never signs in by itself.
One-time codes come from the test inbox, never typed into the code.
No fixed waits. Wait for something a patient can see.
