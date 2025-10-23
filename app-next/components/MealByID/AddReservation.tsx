"use client";

import { useState } from "react";
import type { JSX, ChangeEvent, FormEvent } from "react";
import ReservationModal from "./ReservationModal";
import api from "../../utils/api";
import type { ReservationCreate, ApiError } from "../../types/reservation";
import type { Meal } from "../../types/meal";

interface AddReservationProps {
  meal: Meal;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ReservationFormState {
  contact_name: string;
  contact_email: string;
  contact_phonenumber: string;
  number_of_guests: number; //
}

export default function AddReservation({
  meal,
  open,
  onClose,
  onSuccess,
}: AddReservationProps): JSX.Element | null {
  const [formData, setFormData] = useState<ReservationFormState>({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    number_of_guests: 1,
  });

  const [reservationError, setReservationError] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "number_of_guests" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReservationError("");

    const payload: ReservationCreate = {
      meal_id: meal.id,
      contact_name: formData.contact_name.trim(),
      contact_email: formData.contact_email.trim(),
      contact_phonenumber: formData.contact_phonenumber.trim(),
      number_of_guests: formData.number_of_guests || 0,
    };

    try {
      const response = await fetch(api("/reservations"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorData: ApiError | undefined;
        try {
          errorData = (await response.json()) as ApiError;
        } catch {
          /* ignore parse error */
        }

        if (response.status === 409 || response.status === 400) {
          setReservationError(errorData?.message || "Invalid input.");
          return;
        }

        setReservationError("Something went wrong. Please try again later.");
        return;
      }

      onClose();
      onSuccess();
      setFormData({
        contact_name: "",
        contact_email: "",
        contact_phonenumber: "",
        number_of_guests: 1,
      });
    } catch (err) {
      console.error("Reservation failed:", err);
      setReservationError("Something went wrong. Please try again later.");
    }
  };

  if (!open) return null;

  return (
    <ReservationModal
      meal={meal}
      formData={{ meal_id: meal.id, ...formData }}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      onClose={() => {
        setReservationError("");
        onClose();
      }}
      errorMessage={reservationError}
    />
  );
}
