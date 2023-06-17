import React from 'react';
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {loginOrRegistrationAction} from "store/actions/authAction.js";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import Loader from "components/Loader/Loader.jsx";
import InfoMessage from "components/InfoMessage/InfoMessage.jsx";


const Registration = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useCustomReducer({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "USER",
        phone: "",
        errorMessage: "",
        isLoading: false
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        // clear initial state for loader and error message
        setUserInput({isLoading: false, errorMessage: ""})

        if (!userInput.firstName.trim()) {
            return setUserInput({errorMessage: "First Name is required"})
        }
        if (!userInput.email.trim()) {
            return setUserInput({errorMessage: "Email is required"})
        }
        if (!userInput.password.trim()) {
            return setUserInput({errorMessage: "Password is required"})
        }


        if (userInput.role === "HOTEL_OWNER" && !userInput.phone.trim()){
            return setUserInput({errorMessage: "Hotel Owner phone is required"})
        }

        setUserInput({isLoading: true})

        const formData = new FormData()
        formData.append("firstName", userInput.firstName.trim())
        formData.append("lastName", userInput.lastName?.trim())
        formData.append("email", userInput.email.trim())
        formData.append("password", userInput.password.trim())
        formData.append("phone", userInput.phone.trim())
        formData.append("role", userInput.role)

        dispatch(loginOrRegistrationAction({
            type: "registration",
            data: formData
        })).unwrap().then(() => {
            navigate('/')
        }).finally(() => {
            // setUserInput({isLoading: false})
        })
    };


    function handleChange({target: {name, value}}) {
        setUserInput({[name]: value})
    }

    return (
        <div className="container !mt-40">
            <div className="max-w-lg mx-auto card p-5 ">
                <h4 className="card-title">Create an account</h4>
                <form onSubmit={handleSubmit}>

                    {userInput.isLoading && <Loader title="Please wait" width="200"/>}
                    <InfoMessage status="error" message={userInput.errorMessage}/>

                    <InputGroup
                        name="firstName"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="First Name"
                        placeholder="Enter your firstName"
                    />
                    <InputGroup
                        name="lastName"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Last Name"
                        placeholder="Enter your lastName"
                    />

                    <InputGroup
                        name="email"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Email"
                        placeholder="Enter your email"
                    />

                    <InputGroup
                        name="password"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Password"
                        placeholder="Enter your password"
                    />



                    <InputGroup
                        name="role"
                        defaultValue={userInput.role}
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Role"
                        placeholder="Enter your password"
                        as="select"
                        renderOption={()=>(
                            [{name: "User", value: "USER"}, {name:"Hotel owner", value: "HOTEL_OWNER"}].map(role=>(
                                <option key={role.name} value={role.value}>{role.name}</option>
                            ))
                        )}
                    />


                    {userInput.role === "HOTEL_OWNER" && <InputGroup
                        name="phone"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Phone"
                        type="number"
                        placeholder="Enter your phone"
                    /> }

                    <div className="text-sm mt-4">
                        <span>Already have an account ?</span>
                        <Link className="text-primary ml-1" to="/login">login</Link>
                    </div>


                    <Button disabled={userInput.isLoading} variant="primary" type="submit"
                            className="mt-8">Registration</Button>
                </form>
            </div>
        </div>
    );
};

export default Registration;