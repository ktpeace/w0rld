import React from "react";

// Define the component props to include the message text and the two functions for confirm and cancel
const ModalConfirm: React.FC<{
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ text, onConfirm, onCancel }) => {
  return (
    // Outermost container for the modal, using fixed positioning to cover the entire screen
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-40 flex">
      {/* Modal content container centered horizontally and vertically */}
      <div className="relative p-4 bg-white dark:bg-gray-800 m-auto flex-col flex rounded-lg shadow-lg max-w-sm">
        {/* Message text */}
        <p className="text-gray-900 dark:text-white text-lg mb-4">{text}</p>
        {/* Button container */}
        <div className="flex justify-between">
          {/* Confirm button */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
          >
            Confirm
          </button>
          {/* Cancel button */}
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
