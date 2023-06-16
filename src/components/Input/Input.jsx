import React from 'react';
import "./input.scss"

const Input = ({...attr}) => {
    return (
        <input className={`input`} {...attr} />
    );
};

export default Input;