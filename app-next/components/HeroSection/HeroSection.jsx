"use client";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-10 dark:bg-gray-900 ">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Discover and share{" "}
            <span className="text-orange-400">delicious</span>{" "}
            <span className="text-lime-700">dishes</span> made with love.
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Bringing People Together Through Tasty Homemade Meals
          </p>
          <div className="mt-6">
            <Link
              href="/meals"
              className="inline-block px-6 py-3 bg-lime-700 hover:bg-orange-400 text-white font-semibold rounded-lg transition"
            >
              Explore All Meals
            </Link>
          </div>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <Image
            src="/hero/hero.JPG"
            alt="Hero Image"
            width={400}
            height={400}
            className="w-full h-auto rounded-tr-3xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
