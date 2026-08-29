# Next.js 16 + React 19 & Supabase SSR Conventions

## Architecture Guidelines
- **App Router**: Use Next.js 16 App Router conventions (`app/` directory).
- **React 19 Server Actions**: Mutations, form submissions, and status updates must use Server Actions (`'use server'`).
- **Async Cookie Handling**: In Next.js 16, `cookies()` is an asynchronous function. Always call `await cookies()` when retrieving cookies in server components or server actions.
- **Supabase SSR**: Always use `@supabase/ssr` for Supabase authentication and data access.
  - Client components: `createBrowserClient` from `@supabase/ssr`.
  - Server actions / Server components: `createServerClient` from `@supabase/ssr` with async cookie read/set adapters.
  - Never import or use deprecated `@supabase/auth-helpers-nextjs`.
- **Validation**: Validate all inputs using Zod schemas located in `lib/validations/` before database interactions.
- **Row Level Security (RLS)**: Enforce security at the database layer; use service role keys strictly when necessary and never expose service keys to the browser.
