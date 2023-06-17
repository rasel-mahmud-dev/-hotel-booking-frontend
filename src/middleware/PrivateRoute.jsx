import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from "components/Loader/Loader.jsx";

const PrivateRoute = ({children}) => {

    const {authLoaded, auth} = useSelector(state=>state.authState)

    if (!authLoaded) return (
        <div className="loader-v-position">
           <Loader  title="Cheeking your permission"/>
        </div>
    )

    if (authLoaded && !auth) {
        return <Navigate to="/login"/>
    }

    return children
};

export default PrivateRoute;

