"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children?: React.ReactNode;
  session?: Session | null;
}

export const Provider = ({ children, session }: ProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
