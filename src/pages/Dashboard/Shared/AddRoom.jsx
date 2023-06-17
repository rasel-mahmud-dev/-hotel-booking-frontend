import React, {useEffect} from 'react';
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "components/Loader/Loader.jsx";
import InfoMessage from "components/InfoMessage/InfoMessage.jsx";
import ImageChoose from "components/Input/Image.jsx";
import getUniqueElem from "src/utils/getUniqueElem.js";
import {createRoomAction, getHotelDetailAction} from "store/actions/hotelAction.js";


const AddRoom = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {roomId} = useParams()

    const [userInput, setUserInput] = useCustomReducer({
        roomName: "",
        hotelId: "",
        roomType: "", // Standard //
        description: "",
        capacity: 2,
        image: "",
        price: 100,
        errorMessage: "",
        isLoading: false
    })



    useEffect(() => {
        if (roomId) {
            const query = "?type=edit&roomId=" + roomId
            dispatch(getHotelDetailAction(query)).unwrap().then((data) => {
                if (data) {
                    setUserInput({
                        roomName: data.roomName,
                        hotelId: data.hotelId,
                        roomType: data.roomType,
                        description: data.description,
                        capacity: data.capacity,
                        image: data.image,
                        price: data.price
                    })
                }
            })
        }
    }, [roomId])

    const handleSubmit = (e) => {
        e.preventDefault()

        // clear initial state for loader and error message
        setUserInput({isLoading: false, errorMessage: ""})

        if (!userInput.roomName.trim()) {
            return setUserInput({errorMessage: "Room name is required"})
        }
        if (!userInput.description.trim()) {
            return setUserInput({errorMessage: "Description is required"})
        }
        if (!userInput.image) {
            return setUserInput({errorMessage: "Room Image is required"})
        }

        setUserInput({isLoading: true})

        const formData = new FormData()
        formData.append("roomName", userInput.name.trim())
        formData.append("description", userInput.description?.trim())
        formData.append("price", userInput.city.trim())
        formData.append("roomType", userInput.roomType.trim())
        formData.append("hotelId", userInput.hotelId)
        formData.append("capacity", userInput.capacity)

        if (userInput.image && userInput.image instanceof Blob) {
            formData.append("image", userInput.image, "image.jpg")
        } else {
            formData.append("image", userInput.image)
        }

        if (roomId) {
            formData.append("_id", roomId)
        }

        dispatch(createRoomAction(formData)).unwrap().then(() => {
            navigate('/dashboard/rooms')
        }).finally(() => {
            setUserInput({isLoading: false})
        })
    };


    function handleChange({target: {name, value}}) {
        setUserInput({[name]: value})
    }

    return (
        <div className="container ">
            <div className="max-w-lg mx-auto card p-5 mt-8 ">
                <h4 className="card-title">{!roomId ? "Add Room" : "Update Room"}</h4>

                <form onSubmit={handleSubmit}>
                    {userInput.isLoading && <Loader title="Please wait" width="200"/>}
                    <InfoMessage status="error" message={userInput.errorMessage}/>

                    <InputGroup
                        name="roomName"
                        value={userInput.roomName}
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Room Name"
                        placeholder="Room name"
                    />

                    <InputGroup
                        value={userInput.price}
                        type="number"
                        name="price"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Price"
                        placeholder="Room Price"
                    />


                    <InputGroup
                        value={userInput.capacity}
                        type="number"
                        name="capacity"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Capacity"
                        placeholder="Room Capacity"
                    />


                    <InputGroup
                        value={userInput.description}
                        as="textarea"
                        name="description"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Description"
                        placeholder="Room Description"
                    />


                    <ImageChoose
                        defaultValue={userInput.image}
                        onChange={handleChange}
                        placeholder="Choose room image"
                        name="image"
                        label="Room image"
                    />


                    <Button disabled={userInput.isLoading} variant="primary" type="submit"
                            className="mt-8">{roomId ? "Update" : "Create"}</Button>
                </form>
            </div>
        </div>
    );
};

export default AddRoom;