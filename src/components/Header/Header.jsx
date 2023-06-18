import React, {useEffect, useState} from 'react';
import "./header.scss"
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import throttle from "src/utils/throttle.js";
import Button from "components/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import MenuDropdown from "components/Dropdown/MenuDropdown.jsx";
import {logoutAction} from "store/slices/authSlice.js";
import Avatar from "components/Avatar/Avatar.jsx";
import {BsCart} from "react-icons/bs";

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
    const navigate = useNavigate()


    function handleOnScroll(e) {
        let l = e.target.location
        let top = document.body.scrollTop || document.documentElement.scrollTop;
        if (top > 200) {
            setNaxFixed(true);
        } else {
            if (l.pathname !== "/") {
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
    }, [location])


    function handleLogout() {
        dispatch(logoutAction())
    }


    return (
        <header className={`header ${isNavFixed ? "fixed-navigation" : ""}`}>

            <div className="container">

                <Link to="/">
                    <div className="logo flex items-center gap-x-1 cursor-pointer">
                        <img src="/images/logo.svg" alt=""/>
                        <h4 className="text-white text-xl uppercase">Shelter</h4>
                    </div>
                </Link>

                <nav>
                    {Object.keys(items).map(key => (
                        <NavLink key={key} to={items[key]}>
                            <li>
                                {key}
                            </li>
                        </NavLink>
                    ))}
                </nav>


                <div className="flex items-center gap-x-5">
                    <div>
                        <BsCart className="text-white text-xl"/>
                    </div>
                    {auth ? (
                        <div>
                            <MenuDropdown contentClass="!right-0" render={() => (
                                <div className="">
                                    <li onClick={() => navigate("/dashboard")}
                                        className="list-none text-sm font-medium hover:bg-primary/20 py-2 px-2">Dashboard
                                    </li>
                                    {/*<li onClick={() => navigate("/dashboard")}*/}
                                    {/*    className="list-none text-sm font-medium hover:bg-primary/20 py-2 px-2">Dashboard*/}
                                    {/*</li>*/}
                                    <li onClick={handleLogout}
                                        className="list-none text-sm font-medium hover:bg-primary/20 py-2 px-2">Logout
                                    </li>
                                </div>
                            )}>
                                <div>
                                    <Avatar imgClass="w-10 h-10" className="w-10 h-10 " src={auth?.avatar}
                                            username={auth?.fullName}/>
                                </div>
                            </MenuDropdown>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-4">
                            <Link to="/login"><Button>Login</Button></Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;