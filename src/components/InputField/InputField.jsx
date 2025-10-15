import React from "react";
import "./inputField.css";

function InputField({ label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="input-field">
            {label && <label>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputField;
