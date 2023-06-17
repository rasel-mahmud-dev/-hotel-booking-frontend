import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import {lazy} from "react";
import Registration from "pages/Registration/Registration.jsx";
import Dashboard from "layout/Dashboard.jsx";
import DashboardHome from "pages/Dashboard/DashboardHome.jsx";
import PrivateRoute from "src/middleware/PrivateRoute.jsx";
import AuthExcludeRoute from "src/middleware/AuthExcludeRoute.jsx";
import AddHotel from "pages/Dashboard/Shared/AddHotel.jsx";
import MyHotel from "pages/Dashboard/HotelOwner/MyHotel.jsx";
import AddRoom from "pages/Dashboard/Shared/AddRoom.jsx";
import FilterRooms from "pages/FilterRooms/FilterRooms.jsx";


import HomePage from "pages/Homepage/HomePage.jsx";
import Login  from "pages/Login/Login.jsx";

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
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            {path: "", element: <DashboardHome/>},
            {path: "add-hotel", element: <AddHotel/>},
            {path: "update-hotel/:hotelId", element: <AddHotel/>},
            {path: "my-hotel", element: <MyHotel/>},

            {path: "add-room", element: <AddRoom/>},
            {path: "update-room/:roomId", element: <AddRoom/>},
        ]
    }
])


export default router