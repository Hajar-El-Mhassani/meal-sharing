export default function ReservationModal({
  meal,
  formData,
  onChange,
  onSubmit,
  onClose,
  errorMessage,
}) {
  return (
    <div className="fixed inset-0 bg-transparent border  flex justify-center items-center z-60">
      <div className="bg-white dark:bg-gray-800 p-10  rounded shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-3xl text-red-600 hover:text-red-700"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 pb-3 pt-3.5">
          Reserve for <span className="text-lime-600">{meal.title}</span>
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center font-semibold">
            {errorMessage}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-7">
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={onChange}
            placeholder="Your name"
            required
            className="w-full border border-neutral-400 p-2 rounded"
          />
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={onChange}
            placeholder="Email"
            title="Please enter a valid email address"
            required
            className="w-full border  border-neutral-400 p-2 rounded"
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
            className="w-full border   border-neutral-400 p-2 rounded"
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
            className="w-full border  border-neutral-400 p-2 rounded"
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
