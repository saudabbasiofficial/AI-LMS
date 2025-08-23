"use client"
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="py-3 px-5 md:px-20 flex justify-between items-center ">
        <a
          href="
        /"
        >
          <img src="/logo.png" alt="" className="h-20" />
        </a>
        <div className="flex gap-5 font-medium">
          <a href="/companian">Companian</a>
          <SignedOut>
            <SignInButton>

              <button>Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
          <a href="/profile">Profie</a>
            <UserButton/>
          </SignedIn>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
