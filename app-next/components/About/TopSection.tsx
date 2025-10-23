import type { JSX } from "react";
export default function TopSection(): JSX.Element {
  return (
    <section className="relative h-[30vh] flex items-center justify-center text-center text-black">
      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-orange-400">About Us</span>{" "}
        </h1>
        <p className="text-lg sm:text-xl text-gray-700">
          Discover our story, values, and mission to connect people through
          food.
        </p>
      </div>
    </section>
  );
}
