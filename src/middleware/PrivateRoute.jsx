import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from "components/Loader/Loader.jsx";

const PrivateRoute = ({children}) => {

    const {authLoaded, auth} = useSelector(state=>state.authState)

    if (!authLoaded) return (
        <div className="py-24 w-full flex justify-center  items-center flex-col">
           <Loader  title="Cheeking your permission"/>
        </div>
    )

    if (authLoaded && !auth) {
        return <Navigate to="/join"/>
    }

    return children
};

export default PrivateRoute;

