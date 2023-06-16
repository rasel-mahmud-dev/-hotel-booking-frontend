import React, {useEffect, useState} from 'react';
import "./header.scss"
import {NavLink} from "react-router-dom";
import throttle from "src/utils/throttle.js";
import {HiShoppingCart} from "react-icons/hi";
import Button from "components/Button/Button.jsx";
import {BiShoppingBag} from "react-icons/bi";

const Header = () => {

    const items = {
        Home: "/",
        About: "",
        Gallery: "",
        Services: "",
        Rooms: "/",
        Contact: ""
    }

    const [isNavFixed, setNaxFixed] = useState(false)

    function handleOnScroll() {
        let top = document.body.scrollTop || document.documentElement.scrollTop;
        if (top > 200) {
            setNaxFixed(true);
        } else {
            setNaxFixed(false);
        }
    }



    useEffect(()=>{
        window.addEventListener("scroll", throttle(handleOnScroll, 200))
        return ()=> window.removeEventListener("scroll", throttle(handleOnScroll, 200))
    }, [])

    return (
        <header className={`header ${isNavFixed ? "fixed-navigation" : ""}`}>

            <div className="container">

            <div className="logo">

            </div>

            <nav>
                {Object.keys(items).map(key=>(
                    <NavLink key={key} to={items[key]}>
                        <li>
                            {key}
                        </li>
                    </NavLink>
                ))}
            </nav>


                <div className="flex items-center gap-x-4">
                    <Button>Login</Button>
                    <div className="relative">
                        <BiShoppingBag className="text-xl text-white" />
                        <span className="text-xs font-semibold bg-white w-5 h-5 flex items-center justify-center rounded-full absolute -top-3 -right-3">10</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;