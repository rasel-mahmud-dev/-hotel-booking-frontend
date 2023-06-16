import React from 'react';
import HeroSection from "components/Home/HeroSection.jsx";
import FindRoomForm from "components/Home/FindRoomForm.jsx";

const HomePage = () => {
    return (
        <div className="">
            <HeroSection />
            <div className="container">
                <FindRoomForm />
            </div>
        </div>
    );
};

export default HomePage;