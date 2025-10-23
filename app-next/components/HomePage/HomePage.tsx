"use client";

import dynamic from "next/dynamic";
import type { JSX } from "react";

const MealList = dynamic(() => import("../../components/MealList/MealList"), {
  ssr: false,
});

export default function HomePage(): JSX.Element {
  return (
    <section className="px-6 sm:px-10 lg:px-20 py-2 max-w-screen-xl mx-auto text-center bg-amber-300 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-[960px]">
        <MealList limit={4} />
      </div>
    </section>
  );
}
