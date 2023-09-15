"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ClientSessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function ClientSessionProvider({
  children,
  session,
}: ClientSessionProviderProps): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
