import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from "components/Modal/Modal.jsx";
import Button from "components/Button/Button.jsx";
import {IoBagCheckOutline} from "react-icons/io5";
import {reserveRoomAction} from "store/actions/roomAction.js";
import {toast} from "react-toastify";
import trimText from "src/utils/trimText.js";
import {RiKey2Line} from "react-icons/ri";


function BookingModal({bookingItem, onClose, checkInDate, checkOutDate}) {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    function handleReserveRoom(room) {

        if (!(auth && auth?._id)) {
            onClose && onClose()
            return toast.error("Please login first")
        }

        let payload = {
            roomId: room._id,
            totalPrice: room.price,
            hotelId: room.hotelId,
            checkInDate: new Date(new Date(checkInDate).toDateString()),
            checkOutDate: new Date(new Date(checkOutDate).toDateString())
        }

        dispatch(reserveRoomAction(payload)).unwrap().then((ex) => {
            toast.success("Your order has been confirmed. Please check your dashboard")
            onClose()
        }).catch(message => {
            toast.error(message)
        }).finally(() => {

        })
    }

    function totalNight(start, end) {
        start = new Date(start)
        end = new Date(end)
        const timeDiff = Math.abs(start.getTime() - end.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }


    return (
        <div>
            <Modal onClose={onClose} modalClass="!p-4">
                <div>
                    {bookingItem && (
                        <div className="bg-white rounded-md  overflow-hidden grid grid-cols-2 ">

                            <div>
                                <div className="room-img">
                                    <img src={bookingItem.image} alt=""/>
                                </div>

                                <div className="mt-4">
                                    <h5 className="font-medium text-sm mb-2">YOUR RESERVATION</h5>
                                    <div className="grid grid-cols-2 gap-5">

                                        <div className="bg-primary/10 text-sm text-gray-500 rounded p-3 text-center">
                                            <h5 className="text-gray-600 text-xs font-medium">CHECK-IN</h5>
                                            <span>{new Date(checkInDate).toDateString()}</span>
                                        </div>

                                        <div className="bg-primary/10 text-sm text-gray-500 rounded p-3 text-center">
                                            <h5 className="text-gray-600 text-xs font-medium">CHECK-OUT</h5>
                                            <span>{new Date(checkOutDate).toDateString()}</span>
                                        </div>

                                        <div className="bg-primary/10 text-sm text-gray-500 rounded p-3 text-center">
                                            <h5 className="text-gray-600 text-xs font-medium">GUESTS</h5>
                                            <span>1</span>
                                        </div>


                                        <div className="bg-primary/10 text-sm text-gray-500 rounded p-3 text-center">
                                            <h5 className="text-gray-600 text-xs font-medium">NIGHTS</h5>
                                            <span>{totalNight(new Date(checkInDate).toDateString(), new Date(checkOutDate).toDateString())}</span>
                                        </div>


                                        <div className="bg-primary/10 text-sm text-gray-500 rounded p-3 text-center">
                                            <h5 className="text-gray-600 text-xs font-medium">ROOM NO</h5>
                                            <span className="flex justify-center gap-x-px items-center">
                                                <RiKey2Line/>
                                                <span>{bookingItem.roomNo}</span>
                                           </span>
                                        </div>


                                        <div className="bg-primary/10 text-sm text-gray-500 rounded p-3 text-center">
                                            <h5 className="text-gray-600 text-xs font-medium">RATE</h5>
                                            <span className="">${bookingItem.price}</span>
                                        </div>


                                        {/*<div>*/}
                                        {/*    <h4 className="font-semibold text-lg text-gray-600">{bookingItem.hotel?.name}</h4>*/}
                                        {/*    <h4 className="font-semibold text-lg text-gray-600">{bookingItem.hotel?.city}</h4>*/}
                                        {/*</div>*/}

                                        {/*<p className="text-sm text-gray-600">*/}
                                        {/*    {bookingItem.description}*/}
                                        {/*</p>*/}

                                    </div>
                                </div>

                            </div>


                            <div className="pl-4">


                                <div className="flex gap-x-2 items-center mb-4">
                                    <h4>{bookingItem.roomName}</h4>
                                    <span
                                        className="bg-green-400/30 px-2 py-1 text-xs  font-medium rounded block w-max">{bookingItem.roomType}</span>
                                </div>

                                <p className="text-gray-500 text-sm whitespace-pre-line">
                                    {trimText(bookingItem.description, 800)}
                                </p>


                                <div className="flex items-center justify-between mt-2 text-sm pl-4">
                                    <span><span
                                        className="text-primary font-semibold">Total: ${bookingItem?.price}</span></span>
                                    <Button onClick={() => handleReserveRoom(bookingItem)}
                                            className="flex items-center gap-x-1">
                                        <IoBagCheckOutline/>
                                        <span className="text-xs">Order</span>
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

export default BookingModal;