import React from 'react';
import "./input.scss"

const Input = ({className, attr}) => {
    return (
        <input className={`input`} {...attr}>

        </input>
    );
};

export default Input;