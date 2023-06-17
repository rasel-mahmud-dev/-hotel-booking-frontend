import React from 'react';
import {useDispatch} from "react-redux";
import Modal from "components/Modal/Modal.jsx";
import Button from "components/Button/Button.jsx";
import {IoBagCheckOutline} from "react-icons/io5";
import {reserveRoomAction} from "store/actions/hotelAction.js";
import {toast} from "react-toastify";


function BookingModal({bookingItem, onClose, filterInput}) {

    const dispatch = useDispatch()

    function handleReserveRoom(room) {
        let payload = {
            roomId: room._id,
            totalPrice: room.price,
            hotelId: room.hotelId,
            checkInDate: new Date(new Date(filterInput.checkOutDate).toDateString()),
            checkOutDate: new Date(new Date(filterInput.checkOutDate).toDateString())
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

                            <div className="room-img">
                                <img src={bookingItem.image} alt=""/>
                            </div>

                            <div className="pl-4">

                                <h5 className="font-medium text-sm mb-2">YOUR RESERVATION</h5>

                                <div className="grid grid-cols-2 gap-x-3 gap-y-3">

                                    <div className="bg-primary/10 text-sm text-gray-500 rounded px-3 py-2 text-center">
                                        <h5 className="text-gray-600 text-xs font-medium">CHECK-IN</h5>
                                        <span>{new Date(filterInput.checkInDate).toDateString()}</span>
                                    </div>

                                    <div className="bg-primary/10 text-sm text-gray-500 rounded px-3 py-2 text-center">
                                        <h5 className="text-gray-600 text-xs font-medium">CHECK-OUT</h5>
                                        <span>{new Date(filterInput.checkOutDate).toDateString()}</span>
                                    </div>

                                    <div className="bg-primary/10 text-sm text-gray-500 rounded px-3 py-2 text-center">
                                        <h5 className="text-gray-600 text-xs font-medium">GUESTS</h5>
                                        <span>1</span>
                                    </div>


                                    <div className="bg-primary/10 text-sm text-gray-500 rounded px-3 py-2 text-center">
                                        <h5 className="text-gray-600 text-xs font-medium">NIGHTS</h5>
                                        <span>{totalNight(new Date(filterInput.checkInDate).toDateString(), new Date(filterInput.checkOutDate).toDateString())}</span>
                                    </div>


                                    <div className="bg-primary/10 text-sm text-gray-500 rounded px-3 py-2 text-center">
                                        <h5 className="text-gray-600 text-xs font-medium">ROOM NO</h5>
                                        <span>{bookingItem.roomNo}</span>
                                    </div>


                                    <div className="bg-primary/10 text-sm text-gray-500 rounded px-3 py-2 text-center">
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