# Auth policy (plain English)

How tests sign in. One rule per line.
A test never contains an email or a password. Both come from a .env file that git ignores.
A setup step signs in once, with the code from the test inbox, and saves the signed-in state.
Every other test starts from the saved state. It never signs in again.
A missing value stops the run with a clear message. There is no default.
