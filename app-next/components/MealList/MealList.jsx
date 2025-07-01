"use client";
import { useState, useEffect } from "react";
import MealCard from "./Meal";
import api from "../../utils/api";

const MealList = ({
  limit,
  title = "Popular Dishes",
  backGround = "bg-lime-60",
}) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(api("/meals"));
        const data = await response.json();
        setMeals(limit ? data.slice(0, limit) : data);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    };

    fetchMeals();
  }, [limit]);

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
