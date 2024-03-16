import React from "react";
import styles from "../../public/css/Modal.module.css";

const Modal = ({ id ,isOpen, onClose, children }) => {
  if (!isOpen) return null;

  function handleCloseOutside(event) {
    if(event.target === event.currentTarget) {
      return onClose()
    }
  }

  return (
    <div id={`modal-${id}`} className={styles.modal} onClick={handleCloseOutside}>
      <div className={styles.content}>
        <span className={styles.close} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
