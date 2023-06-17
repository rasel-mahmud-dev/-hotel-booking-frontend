import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllRoomsAction} from "store/actions/hotelAction.js";
import {BiPen} from "react-icons/bi";
import {BsTrash} from "react-icons/bs";
import trimText from "src/utils/trimText.js";
import {Link} from "react-router-dom";
import Button from "components/Button/Button.jsx";


const MyRooms = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllRoomsAction())
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
                        <th className=" pb-4 text-start">Image</th>
                        <th className=" pb-4">Name</th>
                        <th className=" pb-4 text-start">Description</th>
                        <th className=" pb-4">Rooms</th>
                        <th className=" pb-4">City</th>
                        <th className=" pb-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hotel?.map((item) => (
                        <tr key={item._id}>

                            <td>
                                <div>
                                    <div className="flex items-center gap-x-2 ">
                                        <img className="object-contain h-20" src={item.image} alt=""/>
                                    </div>
                                </div>
                            </td>
                            <td className="whitespace-nowrap">{trimText(item.name, 40)}</td>

                            <td>{trimText(item.description, 100)}</td>


                            <td>
                                <div className="flex items-center gap-2">
                                    {item?.rooms && item?.rooms.map((room)=>(
                                        <div key={room._id} className="bg-primary px-3 py-px rounded text-xs">
                                            <Link className="text-white" to={`/room/${room._id}`}>{room.roomName}</Link>
                                        </div>
                                    ))}
                                </div>
                            </td>


                            <td>{item?.address?.city}</td>
                            <td>
                                <div className="flex items-center gap-x-2">
                                    <Link to={`/dashboard/update-hotel/${item._id}`}><BiPen/></Link>
                                    <BsTrash/>
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