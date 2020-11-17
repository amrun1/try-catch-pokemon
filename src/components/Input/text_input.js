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
<<<<<<< HEAD:src/components/Input/text_input.js
export default InputText
=======
export default TextInput
>>>>>>> 1c7a932fd285bb6b3410defbc8c38b043f0bc9e6:src/components/input/text_input.js
