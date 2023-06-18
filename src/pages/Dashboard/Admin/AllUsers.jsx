import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaEllipsisH} from "react-icons/fa";
import {fetchUsersAction, updateProfileAction} from "store/actions/authAction.js";
import Avatar from "components/Avatar/Avatar.jsx";
import MenuDropdown from "components/Dropdown/MenuDropdown.jsx";
import {toast} from "react-toastify";


const AllUsers = () => {
    const dispatch = useDispatch()

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, []);

    function fetchUsers() {
        dispatch(fetchUsersAction()).unwrap().then((data) => {
            if (data) {
                setUsers(data)
            }
        })
    }


    function makeVerifyUser(userId) {
        let formData = new FormData()
        formData.append("status", "verified")
        formData.append("userId", userId)
        dispatch(updateProfileAction(formData)).unwrap().then(() => {
            toast.success("User has been updated")
            fetchUsers()
        }).catch((msg) => toast.error(msg))
    }

    function blockUser(userId) {
        let formData = new FormData()
        formData.append("isBlocked", "true")
        formData.append("userId", userId)

    }

    function handleUpdateUser(payload) {
        const formData = new FormData()
        for (let payloadKey in payload) {
            formData.append(payloadKey, payload[payloadKey])
        }
        dispatch(updateProfileAction(formData)).unwrap().then(() => {
            toast.success("User has been updated")
            fetchUsers()
        }).catch((msg) => toast.error(msg))
    }


    return (
        <div className="container mt-4">

            <div className="flex justify-between items-center mb-4">
                <div className="page-section-title">Users</div>
            </div>

            <div className="card !shadow-xxxs">
                <table className="w-full table">
                    <thead>
                    <tr className="">
                        <th className=" pb-4">Image</th>
                        <th className=" pb-4">FirstName</th>
                        <th className=" pb-4 ">LastName</th>
                        <th className=" pb-4 text-start">Email</th>
                        <th className=" pb-4">Status</th>
                        <th className=" pb-4">Block</th>
                        <th className=" pb-4">Join At</th>
                        <th className=" pb-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <div>
                                    <Avatar
                                        imgClass="w-10 h-10" className="w-10 h-10 " src={user?.avatar}
                                        username={user?.fullName}/>
                                </div>
                            </td>
                            <td className="whitespace-nowrap">{user.firstName}</td>

                            <td><span className="">{user.lastName}</span></td>
                            <td><span className="">{user.email}</span></td>

                            <td>
                                <span
                                    className="text-primary">{user.status === "verified" ? "Verified" : user.role === "ADMIN" ? "Verified" : "No Verified"}</span>
                            </td>

                            <td>
                                <span
                                    className="text-primary">{user.isBlocked ? "Blocked" : user.role === "ADMIN" ? "N/A" : "N/A"}</span>
                            </td>


                            <td>
                                {new Date(user.createdAt).toDateString()}
                            </td>

                            <td>

                                <MenuDropdown contentClass="w-[180px] right-0 p-0 overflow-hidden" render={() => (
                                    <div>
                                        <li onClick={() => handleUpdateUser({
                                            userId: user._id,
                                            status: "verified"
                                        })}
                                            className="py-2 cursor-pointer hover:bg-primary/10 list-none px-3">
                                            Make Verified
                                        </li>
                                        <li onClick={() => handleUpdateUser({
                                            userId: user._id,
                                            isBlocked: !user.isBlocked
                                        })}
                                            className="py-2 cursor-pointer hover:bg-primary/10 list-none px-3">
                                            {user.isBlocked ? "Unblock" : "Block User"}
                                        </li>
                                    </div>
                                )}>
                                    <div
                                        className="cursor-pointer w-9 h-9 bg-primary/10 flex items-center justify-center rounded-full">
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

export default AllUsers;