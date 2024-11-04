import { useState, Fragment } from 'react'
import './App.css'
import MainPage from './page/Main'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [count, setCount] = useState(0)

    return (
        <Fragment>
            <MainPage/>
            <ToastContainer />
        </Fragment>
    )
}

export default App
