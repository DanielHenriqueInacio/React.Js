import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  function handleCloseOutside(event) {
    if (event.target === event.currentTarget) {
      return onClose();
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseOutside}>
      <div className="bg-white rounded-lg p-2.5 shadow-lg w-[30%] h-[40%]">
        <span className="cursor-pointer float-left text-gray-500 hover:text-gray-700" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
