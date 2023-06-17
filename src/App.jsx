import './App.scss'
import {RouterProvider} from "react-router-dom";
import router from "src/routes/index.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchCurrentAuthAction} from "store/actions/authAction.js";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCurrentAuthAction())
  }, []);


  return <RouterProvider router={router} />
}

export default App
