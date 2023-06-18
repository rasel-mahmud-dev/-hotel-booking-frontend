import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import {lazy} from "react";

import Dashboard from "layout/Dashboard.jsx";
import DashboardHome from "pages/Dashboard/DashboardHome.jsx";

import PrivateRoute from "src/middleware/PrivateRoute.jsx";
import AuthExcludeRoute from "src/middleware/AuthExcludeRoute.jsx";
import HomePage from "pages/Homepage/HomePage.jsx";
import Login from "pages/Login/Login.jsx";


const AddHotel = lazy(() => import("pages/Dashboard/Shared/AddHotel.jsx"));
const AllUsers = lazy(() => import("pages/Dashboard/Admin/AllUsers.jsx"));
const MyHotel = lazy(() => import("pages/Dashboard/HotelOwner/MyHotel.jsx"));
const AddRoom = lazy(() => import("pages/Dashboard/Shared/AddRoom.jsx"));
const FilterRooms = lazy(() => import("pages/FilterRooms/FilterRooms.jsx"));
const Registration = lazy(() => import("pages/Registration/Registration.jsx"));


const MyBookings = lazy(() => import( "pages/Dashboard/User/MyBookings.jsx"))
const MyRooms = lazy(() => import( "pages/Dashboard/HotelOwner/MyRooms.jsx"))
const AllBookings = lazy(() => import( "pages/Dashboard/Admin/AllBookings.jsx"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <HomePage/>},
            {path: "hotel/rooms", element: <FilterRooms/>},
            {path: "login", element: <AuthExcludeRoute> <Login/> </AuthExcludeRoute>},
            {path: "registration", element: <AuthExcludeRoute><Registration/></AuthExcludeRoute>}
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute roles={["USER", "ADMIN", "HOTEL_OWNER"]}><Dashboard/></PrivateRoute>,
        children: [
            {path: "", element: <DashboardHome/>},
            {path: "add-hotel", element: <PrivateRoute roles={["ADMIN", "HOTEL_OWNER"]}> <AddHotel/> </PrivateRoute>},
            {
                path: "update-hotel/:hotelId",
                element: <PrivateRoute roles={["ADMIN", "HOTEL_OWNER"]}><AddHotel/></PrivateRoute>
            },
            {path: "my-hotel", element: <PrivateRoute roles={["ADMIN", "HOTEL_OWNER"]}> <MyHotel/> </PrivateRoute>},
            {path: "all-hotels", element: <PrivateRoute roles={["ADMIN"]}> <MyHotel/></PrivateRoute>}, // admin can see all hotel
            {path: "my-rooms", element: <PrivateRoute roles={["ADMIN", "HOTEL_OWNER"]}> <MyRooms/></PrivateRoute>},

            {path: "my-bookings", element: <MyBookings/>},
            {path: "all-bookings", element: <PrivateRoute roles={["ADMIN"]}> <AllBookings/></PrivateRoute>},

            {path: "users", element: <PrivateRoute roles={["ADMIN"]}> <AllUsers/></PrivateRoute>},

            {path: "add-room", element: <PrivateRoute roles={["ADMIN", "HOTEL_OWNER"]}> <AddRoom/></PrivateRoute>},
            {
                path: "update-room/:roomId",
                element: <PrivateRoute roles={["ADMIN", "HOTEL_OWNER"]}> <AddRoom/></PrivateRoute>
            },
        ]
    }
])


export default router