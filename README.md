# UK One Theory Frontend

Nuxt/Vue frontend MVP for the UK One Theory learner journey.

Implemented scope:

- Public landing page, pricing, sample question and FAQ states.
- Plan selection, unified mocked checkout and purchase confirmation.
- Login and password reset shells.
- Protected student dashboard, account, course, lesson, practice, mock exam, hazard, results and progress routes.
- Mocked service/composable layer for plans, profile, lessons, questions and results.
- Route guards for protected pages, expired access, missing checkout plan and authenticated login redirects.

Out of scope for this frontend pass:

- Admin / manager flow.
- Real backend calls.
- Real Stripe integration.

## Setup

Use Node 22 and pnpm.

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm preview
```
