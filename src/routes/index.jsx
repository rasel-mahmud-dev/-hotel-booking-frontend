import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import {lazy} from "react";
import Registration from "pages/Registration/Registration.jsx";
import Dashboard from "layout/Dashboard.jsx";
import DashboardHome from "pages/Dashboard/DashboardHome.jsx";
import PrivateRoute from "src/middleware/PrivateRoute.jsx";
import AuthExcludeRoute from "src/middleware/AuthExcludeRoute.jsx";
import AddHotel from "pages/Dashboard/AddHotel.jsx";


const Homepage = lazy(() => import("pages/Homepage/HomePage.jsx"));
const Login = lazy(() => import("pages/Login/Login.jsx"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <Homepage/>},
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
        ]
    }
])


export default router