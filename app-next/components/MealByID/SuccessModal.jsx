export default function SuccessModal({ onClose }) {
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
