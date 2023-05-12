import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/ConfirmationModal.css";

Modal.setAppElement("#root");

const ConfirmationModal = ({ message, isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="flex flex-col items-center justify-center px-6 py-4">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
            onClick={onConfirm}
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Confirm
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
            onClick={onRequestClose}
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
