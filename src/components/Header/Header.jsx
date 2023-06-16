import React from 'react';
import "./header.scss"
import {NavLink} from "react-router-dom";

const Header = () => {


    const items = {
        Home: "/",
        About: "",
        Gallery: "",
        Services: "",
        Rooms: "/",
        Contact: ""
    }

    return (
        <header className="header">

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
            </div>
        </header>
    );
};

export default Header;