import React, {useEffect} from 'react';
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "components/Loader/Loader.jsx";
import InfoMessage from "components/InfoMessage/InfoMessage.jsx";
import ImageChoose from "components/Input/Image.jsx";
import addresses from "store/addresses.json"
import getUniqueElem from "src/utils/getUniqueElem.js";
import {createHotelAction, getHotelDetailAction} from "store/actions/hotelAction.js";
import {toast} from "react-toastify";


const AddHotel = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {hotelId} = useParams()

    const [userInput, setUserInput] = useCustomReducer({
        name: "",
        description: "",
        image: "",
        country: "",
        city: "",
        street: "",
        errorMessage: "",
        isLoading: false
    })

    useEffect(() => {

        if (hotelId) {
            const query = "?type=edit&hotelId=" + hotelId
            dispatch(getHotelDetailAction(query)).unwrap().then((data) => {
                if (data) {
                    setUserInput({
                        name: data.name,
                        description: data.description,
                        image: data.image,
                        country: data.address?.country,
                        city: data.address?.city,
                        street: data.address?.street,
                    })
                }
            })
        }

    }, [hotelId])

    const handleSubmit = (e) => {
        e.preventDefault()

        // clear initial state for loader and error message
        setUserInput({isLoading: false, errorMessage: ""})

        if (!userInput.name.trim()) {
            return setUserInput({errorMessage: "Name is required"})
        }
        if (!userInput.description.trim()) {
            return setUserInput({errorMessage: "Description is required"})
        }
        if (!userInput.image) {
            return setUserInput({errorMessage: "Hotel Image is required"})
        }

        setUserInput({isLoading: true})

        const formData = new FormData()
        formData.append("name", userInput.name.trim())
        formData.append("description", userInput.description?.trim())
        formData.append("city", userInput.city.trim())
        formData.append("street", userInput.street.trim())
        formData.append("country", userInput.country.trim())

        if (userInput.image && userInput.image instanceof Blob) {
            formData.append("image", userInput.image, "image.jpg")
        } else {
            formData.append("image", userInput.image)
        }
        

        if (hotelId) {
            formData.append("_id", hotelId)
        }

        dispatch(createHotelAction(formData)).unwrap().then(() => {
            navigate('/dashboard/my-hotel')
        }).catch(msg=>{
            toast.error(msg)
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
                <h4 className="card-title">{!hotelId ? "Add Hotel" : "Update Hotel"}</h4>

                <form onSubmit={handleSubmit}>
                    {userInput.isLoading && <Loader title="Please wait" width="200"/>}
                    <InfoMessage status="error" message={userInput.errorMessage}/>

                    <InputGroup
                        name="name"
                        value={userInput.name}
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Hotel Name"
                        placeholder="Hotel name"
                    />

                    <InputGroup
                        value={userInput.description}
                        as="textarea"
                        name="description"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Description"
                        placeholder="Hotel Description"
                    />


                    {
                        Object.keys(addresses[0]).map(key => (
                            <InputGroup
                                name={key}
                                value={userInput[key]}
                                onChange={handleChange}
                                labelClass="font-sm  text-gray-600"
                                className="flex flex-col mt-4"
                                label={key}
                                placeholder={"Enter " + key}
                                as="select"
                                renderOption={() => (
                                    getUniqueElem(addresses.map(add => add[key])).map((elem, i) => (
                                        <option key={i} value={elem}>{elem}</option>
                                    ))
                                )}
                            />
                        ))
                    }

                    <ImageChoose
                        defaultValue={userInput.image}
                        onChange={handleChange}
                        placeholder="Choose hotel image"
                        name="image"
                        label="Hotel Image"
                    />


                    <Button disabled={userInput.isLoading} variant="primary" type="submit"
                            className="mt-8">{hotelId ? "Update" : "Create"}</Button>
                </form>
            </div>
        </div>
    );
};

export default AddHotel;