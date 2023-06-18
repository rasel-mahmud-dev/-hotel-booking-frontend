import {Outlet} from "react-router-dom";

import Header from "components/Header/Header.jsx";
import React, {Suspense} from "react";
import Loader from "components/Loader/Loader.jsx";
import BookingModal from "components/BookingModal/BookingModal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setBookingItemInfo} from "store/slices/hotelSlice.js";


const Main = () => {

    const dispatch = useDispatch()
    const {bookingItemInfo} = useSelector(state => state.hotelState)

    function handleCloseBookingModal() {
        dispatch(setBookingItemInfo({
            room: null
        }))
    }

    return (
        <div className="relative">
            <Header/>
            <div className="header-space"></div>
            <Suspense fallback={<div className="loader-v-position"><Loader title="Page is loading..."/></div>}>
                <Outlet/>
            </Suspense>


            {/**** add order room modal ****/}
            {bookingItemInfo && bookingItemInfo.room && (
                <BookingModal
                    checkInDate={bookingItemInfo.checkInDate}
                    checkOutDate={bookingItemInfo.checkOutDate}
                    bookingItem={bookingItemInfo.room}
                    onClose={handleCloseBookingModal}/>
            )}


        </div>
    );
};

export default Main;