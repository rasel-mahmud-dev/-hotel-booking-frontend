import React, {Suspense, useEffect, useState} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Header from "components/Header/Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebarAction} from "store/slices/appSlice.js";
import Loader from "components/Loader/Loader.jsx";
import useScrollTop from "src/hooks/useScrollTop.js";
import Sidebar from "components/Sidebar/Sidebar.jsx";

const sidebarLinks = [
    {
        label: "Dashboard",
        roles: ["USER", "ADMIN", "HOTEL_OWNER"],
        to: "/dashboard"
    },
    {
        label: "Add Hotel",
        roles: ["ADMIN", "HOTEL_OWNER"],
        to: "/dashboard/add-hotel"
    },
    {
        label: "My Hotel",
        roles: ["HOTEL_OWNER", "ADMIN"],
        to: "/dashboard/my-hotel"
    },
    {
        label: "All Hotel",
        roles: ["ADMIN"],
        to: "/dashboard/all-hotels"
    },
    {
        label: "My Bookings",
        roles: ["USER", "ADMIN", "HOTEL_OWNER"],
        to: "/dashboard/my-bookings"
    },
    {
        label: "All User",
        roles: ["ADMIN"],
        to: "/dashboard/users"
    }
]


const Dashboard = () => {
    useScrollTop();

    const {auth} = useSelector(state => state.authState);

    const location = useLocation()


    const [activeItem, setActiveItem] = useState(0)


    useEffect(() => {
        let linkIndex = sidebarLinks.findIndex(link => location.pathname === link.to)
        if (linkIndex !== -1) {
            setActiveItem(linkIndex)
        }
    }, [location.pathname])


    const dispatch = useDispatch()
    const {openSidebar} = useSelector(state => state.appState)

    function toggleSidebar() {
        dispatch(toggleSidebarAction(""))
    }

    return (
        <div>
            <div className="">
                <Header/>
                <div className="header-space"></div>
                <div className="container dashboard-wrapper !px-0 ">
                    <div className={`backdrop ${openSidebar === "dashboard" ? "backdrop-open" : ""}`}
                         onClick={toggleSidebar}></div>
                    <Sidebar
                        activeItem={activeItem}
                        sidebarLink={sidebarLinks}
                        className={`sidebar ${openSidebar === "dashboard" ? "sidebar-open" : ""}`}
                    />
                    <div className="content">
                        <Suspense fallback={<div className="loader-v-position"><Loader
                            title="Please wait..."
                        /></div>}>
                            <Outlet/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;