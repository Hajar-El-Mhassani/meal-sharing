"use client";
import React, { useState, useEffect } from "react";
import styles from "./MealList.module.css";
import MealCard from "./Meal";
import api from "../../utils/api";
const MealList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(api("/meals"));
        const data = await response.json();

        setMeals(data);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <section className={styles.sectionMeal}>
      <h2>Meals</h2>
      <div className={styles.meals}>
        {meals.map((meal) => (
          <MealCard {...meal} key={meal.id} />
        ))}
      </div>
    </section>
  );
};

export default MealList;
