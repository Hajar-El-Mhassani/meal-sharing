"use client";

import MealReviews from "./MealReviews";

export default function MealDetails({ meal, onReserveClick }) {
  if (!meal) return null;

  return (
    <div className="relative bg-white shadow-xl rounded-2xl border-2 border-orange-600 max-w-6xl mx-auto mt-24 px-6 md:px-10 py-5">
      {/* Top Center circle image */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
        <img
          src={meal.image}
          alt={meal.title}
          className="w-32 h-32 rounded-full border-4 border-orange-600 shadow-md object-cover"
        />
      </div>

      {/* Meal Info */}
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{meal.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          {meal.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center text-sm text-gray-700 mt-6">
          <p>
            <span className="font-semibold">Date:</span>
            <br />
            {new Date(meal.when).toLocaleDateString("en-EN")}
          </p>
          <p>
            <span className="font-semibold">Location:</span>
            <br />
            {meal.location}
          </p>
          <p>
            <span className="font-semibold"> Max Guests:</span>
            <br />
            {meal.max_reservation}
          </p>
          <p className="text-lime-700 font-bold text-lg">${meal.price}</p>
        </div>
      </div>

      {/* Reservation + Reviews */}
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        {/* Reservation Box */}
        <div className="md:w-1/2 bg-lime-50 border border-lime-200 p-6  flex flex-col gap-3 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-lime-800 mb-2">
            Make a Reservation
          </h2>
          <p className="text-gray-500">
            Reserve your seat now and join us for a warm, flavorful, and
            memorable meal!
          </p>
          {meal.available_reservations > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-3">
                {meal.available_reservations} seat(s) available — reserve now!
              </p>
              <button
                onClick={onReserveClick}
                className="bg-lime-700 hover:bg-lime-600 text-white font-semibold px-6 py-2 rounded-md transition"
              >
                Reserve Your Seat
              </button>
            </>
          ) : (
            <p className="text-red-500 font-semibold">
              No reservations available.
            </p>
          )}
        </div>

        {/* Reviews Box */}
        <div className="md:w-1/2 bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📝 Reviews
          </h2>
          <MealReviews mealId={meal.id} />
        </div>
      </div>
    </div>
  );
}
