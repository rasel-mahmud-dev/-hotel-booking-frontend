import React from 'react';
import Input from "components/Input/Input.jsx";
import DatePicker from "components/Input/DatePicker.jsx";

const InputGroup = ({
                        className = "",
                        labelClass = "",
                        as,
                        name,
                        label = "",
                        placeholderText,
                        selected,
                        onChange,
                        ...attr
                    }) => {

    return (
        <div className={className}>
            <label className={labelClass} htmlFor={name}>{label}</label>

            {as === "datepicker" ? (
                <DatePicker
                    selected={selected}
                    placeholderText={placeholderText}
                    onChange={(v) => onChange({target: {name, value: v}})}/>
            ) : (
                <Input id={name} name={name} as={as} onChange={onChange} {...attr} />
            )}

        </div>
    );
};

export default InputGroup;