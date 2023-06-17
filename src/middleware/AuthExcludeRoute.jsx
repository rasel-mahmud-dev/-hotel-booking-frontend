import React from 'react';


import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Loader from "components/Loader/Loader.jsx";

const AuthExcludeRoute = ({children}) => {
    const {authLoaded, auth} = useSelector(state=>state.authState)

    if (!authLoaded) return (
        <div className="loader-v-position">
            <Loader  title="Cheeking your permission"/>
        </div>
    )

    if (authLoaded && !auth) {
        return children
    }

    return <Navigate to="/" />
};

export default AuthExcludeRoute;

