import React, {useEffect, useState} from 'react';
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
import Modal from "components/Modal/Modal"
import addresses from "store/addresses.json"
import getUniqueElem from "src/utils/getUniqueElem.js";
import {BsBookmark} from "react-icons/bs";



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



    const dispatch = useDispatch() 

    const [seachParams] = useSearchParams()
    let city  = seachParams.get("city")
    let startDate  = seachParams.get("startDate")
    let endDate  = seachParams.get("endDate")
    let capacity  = seachParams.get("capacity")
    
    const [filterInput, setFilterInput] = useCustomReducer({
        hotelId: "",
        roomType: "", // Standard //
        capacity: 2,
        city: "",
        price: 100,
        bookingStartDate: new Date(),
        errorMessage: "",
        isLoading: false
    })

    const [rooms, setRooms] = useState([])
    const [showBookingRoomId, setShowBookingRoomId] = useState("")


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
        dispatch(filterRoomsAction({
            search:"",
            capacity: filterInput.capacity,
            roomType: filterInput.roomType,
            city: filterInput.city,
            bookingStartDate: new Date(filterInput.startDate) 
        })).unwrap().then(data=>{
            alert(data)
            setRooms(data)
        }).catch(err=>{
            console.log(JSON.stringify(err))
        })
    }



    return (
        <div className="flex ">
            <div className="sidebar p-5">
                <h4>Filter Rooms</h4>

                {/* <InputGroup label="Room Type" placeholder="Select Room"></InputGroup> */}
                <Button onClick={handleFilterRoom} className="mt-4">Search</Button>
                        

                <InputGroup
                        name="roomType"
                        defaultValue={filterInput.roomType}
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
                // value={filterInput.city}
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

           
            </div>
            <div>
            <div className="container">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center mt-10">
                {rooms?.map(item => (
                    <Room onBookNow={roomItem=> setShowBookingRoomId(roomItem._id) } room={item} />
                ))}
            </div>
</div>

            {showBookingRoomId && <BookingModal 
                bookingItem={rooms.find(room=>room._id === showBookingRoomId)}
                onClose={()=>{setShowBookingRoomId("")}} 
            /> }
            
            </div>
        </div>
    );
};


function BookingModal({bookingItem, onClose}){

    return (
        <div>
            <Modal onClose={onClose}>
                <div>
                    asdASD
                     as
                     d
                     ASD
                     as
                     d
                 {bookingItem && (
                    <div className="bg-white  rounded-md  overflow-hidden single-room">
                        <div className="room-img">
                            <img src={bookingItem.image} alt=""/>
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold text-lg text-gray-600">{bookingItem?.roomName || bookingItem?.roomNo}</h4>
        
                            <div>
                                <h4 className="font-semibold text-lg text-gray-600">{bookingItem.hotel?.name}</h4>
                                <h4 className="font-semibold text-lg text-gray-600">{bookingItem.hotel?.city}</h4>
                            </div>
                            
                            <p className="text-sm text-gray-600">
                                {bookingItem.description} 
                                </p>
        
                            <div className="flex items-center justify-between mt-6 text-sm">
                                <span><span className="text-primary font-semibold">${bookingItem?.price}</span> per night</span>
                                <Button className="flex items-center gap-x-1">
                                    <BsBookmark />
                                    <span className="text-xs">Book</span>
                                </Button>
                            </div>
        
                        </div>
                    </div>
                    )}
                </div>
            </Modal>   
        </div>
    )
}

export default FilterRooms;