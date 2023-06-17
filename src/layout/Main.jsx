import {Outlet} from "react-router-dom";

import Header from "components/Header/Header.jsx";
import {Suspense} from "react";
import Loader from "components/Loader/Loader.jsx";


const Main = () => {
    return (
        <div className="relative">
            <Header/>
            <Suspense fallback={<div className="loader-v-position"><Loader title="Page is loading..."/></div>}>
                <Outlet/>
            </Suspense>
        </div>
    );
};

export default Main;