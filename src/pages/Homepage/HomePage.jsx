import React from 'react';
import HeroSection from "components/Home/HeroSection.jsx";
import FindRoomForm from "components/Home/FindRoomForm.jsx";
import TopPopularRooms from "components/Home/TopPopularRooms.jsx";

import FilterRooms from "components/Home/FilterRooms.jsx";
import "./homepage.scss"

const HomePage = () => {
    return (
        <div className="homepage">
            <HeroSection />
            <div className="container">
                <FindRoomForm />
                <FilterRooms />
                <TopPopularRooms />

            </div>
        </div>
    );
};

export default HomePage;