import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";

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
import Login from "pages/Login/Login.jsx";
import MyBookings from "pages/Dashboard/User/MyBookings.jsx";
import MyRooms from "pages/Dashboard/HotelOwner/MyRooms.jsx";
import AllUsers from "pages/Dashboard/Admin/AllUsers.jsx";
import AllBookings from "pages/Dashboard/Admin/AllBookings.jsx";

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