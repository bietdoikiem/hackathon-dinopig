import React from "react";
import "./RadioBtn.css";

const RadioBtn = (props) => {
    return (
        <div className="radio-btn">
            <input name="role" id={props.id} onChange={props.change} value={props.value} type="radio" checked={props.isSelected} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default RadioBtn;