# Requirement: patient sign-in with a one-time code

Source: product owner, sign-in policy
One line per rule: ID (severity): the rule.
BR-AUTH-01 (High): A patient signs in with email and password, then a 6-digit one-time code sent to their email.
BR-AUTH-02 (High): A wrong one-time code is refused, and the patient stays signed out.
BR-AUTH-03 (High): A one-time code expires 5 minutes after it is sent.
BR-AUTH-04 (High): A locked account cannot sign in, and the patient sees that the account is locked.
