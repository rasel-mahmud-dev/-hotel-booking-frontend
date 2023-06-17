import {createPortal} from "react-dom"

import "./modal.scss"

const Modal = ({modalClass = "", onClose, children}) => createPortal((
    <>
        <div className="modal-backdrop" onClick={() => onClose()}></div>
        <div className={`modal ${modalClass}`}>
            {children}
        </div>
    </>
), document.querySelector("#modal-root"))

export default Modal