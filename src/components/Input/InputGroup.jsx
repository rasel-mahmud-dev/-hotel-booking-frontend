import React from 'react';
import Input from "components/Input/Input.jsx";

const InputGroup = ({label = "",  name, ...attr}) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Input id={name} {...attr} />
        </div>
    );
};

export default InputGroup;