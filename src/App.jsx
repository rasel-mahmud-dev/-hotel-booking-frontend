import './App.scss'
import {RouterProvider} from "react-router-dom";
import router from "src/routes/index.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchCurrentAuthAction} from "store/actions/authAction.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCurrentAuthAction())
    }, []);


    return (
        <>
            <ToastContainer autoClose={10000} />
            <RouterProvider router={router}/>
        </>
    )
}

export default App
