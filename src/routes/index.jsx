import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import {lazy} from "react";

const Homepage = lazy(() => import("pages/Homepage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <Homepage/>}
        ]
    }
])


export default router