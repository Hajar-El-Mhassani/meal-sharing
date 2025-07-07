"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function MealReviews({ mealId }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    stars: 5,
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      console.log("Submitting review:", {
        ...form,
        stars: Number(form.stars),
        meal_id: Number(mealId),
      });

      const res = await fetch(api(`/meals/${mealId}/reviews`));
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load reviews");
      setReviews(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [mealId]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
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
      setError(err.message);
    }
  };

  return (
    <div className="mt-6  pt-1">
      {/* Review List */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {reviews.length > 0 ? (
        <ul className="space-y-3 mb-6">
          {reviews.map((review) => (
            <li
              key={review.review_id}
              className="bg-amber-200 p-3 rounded shadow"
            >
              <p className="font-semibold">{review.review_title}</p>
              <p className="text-sm text-gray-600">
                {review.review_description}
              </p>
              <p className="text-yellow-500">⭐ {review.stars}/5</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}

      {/* Form */}
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
