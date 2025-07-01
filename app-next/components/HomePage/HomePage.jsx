import Link from "next/link";
import MealList from "@/components/MealList/MealList";

export default function HomePage() {
  return (
    <section className="px-6 sm:px-10 lg:px-20 py-2 max-w-screen-xl mx-auto text-center bg-lime-50 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-[960px]">
        <MealList limit={4} />
      </div>
    </section>
  );
}
