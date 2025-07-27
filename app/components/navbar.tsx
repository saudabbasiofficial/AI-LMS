import { SignedOut, SignOutButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="py-3 px-5 md:px-20 flex justify-between ">
        <a
          href="
        /"
        >
          <img src="/next.svg" alt="" className="h-7" />
        </a>
        <div className="flex gap-5 font-medium">
          <a href="/companian">Companian</a>
          <a href="/profile">Profie</a>
          {/* <SignedOut> */}
          <a href="/login">Login</a>
          {/* </SignedOut> */}
          {/* <SignedOut> */}
          {/* <button
              onClick={() => {
                SignOutButton;
              }}
            >
              Logout
            </button> */}
          {/* </SignedOut> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
