import React from 'react';

import "./find-room-form.scss"
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer"
import addresses from "store/addresses.json"
import getUniqueElem from "src/utils/getUniqueElem.js";
import { useNavigate } from 'react-router-dom';

const FindRoomForm = () => {

    const navigate = useNavigate()
    
    const [userInput, setUserInput] = useCustomReducer({
        city: "",
        roomType: "", // Standard //
        capacity: 2,
    })

    function handleChange({target: {name, value}}) {
        setUserInput({[name]: value})
    }

    function handleSearch(){
        let query = "" 
        if(userInput.city){
            query += "city=" + userInput.city +"&"
        }
        if(userInput.capacity){
            query += "capacity=" + userInput.capacity +"&"
        }

        // date range 
        let startDate = new Date("2023-02-12").toDateString()
        query += "startDate=" + startDate +"&"

        let endDate = new Date().toDateString()
        query += "endDate=" + endDate +"&"

        navigate("/hotel/rooms?"+query) 

    }

    return (
        <div className="find-room-form card">
            <form className="flex items-center justify-center gap-x-4">
            <InputGroup
                defaultValue={userInput.city}
                onChange={handleChange}
                labelClass="font-sm  text-gray-600 mr-2"
                className="flex items-center"
                label={"City"}
                name="city"
                placeholder={"Enter city"}
                as="select"
                renderOption={() => (
                    <>
                    <option value="">Where you want to stay</option>
                    {getUniqueElem(addresses.map(add => add["city"])).map((elem, i) => (
                        <option key={i} value={elem}>{elem}</option>
                    ))}
                    </>
                )}
            />

                <InputGroup
                    value={userInput.capacity}
                    type="number"
                    name="capacity"
                    onChange={handleChange}
                    labelClass="font-sm  text-gray-600 mr-2"
                    className="flex items-center"
                    label="Capacity"
                    placeholder="Room Capacity"
                />

                {/* <InputGroup label="Room Type" placeholder="Select Room"></InputGroup> */}
                <Button onClick={handleSearch}>Search</Button>
            </form>
        </div>
    );
};

export default FindRoomForm;