"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { JSX } from "react";
import api from "../../../utils/api";
import BackButton from "../../../components/MealByID/BackButton";
import MealDetails from "../../../components/MealByID/MealsDetails";
import AddReservation from "../../../components/MealByID/AddReservation";
import SuccessModal from "../../../components/MealByID/SuccessModal";
import type { Meal } from "../../../types/meal";

export default function MealByIdPage(): JSX.Element {
  const params = useParams();
  const id = String(params.id);

  const [meal, setMeal] = useState<Meal | null>(null);
  const [showReservation, setShowReservation] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const fetchMeal = () => {
    fetch(api(`/meals/${id}`))
      .then((res) => res.json())
      .then((data: Meal) => setMeal(data))
      .catch((error) => {
        console.error("Failed to fetch meal:", error);
        alert("Could not load the meal. Please try again later.");
      });
  };

  useEffect(() => {
    fetchMeal();
    const interval = setInterval(fetchMeal, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (!meal) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <section className="max-w-screen-lg pt-20 mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Come enjoy a delicious meal with us in{" "}
          <span className="text-orange-400">{meal.location}</span>
        </h1>
      </div>

      <div className="space-y-8">
        <BackButton />
        <MealDetails
          meal={meal}
          onReserveClick={() => setShowReservation(true)}
        />
      </div>

      <AddReservation
        meal={meal}
        open={showReservation}
        onClose={() => setShowReservation(false)}
        onSuccess={() => setSuccessModal(true)}
      />

      {successModal && <SuccessModal onClose={() => setSuccessModal(false)} />}
    </section>
  );
}
