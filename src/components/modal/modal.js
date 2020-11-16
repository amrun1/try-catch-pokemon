import React from "react";

class Modal extends React.Component {
    render() {
        return (
            <div className="modal-box">
                <div className="box">
                    <span className="close-icon" onClick={this.props.handleClose}>x</span>
                    {this.props.content}
                </div>
            </div>
        )
    }
};

export default Modal;