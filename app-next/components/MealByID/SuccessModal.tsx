// this component shows a success modal when a reservation is successful

// type success modal props with onClose function
type SuccessModalProps = {
  onClose: () => void;
};

/**
 * SuccessModal component
 * Shows a success modal when a reservation is successful
 * @param {object} props - props for the component
 * @param {function} props.onClose - function to be called when the modal is closed
 */
export default function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          Reservation Successful!
        </h2>
        <p className="mb-4">Your seat has been reserved.</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
