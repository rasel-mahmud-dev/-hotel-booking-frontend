import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Avatar from "components/Avatar/Avatar.jsx";
import {BiPen} from "react-icons/bi";
import chooseImage from "src/utils/chooseImage.js";
import resizeImage from "src/utils/resizeImage.js";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {updateProfileAction} from "store/actions/authAction.js";
import {toast} from "react-toastify";

const DashboardHomePage = () => {

    const {auth} = useSelector(state => state.authState)

    const [profile, setProfile] = useCustomReducer({
        avatar: "",
        avatarBlob: null
    })

    const dispatch = useDispatch()

    async function handleUploadAvatar() {
        let file = await chooseImage()
        if (file && file.base64) {
            let out = await resizeImage(file.base64)
            setProfile({avatarBlob: out})

            const formData = new FormData()
            formData.append("avatar", out.blob, file.name)
            dispatch(updateProfileAction(formData)).unwrap().then(() => {
                toast.success("Profile Photo has been changed")
            }).catch(ex => {
                toast.error(ex)
            })
        }
    }

    return (
        <div>
            <div className="card">
                <h1 className=" text-xl text-dark-400 font-semibold">Welcome {auth.fullName}</h1>

                <div className="">
                    <div className="relative w-max ">
                        <Avatar className="w-28 h-28" imgClass="w-28 h-28" username={"sdlfjk"}
                                src={(profile.avatarBlob && profile.avatarBlob.base64) ? profile.avatarBlob.base64 : auth.avatar}/>
                        <div onClick={handleUploadAvatar}
                             className="cursor-pointer mt-2 flex items-center bg-primary px-1 py-px rounded text-xs text-white">
                            <div
                                className=" bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
                                <BiPen className="text-sm"/></div>
                            <span>Update Image</span>
                        </div>

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