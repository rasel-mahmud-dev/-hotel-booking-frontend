import React from 'react';

import "./room.scss"
import Button from "components/Button/Button.jsx";
import {BiBookmark} from "react-icons/bi";
import {BsBookmark} from "react-icons/bs";


const Room = ({room}) => {
    return (

            <div className="bg-white  rounded-md  overflow-hidden single-room">
                <div className="room-img">
                    <img src={room.thumb} alt=""/>
                </div>
                <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-600">{room.title}</h4>
                    <p className="text-sm text-gray-600">
                        Image for cattle earth. May one Which life divide sea. Optio veniam quibusdam fugit aspernatur ratione rerum necessitatibus ipsa
                    </p>

                    <div className="flex items-center justify-between mt-6 text-sm">
                        <span><span className="text-primary font-semibold">${room?.rate}</span> per night</span>
                        <Button className="flex items-center gap-x-1">
                            <BsBookmark />
                            <span className="text-xs">Book</span>
                        </Button>
                    </div>

                </div>
            </div>

    );
};

export default Room;