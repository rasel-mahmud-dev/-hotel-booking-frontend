import React from 'react';
import Input from "components/Input/Input.jsx";
import "./find-room-form.scss"
import InputGroup from "components/Input/InputGroup.jsx";

const FindRoomForm = () => {
    return (
        <div className="find-room-form card">
            <form className="flex items-center justify-center">
                <InputGroup label="Room Type" placeholder="Select Room"></InputGroup>
                <InputGroup label="Room Type" placeholder="Select Room"></InputGroup>
                <InputGroup label="Room Type" placeholder="Select Room"></InputGroup>
            </form>
        </div>
    );
};

export default FindRoomForm;