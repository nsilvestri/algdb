import { NextAuthOptions, TokenSet } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/global-prisma-client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      // WCA OAuth Provider
      // Docs: https://docs.worldcubeassociation.org/knowledge_base/v0_api.html
      id: "wca",
      name: "WCA",
      type: "oauth",
      authorization: {
        url: "https://www.worldcubeassociation.org/oauth/authorize",
        params: {
          scope: "public email",
        },
      },
      token: {
        async request({ params, provider }) {
          const res = await fetch(
            "https://www.worldcubeassociation.org/oauth/token",
            {
              method: "POST",
              headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "authorization_code",
                code: params.code!,
                client_id: provider.clientId!,
                client_secret: provider.clientSecret!,
                redirect_uri: provider.callbackUrl!,
              }),
            }
          ).then((res) => res.json());

          const tokens: TokenSet = {
            access_token: res.access_token,
            expires_at: res.expires_at,
            refresh_token: res.refresh_token,
            scope: res.scope,
            token_type: res.token_type,
            session_state: res.open_id,
          };
          return {
            tokens,
          };
        },
      },
      userinfo: "https://www.worldcubeassociation.org/api/v0/me",
      profile(profile) {
        return {
          id: profile.me.id,
          name: profile.me.name,
          image: profile.me.avatar.thumb_url,
          email: profile.me.email,
          role: "user",
          wcaId: profile.me.wca_id,
        };
      },
      clientId: process.env.WCA_CLIENT_ID!,
      clientSecret: process.env.WCA_CLIENT_SECRET!,
    },
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
          email: profile.email,
          role: "user",
        };
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;
      session.user.wcaId = user.wcaId;
      return session;
    },
  },
  // pages: {
  //   // TODO: implement custom sign-in page
  //   signIn: "/login",
  // },
};
