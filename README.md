# AlgDB Next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [shadcn/ui](https://ui.shadcn.com/) for components, PostgreSQL for the database, [Prisma](https://www.prisma.io/) as an ORM and database migration tool, and the [Vercel Platform](https://vercel.com/) for deployment.

## Getting Started

1. Run `npm install` to install dependencies.
1. Define the environment variables (see [below](#environment-variables)).
1. Run `npx prisma migrate reset` to create the database schema and seed it with data.
1. Run `npm run dev` to start the development server.
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The file `env.example` contains the required environment variables.
Create a `.env` file in the root directory, and copy the contents of `env.example`.

### Prisma Database URL

This project uses PostgreSQL for its database. Set up an instance of this yourself, and then set `DATABASE_URL` and `DIRECT_URL` accordingly.

Note: `DIRECT_URL` is only used for compatibility with pgBouncer in production, but still must be declared when running locally. It should have the same value as `DATABASE_URL`.

The hosted version of this project uses Supabase's PostgreSQL service as a database host, but does not use any additional features of Supabase.

### Seed Data Source

The database seeding script used in development is set up to copy non-sensitive data on the current public website through the `/api/data-export` endpoint. Set the environment variable `SEED_DATA_SOURCE` to the URL of the website (as of writing, `https://algdb.vercel.app/api/data-export`) and the populated data will be copied to the local database.

### NextAuth

Set `NEXTAUTH_URL` to the canonical URL of the site. Use `http://localhost:3000` for development.

Set `NEXTAUTH_SECRET` to a random value generated by:

```bash
openssl rand -base64 32
```

More details [here](https://next-auth.js.org/configuration/options#environment-variables).

### Setting up WCA OAuth

1. [Create an OAuth application](https://www.worldcubeassociation.org/oauth/applications/new).
2. Set the Redirect URI to `http://localhost:3000/api/auth/callback/wca` for development, or `https://{YOUR_DOMAIN}/api/auth/callback/wca` for production.
3. Set the Scopes to `public email` and click Submit.
4. Update your `.env` file with the credentials shown on the page. "Application ID" is the `WCA_CLIENT_ID`, and "Secret" is the `WCA_CLIENT_SECRET`.

### Setting up Google OAuth

1. Create a [new Google Cloud project](https://developers.google.com/workspace/guides/create-project).
2. On the [Credentials page](https://console.cloud.google.com/apis/credentials), click "Create credentials" and select "OAuth client ID".
3. Select "Web application" for Application type.
4. Enter the following information:

|                               | For development                                  | For production                                   |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Authorized JavaScript origins | `http://localhost:3000`                          | `https://{YOUR_DOMAIN}`                          |
| Authorized redirect URIs      | `http://localhost:3000/api/auth/callback/google` | `https://{YOUR_DOMAIN}/api/auth/callback/google` |

5. Update your `.env` file with the Google Client ID and Client secret shown in the "OAuth client created" dialog.
6. [Update the OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent).
