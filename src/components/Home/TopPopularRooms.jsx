import React from 'react';
import Room from "components/Room/Room.jsx";

const TopPopularRooms = () => {

    const data = [
        {
            title: "Double Room",
            rate: "234",
            thumb: "/images/room-1.jpg"
        },
        {
            title: "Double Room",
            rate: "234",
            thumb: "/images/room-2.jpg"
        },
        {
            title: "Double Room",
            rate: "234",
            thumb: "/images/room-3.jpg"
        },
        {
            title: "Double Room",
            rate: "234",
            thumb: "/images/room-4.jpg"
        },
        {
            title: "Double Room",
            rate: "234",
            thumb: "/images/room-5-950x634.jpg"
        },
        {
            title: "Double Room",
            rate: "234",
            thumb: "/images/room-6.jpg"
        },
        {
            title: "Double Room",
            rate: "234",
            thumb: "/images/room-7.jpg"
        }
    ]

    return (
        <section>

            <h3 className="section-title text-center">Top Popular Rooms</h3>

           <div className="grid grid-cols-3 gap-6 justify-center mt-10">
               {data.map(item=>(
                   <Room room={item} />
               ))}
           </div>

        </section>
    );
};

export default TopPopularRooms;