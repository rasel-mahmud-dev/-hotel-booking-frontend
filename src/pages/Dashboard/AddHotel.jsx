import React from 'react';
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loader from "components/Loader/Loader.jsx";
import InfoMessage from "components/InfoMessage/InfoMessage.jsx";
import ImageChoose from "components/Input/Image.jsx";
import addresses from "src/store/addresses.json"
import getUniqueElem from "src/utils/getUniqueElem.js";
import {createHotelAction} from "store/actions/hotelAction.js";


const AddHotel = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        formData.append("firstName", userInput.firstName.trim())
        formData.append("lastName", userInput.lastName?.trim())
        formData.append("email", userInput.email.trim())
        formData.append("password", userInput.password.trim())
        formData.append("phone", userInput.phone.trim())

        dispatch(createHotelAction(formData)).unwrap().then(() => {
            // navigate('/')
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
                <h4 className="card-title">Add Hotel</h4>

                <form onSubmit={handleSubmit}>
                    {userInput.isLoading && <Loader title="Please wait" width="200"/>}
                    <InfoMessage status="error" message={userInput.errorMessage}/>

                    <InputGroup
                        name="name"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Hotel Name"
                        placeholder="Hotel name"
                    />

                    <InputGroup
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

                    <ImageChoose onChange={handleChange} placeholder="Choose hotel image" name="image" label="Hotel Image"/>


                    <Button disabled={userInput.isLoading} variant="primary" type="submit"
                            className="mt-8">Create</Button>
                </form>
            </div>
        </div>
    );
};

export default AddHotel;