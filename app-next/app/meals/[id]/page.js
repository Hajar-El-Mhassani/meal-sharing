"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import ReservationModal from "@/components/MealByID/ReservationModal";
import SuccessModal from "@/components/MealByID/SuccessModal";
import MealDetails from "@/components/MealByID/MealsDetails";
import BackButton from "@/components/MealByID/BackButton";

export default function MealByIdPage() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    number_of_guests: "1",
  });

  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [reservationError, setReservationError] = useState("");
  const fetchMeal = () => {
    fetch(api(`/meals/${id}`))
      .then((res) => res.json())
      .then(setMeal)
      .catch((error) => {
        console.error("Failed to fetch meal:", error);
        alert("Could not load the meal. Please try again later.");
      });
  };
  useEffect(() => {
    fetchMeal();
    // Update the meal every 5 seconds
    const interval = setInterval(() => {
      fetchMeal();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [id]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setReservationError("");

    try {
      const response = await fetch(api("/reservations"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal_id: meal.id, ...formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 409 || response.status === 400) {
          setReservationError(errorData.message || "Invalid input.");
          return;
        }

        alert("Something went wrong. Please try again later.");
        return;
      }

      // Success: reset
      setShowModal(false);
      setSuccessModal(true);
      setFormData({
        contact_name: "",
        contact_email: "",
        contact_phonenumber: "",
        number_of_guests: "1",
      });
    } catch (err) {
      console.error("Reservation failed:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

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
          onReserveClick={() => {
            setShowModal(true);
          }}
        />
      </div>

      {showModal && (
        <ReservationModal
          meal={meal}
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowModal(false);
            setReservationError("");
          }}
          errorMessage={reservationError}
        />
      )}

      {successModal && <SuccessModal onClose={() => setSuccessModal(false)} />}
    </section>
  );
}
