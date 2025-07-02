export default function ReservationModal({
  meal,
  formData,
  onChange,
  onSubmit,
  onClose,
  errorMessage,
}) {
  return (
    <div className="fixed inset-0 bg-transparent  flex justify-center items-center z-60">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-600"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Reserve for {meal.title}</h2>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center font-semibold">
            {errorMessage}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={onChange}
            placeholder="Your name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={onChange}
            placeholder="Email"
            title="Please enter a valid email address"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="contact_phonenumber"
            value={formData.contact_phonenumber}
            onChange={onChange}
            placeholder="Phone number"
            required
            pattern="^\d{11,15}$"
            title="Phone number must be 11 to 15 digits"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="number_of_guests"
            min="1"
            max={meal.available_reservations}
            value={formData.number_of_guests}
            onChange={onChange}
            placeholder="Number of guests"
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
