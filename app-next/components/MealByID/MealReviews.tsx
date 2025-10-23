"use client";

import { useEffect, useState } from "react";
import api from "../../utils/api";
import type { Review, ReviewApi } from "../../types/review";
import type { JSX } from "react";
/// Props for MealReviews component
type MealReviewsProps = {
  mealId: number;
};

type ReviewForm = {
  title: string;
  description: string;
  stars: number;
};

/**
 * A component that displays a list of reviews for a meal and allows the user to submit a new review.
 *
 * @param {number} mealId - The id of the meal to fetch reviews for.
 *
 * @returns {React.ReactElement} - A React component that displays a list of reviews and a form to submit a new review.
 */
export default function MealReviews({ mealId }: MealReviewsProps): JSX.Element {
  //It’s an array of Review objects, and it's start as an empty array
  const [reviews, setReviews] = useState<Review[]>([]);
  //form state for the review form it object of type ReviewForm
  const [form, setForm] = useState<ReviewForm>({
    title: "",
    description: "",
    stars: 5,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch(api(`/meals/${mealId}/reviews`));
      const raw = (await res.json()) as ReviewApi[];

      if (!res.ok) throw new Error("Failed to load reviews");

      // map backend shape -> frontend shape
      const normalized: Review[] = raw.map((r) => ({
        id: r.review_id,
        mealId: r.meal_id,
        title: r.review_title,
        description: r.review_description,
        stars: r.stars,
        createdDate: r.created_date,
      }));

      setReviews(normalized);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [mealId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "stars" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(api("/reviews"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stars: Number(form.stars),
          meal_id: Number(mealId),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      setMessage("Review submitted successfully!");
      setForm({ title: "", description: "", stars: 5 });
      fetchReviews();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div className="mt-6 pt-1">
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {reviews.length > 0 ? (
        <ul className="space-y-3 mb-6">
          {reviews.map((r) => (
            <li key={r.id} className="bg-amber-200 p-3 rounded shadow">
              <p className="font-semibold">{r.title}</p>
              <p className="text-sm text-gray-600">{r.description}</p>
              <p className="text-yellow-500">⭐ {r.stars}/5</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(r.createdDate).toLocaleDateString("en-GB")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Review title"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Your review"
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="stars"
          value={form.stars}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>
              {s} Star{s > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <button className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
          Submit Review
        </button>
      </form>

      {message && <p className="text-green-700 mt-2">{message}</p>}
    </div>
  );
}
