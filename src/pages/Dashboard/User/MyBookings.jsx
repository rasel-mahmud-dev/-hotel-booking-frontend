import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {cancelBookingAction, checkOutBookingRoomAction, fetchBookedRoomAction} from "store/actions/hotelAction.js";
import trimText from "src/utils/trimText.js";
import {FaEllipsisH} from "react-icons/fa";
import MenuDropdown from "components/Dropdown/MenuDropdown.jsx";
import {toast} from "react-toastify";


const MyBookings = () => {
    const dispatch = useDispatch()

    const [myBooking, setMyBooking] = useState([])

    useEffect(() => {
        fetchAllBookings()
    }, []);

    function fetchAllBookings() {
        dispatch(fetchBookedRoomAction()).unwrap().then((data) => {
            if (data.bookings) {
                setMyBooking(data.bookings)
            }
        })
    }

    function handleCancelBooking(bookingId) {
        dispatch(cancelBookingAction({bookingId: bookingId})).unwrap().then(() => {
            toast.success("Room has been successfully canceled")
            fetchAllBookings()
        }).catch((msg) => toast.error(msg))
    }

    function handleCheckOut(bookingId) {
        dispatch(checkOutBookingRoomAction({bookingId: bookingId})).unwrap().then(() => {
            toast.success("Room has been successfully check out")
            fetchAllBookings()
        }).catch((msg) => toast.error(msg))
    }


    return (
        <div className="container mt-4">

            <div className="flex justify-between items-center mb-4">
                <div className="page-section-title">My Bookings</div>
            </div>

            <div className="card !shadow-xxxs">
                <table className="w-full table">
                    <thead>
                    <tr className="">
                        <th className=" pb-4">Room Image</th>
                        <th className=" pb-4 ">Room type</th>
                        <th className=" pb-4 text-start">Total Price</th>
                        <th className=" pb-4">Check In</th>
                        <th className=" pb-4">Check out</th>
                        <th className=" pb-4">Status</th>
                        <th className=" pb-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {myBooking?.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <div>
                                    <div className="flex items-center gap-x-2 ">
                                        <img className="object-contain h-20" src={item?.room?.image} alt=""/>
                                    </div>
                                </div>
                            </td>
                            <td className="whitespace-nowrap">{trimText(item?.room?.roomType, 40)}</td>


                            <td><span className="text-primary">${item.totalPrice}</span></td>

                            <td>
                                {new Date(item.checkInDate).toDateString()}
                            </td>

                            <td>
                                {new Date(item.checkOutDate).toDateString()}
                            </td>

                            <td>
                                <span className="text-primary">{item.status}</span>
                            </td>


                            <td>
                                <MenuDropdown contentClass="w-[180px] right-0 p-0 overflow-hidden" render={() => (
                                    <div>
                                        <li onClick={() => handleCancelBooking(item._id)}
                                            className="py-2 cursor-pointer hover:bg-primary/10 list-none px-3">Cancel
                                            Booking
                                        </li>
                                        <li onClick={() => handleCheckOut(item._id)} className="py-2 cursor-pointer hover:bg-primary/10 list-none px-3">Check
                                            Out
                                        </li>
                                        {/*<li className="py-2 cursor-pointer hover:bg-primary/10 list-none px-3">Cancel Booking</li>*/}
                                    </div>
                                )}>
                                    <div
                                        className="w-9 h-9 bg-primary/10 flex items-center justify-center rounded-full">
                                        <FaEllipsisH/>
                                    </div>
                                </MenuDropdown>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;