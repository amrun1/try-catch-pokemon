import React from "react";

const Modal = props => {
    return (
        <div className="modal-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default Modal;