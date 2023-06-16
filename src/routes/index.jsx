import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import {lazy} from "react";


const Homepage = lazy(() => import("pages/Homepage/HomePage.jsx"));
const Login  = lazy(() => import("pages/Login/Login.jsx"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <Homepage/>},
            {path: "login", element: <Login/>}
        ]
    }
])


export default router