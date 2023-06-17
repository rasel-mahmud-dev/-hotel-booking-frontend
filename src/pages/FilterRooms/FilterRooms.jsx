import React, {useEffect} from 'react';
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "components/Loader/Loader.jsx";
import InfoMessage from "components/InfoMessage/InfoMessage.jsx";
import ImageChoose from "components/Input/Image.jsx";
import roomTypeData from "src/store/roomTypeData.json"
import Room from "components/Room/Room"
import {createRoomAction, fetchOwnerHotelAction, getHotelDetailAction, filterRoomsAction} from "store/actions/hotelAction.js";

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


    
    const [userInput, setUserInput] = useCustomReducer({
        hotelId: "",
        roomType: "", // Standard //
        capacity: 2,
        price: 100,
        errorMessage: "",
        isLoading: false
    })

    function handleChange({target: {name, value}}) {
        setUserInput({[name]: value})
    }

    function handleSearchRooms(){
        filterRoomsAction({
            search:"",
            capacity: 1,
            roomType: "",
            price: [0, 100]
        })
    }


    return (
        <div className="flex ">
            <div className="sidebar">
                <h4>Filter Rooms</h4>
                <InputGroup
                        name="roomType"
                        defaultValue={userInput.roomType}
                        value={userInput.roomType}
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Room Type"
                        // placeholder="Room name"
                        as="select"
                        renderOption={() => (
                            <>
                                <option value={""}>Select type</option>
                                {
                                    roomTypeData.map((hotel, i) => (
                                        <option key={i} value={hotel._id}>{hotel.name}</option>
                                    ))
                                }
                            </>
                        )}
                    />


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