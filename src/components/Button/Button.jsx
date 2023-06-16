import React from 'react';
import PropTypes from "prop-types";

const Button = ({className="", variant = "primary", children, ...attr}) => {
    return (
        <button className={`btn btn-${variant} ${className}`} {...attr}>
            {children}
        </button>
    );
};


Button.propType = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "secondary"]),
    children: PropTypes.element
}

export default Button;

