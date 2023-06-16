import React from 'react';
import InputGroup from "components/Input/InputGroup.jsx";
import Button from "components/Button/Button.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {loginOrRegistrationAction} from "store/actions/authAction.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loader from "components/Loader/Loader.jsx";
import InfoMessage from "components/InfoMessage/InfoMessage.jsx";


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useCustomReducer({
        email: "",
        password: "",
        errorMessage: "",
        isLoading: false
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        // clear initial state for loader and error message
        setUserInput({isLoading: false, errorMessage: ""})


        if (!userInput.email) {
            return setUserInput({errorMessage: "Email is required"})
        }
        if (!userInput.password) {
            return setUserInput({errorMessage: "Password is required"})
        }

        setUserInput({isLoading: true})

        dispatch(loginOrRegistrationAction({
            type: "login",
            data: userInput
        })).unwrap().then(()=>{
            navigate('/')
        }).finally(()=>{
            // setUserInput({isLoading: false})
        })
    };


    function handleChange({target: {name, value}}) {
        setUserInput({[name]: value})
    }

    return (
        <div className="container !mt-24">
            <div className="max-w-lg mx-auto card p-5 ">
                <h4 className="card-title">Login</h4>
                <form onSubmit={handleSubmit}>

                    {userInput.isLoading && <Loader title="Please wait" width="200" /> }
                    <InfoMessage status="error" message={userInput.errorMessage} />

                    <InputGroup
                        name="email"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Email"
                        placeholder="Enter you email"
                    />

                    <InputGroup
                        name="password"
                        onChange={handleChange}
                        labelClass="font-sm  text-gray-600"
                        className="flex flex-col mt-4"
                        label="Password"
                        placeholder="Enter you password"
                    />

                    <Button variant="primary" type="submit" className="mt-8">Search</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;