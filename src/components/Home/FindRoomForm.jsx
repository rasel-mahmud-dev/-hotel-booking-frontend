import React from 'react';

import "./find-room-form.scss"
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer"
import addresses from "store/addresses.json"
import getUniqueElem from "src/utils/getUniqueElem.js";
import {useNavigate} from 'react-router-dom';
import dateFormat from "src/utils/dateFormat.jsx";


const FindRoomForm = () => {

    const navigate = useNavigate()

    let nextDay = new Date()
    nextDay.setHours(0)
    nextDay.setDate(nextDay.getDate() + 1)

    const [userInput, setUserInput] = useCustomReducer({
        checkInDate: new Date(),
        checkOutDate: nextDay,
        city: "",
        roomType: "", // Standard //
        capacity: 0,
    })

    function handleChange({target: {name, value}}) {
        setUserInput({[name]: value})
    }

    function handleSearch() {
        let query = ""

        // date range
        let checkInDate = dateFormat(userInput.checkInDate)
        query += "checkInDate=" + checkInDate + "&"

        let checkOutDate = dateFormat(userInput.checkOutDate)
        query += "checkOutDate=" + checkOutDate + "&"

        if (userInput.city) {
            query += "city=" + userInput.city + "&"
        }

        if (userInput.capacity) {
            query += "capacity=" + userInput.capacity + "&"
        }

        navigate("/hotel/rooms?" + query)
    }

    return (
        <div className="find-room-form card">
            <div className="grid grid-cols-10 justify-center items-end gap-x-4 md:gap-x-8 px-2 md:px-10">

                <div className="col-span-5 md:col-span-3 lg:col-span-2">
                    <InputGroup
                        selected={userInput.checkInDate}
                        onChange={handleChange}
                        labelClass="text-xs font-medium text-gray-500  mb-3 mt-4 "
                        className="flex flex-col"
                        label={"CHECK-IN"}
                        name="checkInDate"
                        as="datepicker"
                    />
                </div>

                <div className="col-span-5 md:col-span-3 lg:col-span-2">
                    <InputGroup
                        selected={userInput.checkOutDate}
                        onChange={handleChange}
                        labelClass="text-xs font-medium text-gray-500  mb-3 mt-4 "
                        className="flex flex-col"
                        label={"CHECK-OUT"}
                        name="checkOutDate"
                        as="datepicker"
                    />
                </div>


                <div className="col-span-5 md:col-span-3 lg:col-span-2">
                    <InputGroup
                        defaultValue={userInput.city}
                        onChange={handleChange}
                        labelClass="text-xs font-medium text-gray-500  mb-3 mt-4 "
                        className="flex flex-col"
                        label={"SELECT LOCATION"}
                        name="city"
                        as="select"
                        renderOption={() => (
                            <>
                                <option value={""}>Any</option>
                                {getUniqueElem(addresses.map(add => add["city"])).map((elem, i) => (
                                    <option key={i} value={elem}>{elem}</option>
                                ))}
                            </>
                        )}
                    />
                </div>

                <div className="col-span-5 md:col-span-3 lg:col-span-2">
                    <InputGroup
                        value={userInput.capacity}
                        type="number"
                        name="capacity"
                        onChange={handleChange}
                        labelClass="text-xs font-medium text-gray-500  mb-3 mt-4 "
                        className="flex flex-col"
                        label="GUESTS"
                        placeholder="Room Capacity"
                    />
                </div>

                <div className="col-span-12 md:col-span-2 lg:col-span-2 mt-4 md:mt-0 ">
                    <Button className="w-full" onClick={handleSearch}>Search</Button>
                </div>


            </div>
        </div>
    );
};

export default FindRoomForm;