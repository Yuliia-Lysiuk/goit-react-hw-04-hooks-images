import './Modal.css';
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';


const modalRoot = document.querySelector("#modal-root");


function Modal ({largePicture, onClose}) {
 
  useEffect(() => {
    function handleKeyDown (e) {
    if (e.code === "Escape") {
      onClose();
    }
    };
    window.addEventListener("keydown", handleKeyDown)

    return function cleanup() { window.removeEventListener("keydown", handleKeyDown); }
  },[onClose])

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
      <div className="Overlay" onClick={handleBackdropClick}>
        <div className="Modal">
          <img src={largePicture} alt="" />
        </div>
      </div>,
      modalRoot
    );

}

Modal.propTypes = {
  largePicture: PropTypes.string,
}

export default Modal;