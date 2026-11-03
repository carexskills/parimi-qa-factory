# Copay spec formats

## Same rule, two formats

| Idea | Gherkin | Markdown |
|---|---|---|
| Rule ID | `BR-BOOK-04` | `BR-BOOK-04` |
| Who | Patient on the Silver plan | Patient on the Silver plan |
| Action | Books a standard visit | Books a standard visit |
| Checks | $15.00 before booking, on confirmation, and on receipt | $15.00 before booking, on confirmation, and on receipt |

## Planned test steps

- **Gherkin:** Given a Silver patient; book a standard visit; check the pre-booking copay is $15.00; check confirmation copay is $15.00; check receipt copay is $15.00.
- **Markdown:** Set up a Silver patient; book a standard visit; check the copay before booking, on confirmation, and on the receipt is $15.00.
- **Same test?** Yes. Both specify the same patient, action, and three copay checks.

## Best suited to

- **Product owner:** Markdown, for a quick rule summary.
- **Tester:** Gherkin, for explicit, ordered test steps.
- **Agent:** Gherkin, for clear Given/When/Then structure and check points.
