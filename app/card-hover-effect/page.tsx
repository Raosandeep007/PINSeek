"use client";
import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <section className="min-h-dvh overflow-auto p-10 bg-white/90 w-full">
      <div className="list flex flex-wrap gap-1 min-h-dvh justify-center items-center w-full">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="item flex-shrink-0">
            <Image
              src={`https://picsum.photos/${index + 1 * 200}/${
                index + 1 * 400
              }`}
              width={150}
              height={300}
              alt=""
              className="rounded-lg flex-shrink-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default Page;
