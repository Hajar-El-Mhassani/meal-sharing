"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MealCard from "./Meal";

import api from "../../utils/api";

import type { Meal } from "../../types/meal";

type Props = {
  limit?: number;
  title?: string;
  backGround?: string;
};

/**
 * A component that displays a list of meals.
 *
 * @param {number} [limit] - The number of meals to display.
 * @param {string} [title] - The title of the list of meals.
 * @param {string} [backGround] - The background color of the list of meals.
 *
 * @returns {React.ReactElement} - A React component that displays a list of meals.
 */
export default function MealList({
  limit,
  title = "Popular Dishes",
  backGround = "bg-amber-300 dark:bg-gray-800",
}: Props) {
  const searchParams = useSearchParams();

  // State for meals and loading status
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const qs = searchParams.toString();
        const url = api(`/meals${qs ? `?${qs}` : ""}`);

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(
            (await res.text().catch(() => res.statusText)) ||
              `HTTP ${res.status}`
          );
        }

        const data = (await res.json()) as Meal[];
        const sliced = limit ? data.slice(0, limit) : data;

        if (!cancelled) setMeals(sliced);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
        if (!cancelled) setMeals([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // Only refresh when query params change
  }, [searchParams.toString(), limit]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className={`w-full py-10 ${backGround}`}>
      {title && (
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          {title}
        </h2>
      )}

      <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
        {meals.length > 0 ? (
          meals.map((meal) => <MealCard key={meal.id} meal={meal} />)
        ) : (
          <p>No meals found.</p>
        )}
      </div>
    </section>
  );
}
