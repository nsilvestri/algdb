# AlgDB Next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [shadcn/ui](https://ui.shadcn.com/) for components, [Planetscale](https://planetscale.com/) for the database, [Prisma](https://www.prisma.io/) as an ORM and database migration tool, and the [Vercel Platform](https://vercel.com/) for deployment.

## Getting Started

1. Run `npm install` to install dependencies.
1. This project uses Planetscale for its database. You can set up a Planetscale database yourself, or use a different MySQL-compatible database.
1. Create a `.env` file in the root directory. The file `env.example` contains the required environment variables.
1. Run `npx prisma db push` to push the database schema to your database.
1. Run `npx prisma db seed` to seed the database with initial data.
1. Run `npm run dev` to start the development server.
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting up Google OAuth

1. Create a [new Google Cloud project](https://developers.google.com/workspace/guides/create-project).
2. On the [Credentials page](https://console.cloud.google.com/apis/credentials), click "Create credentials" and select "OAuth client ID".
3. Select "Web application" for Application type.
4. Enter the following information:

|                               | For development                                  | For production                                   |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Authorized JavaScript origins | `http://localhost:3000`                          | `https://{YOUR_DOMAIN}`                          |
| Authorized redirect URIs      | `http://localhost:3000/api/auth/callback/google` | `https://{YOUR_DOMAIN}/api/auth/callback/google` |

5. Update your `.env` file with the Client ID and Client secret shown in the "OAuth client created" dialog.
6. [Update the OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent).
