import React from 'react';

import "./room.scss"
import Button from "components/Button/Button.jsx";
import {BsBookmark} from "react-icons/bs";


const Room = ({onBookNow, room}) => {
    return (

            <div className="bg-white  rounded-md  overflow-hidden single-room">
                <div className="room-img">
                    <img src={room.image} alt=""/>
                </div>
                <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-600">{room?.roomName || room?.roomNo}</h4>

                    <div>
                        <h4 className="font-semibold text-lg text-gray-600">{room.hotel?.name}</h4>
                        <h4 className="font-semibold text-lg text-gray-600">{room.hotel?.city}</h4>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                        {room.description} 
                        </p>

                    <div className="flex items-center justify-between mt-6 text-sm">
                        <span><span className="text-primary font-semibold">${room?.price}</span> per night</span>
                        <Button onClick={()=>onBookNow && onBookNow(room)} className="flex items-center gap-x-1">
                            <BsBookmark />
                            <span className="text-xs">Book Now</span>
                        </Button>
                    </div>

                </div>
            </div>

    );
};

export default Room;