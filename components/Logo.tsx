"use client";
import Image from "next/image";
import React from "react";
import IndiaPost from "@/public/india-post.svg";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={IndiaPost}
        width="48"
        height="48"
        alt="PINSeek Logo"
        className="w-12 h-12"
        style={{ aspectRatio: "48/48", objectFit: "cover" }}
      />
    </Link>
  );
};
