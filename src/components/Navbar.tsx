"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function Navbar() {
  const { data: session }: any = useSession();
  return (
    <div>
      <ul className="flex justify-between m-10 items-center">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex gap-10">
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/register">
                <li>SignUp</li>
              </Link>
            </>
          ) : (
            <>
              {session?.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 mt-1 bg-blue-800 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
