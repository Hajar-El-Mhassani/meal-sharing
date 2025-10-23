import type { Meal } from "../../types/meal";
import type { ReservationCreate } from "../../types/reservation";

/** Props for ReservationModal component */
type ReservationModalProps = {
  meal: Meal;
  formData: ReservationCreate;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  errorMessage?: string;
};

/**
 * ReservationModal component
 * Shows a modal for making a reservation for a meal
 * @param {object} props - props for the component
 * @param {Meal} props.meal - the meal to make a reservation for
 * @param {ReservationCreate} props.formData - the form data for the reservation
 * @param {function} props.onChange - the function to be called when a form field is changed
 * @param {function} props.onSubmit - the function to be called when the form is submitted
 * @param {function} props.onClose - the function to be called when the modal is closed
 * @param {string} props.errorMessage - the error message to be displayed (optional)
 */
export default function ReservationModal({
  meal,
  formData,
  onChange,
  onSubmit,
  onClose,
  errorMessage,
}: ReservationModalProps) {
  return (
    <div className="fixed inset-0 bg-transparent border flex justify-center items-center z-60">
      <div className="bg-white dark:bg-gray-800 p-10 rounded shadow-md w-full max-w-md relative">
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
            className="w-full border border-neutral-400 p-2 rounded"
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
            className="w-full border border-neutral-400 p-2 rounded"
          />
          <input
            type="number"
            name="number_of_guests"
            min={1}
            max={meal.available_reservations}
            value={formData.number_of_guests}
            onChange={onChange}
            placeholder="Number of guests"
            required
            className="w-full border border-neutral-400 p-2 rounded"
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
