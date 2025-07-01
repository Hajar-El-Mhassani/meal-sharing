"use client";
import { useState, useEffect } from "react";
import MealCard from "./Meal";
import api from "../../utils/api";

const MealList = ({
  limit,
  title = "Popular Dishes",
  backGround = "bg-orange-400 dark:bg-gray-800",
}) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(api("/meals"))
      .then((res) => res.json())
      .then((data) => {
        setMeals(limit ? data.slice(0, limit) : data);
      })
      .catch((error) => {
        console.error("Failed to fetch meals:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className={`w-full py-6 ${backGround}`}>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        {title}
      </h2>
      <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </section>
  );
};

export default MealList;
