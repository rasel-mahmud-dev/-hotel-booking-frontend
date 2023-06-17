import React, {useEffect, useState} from 'react';
import "./header.scss"
import {Link, NavLink, useLocation} from "react-router-dom";
import throttle from "src/utils/throttle.js";
import Button from "components/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {BiShoppingBag} from "react-icons/bi";
import MenuDropdown from "components/Dropdown/MenuDropdown.jsx";
import {logoutAction} from "store/slices/authSlice.js";

const Header = () => {


    const {auth} = useSelector(state => state.authState)

    const items = {
        Home: "/",
        About: "",
        Gallery: "",
        Services: "",
        Rooms: "/",
        Contact: ""
    }

    const [isNavFixed, setNaxFixed] = useState(false)

    const location = useLocation()
    const dispatch = useDispatch()


    function handleOnScroll() {

        let top = document.body.scrollTop || document.documentElement.scrollTop;
        if (top > 200) {
            setNaxFixed(true);
        } else {
            if (location.pathname !== "/") {
                setNaxFixed(true);
            } else {
                setNaxFixed(false);
            }
        }
    }


    useEffect(() => {
        window.addEventListener("scroll", throttle(handleOnScroll, 200))
        return () => window.removeEventListener("scroll", throttle(handleOnScroll, 200))
    }, [])

    useEffect(() => {
        if (location.pathname !== "/") {
            setNaxFixed(true)
        }

    }, [location.pathname])


    function handleLogout() {
        dispatch(logoutAction())
    }


    return (
        <header className={`header ${isNavFixed ? "fixed-navigation" : ""}`}>

            <div className="container">

                <div className="logo">
                    <img src="/images/hotel-booking-logo-design_675581-44 copy.webp" alt=""/>
                </div>

                <nav>
                    {Object.keys(items).map(key => (
                        <NavLink key={key} to={items[key]}>
                            <li>
                                {key}
                            </li>
                        </NavLink>
                    ))}
                </nav>

                {auth ? (
                    <div>
                        <MenuDropdown render={() => (
                            <div>
                                <Link to="/dashboard">
                                    <li className="list-none text-sm font-medium hover:bg-primary/20 py-2 px-2">Dashboard</li>
                                </Link>

                                <Link to="/dashboard">
                                    <li className="list-none text-sm font-medium hover:bg-primary/20 py-2 px-2">Dashboard</li>
                                </Link>

                                <li onClick={handleLogout}
                                    className="list-none text-sm font-medium hover:bg-primary/20 py-2 px-2">Logout
                                </li>

                            </div>
                        )}>
                            {auth?.fullName}
                        </MenuDropdown>
                    </div>
                ) : (
                    <div className="flex items-center gap-x-4">
                        <Link to="/login"><Button>Login</Button></Link>
                        <div className="relative">
                            <BiShoppingBag className="text-xl text-white"/>
                            <span
                                className="text-xs font-semibold bg-white w-5 h-5 flex items-center justify-center rounded-full absolute -top-3 -right-3">10</span>
                        </div>

                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;