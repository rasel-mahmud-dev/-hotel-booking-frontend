import React from 'react';

import {Link} from "react-router-dom";
import "./sidebar.scss"
import Avatar from "components/Avatar/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebarAction} from "store/slices/appSlice.js";

const Sidebar = ({sidebarLink = [], activeItem= 0, ...attr}) => {

    const {auth}  = useSelector(state=>state.authState);
    const dispatch = useDispatch()

    function handleCloseSidebar(){
        dispatch(toggleSidebarAction(""))
    }

    return (
        <div {...attr}>
            <div className="p-4">
                <div className="text-center border-b-2 border-primary-200/20 pb-3">
                    <Avatar imgClass="w-20 h-20" className="w-20 h-20 mx-auto" src={auth?.avatar} username={auth?.fullName} />
                    <h1 className="font-semibold text-sm my-1 text-500">{auth?.fullName}</h1>
                    <h1 className="text-sm font-medium text-primary">{auth.role}</h1>
                </div>

                <div className="flex flex-col mt-2">
                    {sidebarLink?.map((item, i)=>(
                        item.roles.includes(auth?.role) && (
                            <Link onClick={handleCloseSidebar} key={i} to={item.to} className={`link-item ${activeItem === i ? "active-item": ""}`}>
                                {item.icon}
                                {item.label}
                            </Link>
                        )
                    )) }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;