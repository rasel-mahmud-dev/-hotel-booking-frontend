import React from 'react';
import DatePickerLib from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import "./input.scss"

const DatePicker = (props) => {
    return (
        <DatePickerLib {...props} />
    );
};

export default DatePicker;