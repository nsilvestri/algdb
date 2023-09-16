import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
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
          scope: "public",
        },
      },
      token: "https://www.worldcubeassociation.org/oauth/token",
      userinfo: "https://www.worldcubeassociation.org/api/v0/me",
      profile(profile) {
        return {
          id: profile.me.id,
          name: profile.me.name,
          image: profile.me.avatar.thumb_url,
          // TODO: get WCA ID
        };
      },
      clientId: process.env.WCA_CLIENT_ID!,
      clientSecret: process.env.WCA_CLIENT_SECRET!,
    },
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // pages: {
  //   // TODO: implement custom sign-in page
  //   signIn: "/login",
  // },
};
