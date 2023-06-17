import React, {useEffect} from 'react';
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Loader from "components/Loader/Loader.jsx";
import InfoMessage from "components/InfoMessage/InfoMessage.jsx";
import ImageChoose from "components/Input/Image.jsx";
import roomTypeData from "src/store/roomTypeData.json"
import Room from "components/Room/Room"
import {createRoomAction, fetchOwnerHotelAction, getHotelDetailAction, filterRoomsAction} from "store/actions/hotelAction.js";

import addresses from "store/addresses.json"
import getUniqueElem from "src/utils/getUniqueElem.js";


const data = [
    {
        title: "asasdf",
        price: "234",
        thumb: "/images/room-1.jpg",
        categoryId: "economy",
    },
    {
        title: "asasdf",
        price: "234",
        thumb: "/images/room-2.jpg",
        categoryId: "standard",
    },
    {
        title: "asasdf",
        price: "234",
        thumb: "/images/room-3.jpg",
        categoryId: "luxe",
    },
    {
        title: "asasdf",
        price: "234",
        thumb: "/images/room-4.jpg",
        categoryId: "luxe",
    },
    {
        title: "asasdf",
        price: "234",
        thumb: "/images/room-5-950x634.jpg",
        categoryId: "standard",
    },
    {
        title: "asasdf",
        price: "234",
        thumb: "/images/room-6.jpg",
        categoryId: "economy",
    },
    {
        title: "asasdf",
        price: "234",
        thumb: "/images/room-7.jpg",
        categoryId: "standard",
    }
]


const FilterRooms = () => {

    const [seachParams] = useSearchParams()
    let city  = seachParams.get("city")
    let startDate  = seachParams.get("startDate")
    let endDate  = seachParams.get("endDate")
    let capacity  = seachParams.get("capacity")
    
    const [filterInput, setFilterInput] = useCustomReducer({
        hotelId: "",
        roomType: "", // Standard //
        capacity: 2,
        price: 100,
        errorMessage: "",
        isLoading: false
    })
    useEffect(()=>{
        let query = {}
        if(city){
            query["city"] = city
        }
        if(capacity){
            query["capacity"] = capacity
        }
        if(startDate){
            query["startDate"] = startDate
        }
        if(endDate){
            query["endDate"] = endDate
        }
        setFilterInput(query)
    }, [startDate, endDate, city, capacity])
    

    function handleChange({target: {name, value}}) {
        setUserInput({[name]: value})
    }

    function handleFilterRoom(){
        filterRoomsAction({
            search:"",
            capacity: 1,
            roomType: "",
            price: [0, 100]
        })
    }


    return (
        <div className="flex ">
            <div className="sidebar p-5">
                <h4>Filter Rooms</h4>
                <InputGroup
                        name="roomType"
                        defaultValue={filterInput.roomType}
                        value={filterInput.roomType}
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600 mb-1"
                        className="flex flex-col mt-2"
                        label="Room Type"
                        // placeholder="Room name"
                        as="select"
                        renderOption={() => (
                            <>
                                <option value={""}>Select type</option>
                                {
                                    roomTypeData.map((type, i) => (
                                        <option key={i} value={type}>{type}</option>
                                    ))
                                }
                            </>
                        )}
                    />
            <InputGroup
                defaultValue={filterInput.city}
                onChange={handleChange}
                labelClass="font-sm  text-gray-600 mb-1"
                className="flex flex-col mt-2"
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
                value={filterInput.capacity}
                type="number"
                name="capacity"
                onChange={handleChange}
                labelClass="font-sm  text-gray-600 mb-1"
                className="flex flex-col mt-2"
                label="Capacity"
                placeholder="Room Capacity"
            />

                {/* <InputGroup label="Room Type" placeholder="Select Room"></InputGroup> */}
                <Button onClick={handleFilterRoom} className="mt-4">Search</Button>
           
            </div>
            <div>
            <div className="container">

            <div className="grid grid-cols-3 gap-4 justify-center mt-10">
                {data.map(item => (
                    <Room room={item} />
                ))}
            </div>
</div>




            </div>
        </div>
    );
};


function BookingModal(){
    return (
        <div>

        </div>
    )
}

export default FilterRooms;