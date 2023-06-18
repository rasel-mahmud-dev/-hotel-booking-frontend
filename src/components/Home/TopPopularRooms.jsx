import React, {useEffect} from 'react';
import Room from "components/Room/Room.jsx";
import {fetchPopularRoomAction} from "store/actions/roomAction.js";
import {useDispatch, useSelector} from "react-redux";
import {setBookingItemInfo} from "store/slices/hotelSlice.js";

const TopPopularRooms = () => {

    const dispatch = useDispatch()
    const {popularRooms} = useSelector(state => state.hotelState)


    useEffect(() => {
        dispatch(fetchPopularRoomAction({
            pageNumber: 1
        }))
    }, [])

    function handleShowBookingModal(room) {
        dispatch(setBookingItemInfo({
            room: room,
        }))
    }


    return (
        <section className="popular-room">
            <h3 className="section-title text-center">Top Popular Rooms</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10">
                {popularRooms[1] && Array.isArray(popularRooms[1]) && popularRooms[1].map(item => (
                    <Room key={item._id} onBookNow={()=>handleShowBookingModal(item)} room={item}/>
                ))}
            </div>
        </section>
    );
};

export default TopPopularRooms;