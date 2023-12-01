"use client";
import React from "react";
import "../styles/nav.css";
import Link from "next/link";

const Nav = () => {
  return (
    <div >
      <div className="flex flex-wrap justify-between py-4  px-12  nav ">
        <div className="inline-block brand">
          <Link href="/trading">
            <h1>STC</h1>
          </Link>
        </div>
        <div className=" flex gap-12 justify-between items-center">
          <h3 className="navlink">Trading</h3>
          <h3 className="navlink">NFT</h3>
          <h3 className="navlink">Startup Funding</h3>
          <h3 className="navlink">Dashboard</h3>
          <Link href="/signin">
            <button className="px-6 py-2  signInBtn   rounded-3xl   ">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
