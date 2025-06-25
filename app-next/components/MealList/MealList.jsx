"use client";
import React, { useState, useEffect } from "react";
import styles from "./meallist.module.css";
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
          <div key={meal.id} className={styles.meal}>
            <img
              src="/meals/image.png"
              alt={meal.title}
              className={styles.mealImage}
            />
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>
              <strong>Date: </strong>
              {new Date(meal.when).toLocaleDateString("en-EN")}
            </p>
            <p>
              <strong>Location: </strong>
              {meal.location}
            </p>
            <p>
              <strong>Max reservation: </strong> {meal.max_reservation}
            </p>
            <p>
              <strong>Price:</strong> {meal.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MealList;
