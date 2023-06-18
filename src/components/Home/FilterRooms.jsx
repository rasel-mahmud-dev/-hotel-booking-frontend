import React, {useEffect, useState} from 'react';
import Button from "components/Button/Button.jsx";
import {useDispatch} from "react-redux";
import {filterRoomByTypeAction} from "store/actions/roomAction.js";
import useCustomReducer from "src/hooks/useReducer.jsx";
import Room from "components/Room/Room.jsx";
import {setBookingItemInfo} from "store/slices/hotelSlice.js";

const FilterRooms = () => {

    const [selectRoomTypeId, setSelectRoomTypeId] = useState("")
    const dispatch = useDispatch()

    const [rooms, setRooms] = useCustomReducer({})

    const categories = [
        {label: "All Rooms", id: ""},
        {label: "Single Room", id: "Single Room"},
        {label: "Duplex Room", id: "Duplex Room"},
        {label: "Standard", id: "standard"},
    ]

    function filterRoomByType(selectRoomTypeId) {
        // first check in cache if not exist
        if (rooms[selectRoomTypeId] && Array.isArray(rooms[selectRoomTypeId]) && rooms[selectRoomTypeId].length > 0) return;

        //then fetch from server
        dispatch(filterRoomByTypeAction(selectRoomTypeId)).unwrap().then(rooms => {
            setRooms({
                [selectRoomTypeId]: rooms
            })
        })
    }

    useEffect(() => {
        filterRoomByType(selectRoomTypeId)
    }, [selectRoomTypeId])

    function handleShowBookingModal(room) {
        dispatch(setBookingItemInfo({
            room: room,
        }))
    }


    return (
        <section id="category-room">

            <h3 className="section-title text-center">Choose your Room</h3>

            <div className="flex justify-center gap-4 mt-10 flex-wrap">
                {categories.map((category, i) => (
                    <div key={i}>
                        <Button onClick={() => setSelectRoomTypeId(category.id)}
                                variant={`${category.id === selectRoomTypeId ? "primary" : "default"}`}>
                            {category.label}
                        </Button>
                    </div>
                ))}
            </div>

            <div>
                {rooms[selectRoomTypeId] && Array.isArray(rooms[selectRoomTypeId]) && rooms[selectRoomTypeId].length === 0 ? (
                    <div className="mt-20">
                        <h4 className="font-semibold text-center">There no room of {selectRoomTypeId} category</h4>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10">
                        {rooms[selectRoomTypeId] && Array.isArray(rooms[selectRoomTypeId]) && rooms[selectRoomTypeId].map(item => (
                            <Room onBookNow={() => handleShowBookingModal(item)} room={item} key={item._id}/>
                        ))}
                    </div>
                )}
            </div>


        </section>
    );
};

export default FilterRooms;