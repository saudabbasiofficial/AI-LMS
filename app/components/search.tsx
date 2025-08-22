"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";
  const [Searchquery, setSearchquery] = useState("");

  return (
    <>
      <section>

        <input type="text" className="border border-gray-300 rounded-2xl" />
      </section>
    </>
  );
};

export default Search;
