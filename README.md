# AI Mindset and Adoption Program

Static review prototype for the AI Council manager-led AI adoption program.

## What This Version Is For

- Reviewing the program narrative, pillars, manager intake, and admin dashboard concept.
- Demoing how manager inputs can turn into maturity heatmaps, blocker trends, support needs, and commitments.
- Sharing with stakeholders through GitHub Pages for feedback.

## Important Demo Notes

- This is a static prototype.
- Manager submissions are stored in the visitor's browser using `localStorage`.
- The admin gate is demo-only and is not real authentication.
- Do not collect sensitive, confidential, IPF, promotion, or real manager feedback in this version.

For production, move to an authenticated app with a shared database and proper access control.

## GitHub Pages Setup

1. Push this folder to a GitHub repository.
2. In GitHub, open `Settings` -> `Pages`.
3. Set source to `Deploy from a branch`.
4. Choose the branch, usually `main`, and folder `/root`.
5. Save and wait for the GitHub Pages URL.

## Demo Admin

The prototype admin password is:

```text
aicouncil
```

## Files

- `index.html` - site structure
- `styles.css` - visual design and responsive layout
- `app.js` - demo data, form behavior, dashboard rendering, and CSV export

