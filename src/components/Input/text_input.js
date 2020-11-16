import React from "react";

class InputText extends React.Component {
    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <input type="text" className={this.props.form.isValid ? "form-control" : "form-control is-invalid"} style={this.props.form.isValid ? { marginBottom: ".5rem" } : { marginBottom: "0rem" }}></input>
                {!this.props.form.isValid && <small className="text-danger">{this.props.form.errorMessage}</small>}
            </div>
        )
    }
}
export default InputText