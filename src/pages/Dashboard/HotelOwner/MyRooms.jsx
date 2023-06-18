import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchRoomsAction} from "store/actions/hotelAction.js";
import {BiPen} from "react-icons/bi";
import trimText from "src/utils/trimText.js";
import {Link} from "react-router-dom";
import Button from "components/Button/Button.jsx";


const MyRooms = () => {
    const dispatch = useDispatch()

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        dispatch(fetchRoomsAction("?type=owner")).unwrap().then(rooms => {
            if (rooms) {
                setRooms(rooms)
            }
        })
    }, []);

    const {hotel} = useSelector(state => state.hotelState)


    return (
        <div className="container mt-4">

            <div className="flex justify-between items-center mb-4">
                <div className="page-section-title">My Hotel</div>
                <Link to="/dashboard/add-room"><Button>Add Room</Button></Link>
            </div>

            <div className="card !shadow-xxxs">
                <table className="w-full table">
                    <thead>
                    <tr className="">
                        <th className=" pb-4">Image</th>
                        <th className=" pb-4 ">Room type</th>
                        <th className=" pb-4 ">Room name</th>
                        <th className=" pb-4 whitespace-nowrap">Hotel name</th>
                        <th className=" pb-4 text-start">Description</th>
                        <th className=" pb-4">Price</th>
                        <th className=" pb-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms?.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <div>
                                    <div className="flex items-center gap-x-2 ">
                                        <img className="object-contain h-20" src={item.image} alt=""/>
                                    </div>
                                </div>
                            </td>
                            <td className="whitespace-nowrap">{trimText(item.roomType, 40)}</td>
                            <td>
                                {item?.roomName}
                            </td>
                            <td>
                                {item?.hotel?.name}
                            </td>

                            <td>{trimText(item.description, 100)}</td>


                            <td><span className="text-primary">${item.price}</span></td>
                            <td>
                                <div className="flex items-center gap-x-2">
                                    <Link to={`/dashboard/update-room/${item._id}`}><BiPen/></Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRooms;