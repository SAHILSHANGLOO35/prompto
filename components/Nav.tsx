"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";

export const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setProvidersFn = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setProvidersFn();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/images/logo.svg"
          width={30}
          height={30}
          alt="Icon or Logo of Prompto Web application"
          className="object-contain"
        />
        <p className="logo_text">Prompto</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile Image"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */} {/* -->1:10:30 continue */}
      <div></div>
    </nav>
  );
};
