import React from 'react';
import {useSelector} from "react-redux";
import Avatar from "components/Avatar/Avatar.jsx";
import {BiPen} from "react-icons/bi";

const DashboardHomePage = () => {

    const {auth} = useSelector(state => state.authState)

    return (
        <div>
            <div className="card">
                <h1 className=" text-xl text-dark-400 font-semibold">Welcome {auth.fullName}</h1>

                <div className="">
                    <div className="relative w-max ">
                        <Avatar className="w-28 h-28" imgClass="w-28 h-28" username={"sdlfjk"} src={auth.avatar}/>
                        <div
                            className="cursor-pointer absolute bottom-1 right-1 bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
                            <BiPen className="text-sm"/></div>
                    </div>


                    <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2 mt-4">
                        <h4 className="min-w-[120px]">First Name: </h4>
                        <h5>{auth.firstName}</h5>
                    </div>
                    <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                        <h4 className="min-w-[120px]">Last Name: </h4>
                        <h5>{auth.lastName}</h5>
                    </div>
                    <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                        <h4 className="min-w-[120px]">Email: </h4>
                        <h5>{auth.email}</h5>
                    </div>
                    <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                        <h4 className="min-w-[120px]">Role: </h4>
                        <h5>{auth.role}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomePage;