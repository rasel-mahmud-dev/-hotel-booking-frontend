import React from 'react';
import "./input.scss"

const Input = ({as = "input", renderOption, ...attr}) => {
    return (
        as === "select"
            ? (
                <select className={`input`} {...attr}>
                    {renderOption()}
                </select>
            )
            : as === "textarea"
                ? <textarea className={`input`} {...attr} />
                : <input className={`input`} {...attr} />
    );
};

export default Input;