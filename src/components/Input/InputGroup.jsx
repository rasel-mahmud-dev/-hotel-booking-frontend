import React from 'react';
import Input from "components/Input/Input.jsx";

const InputGroup = ({className = "", labelClass = "", name, label = "", ...attr}) => {
    return (
        <div className={className}>
            <label className={labelClass} htmlFor={name}>{label}</label>
            <Input id={name} name={name} {...attr} />
        </div>
    );
};

export default InputGroup;