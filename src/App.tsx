import './App.css'
import Navbar from "./components/Navbar.tsx";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/Home.tsx";
import Details from "./components/Details.tsx";


function App() {
  return (
    <>

        <Navbar />

        <div style={{ paddingTop: "6vh", paddingBottom: "6vh", paddingLeft: "6vw", paddingRight: "6vw" }}>
            <Router>
                <Routes>
                    <Route path="" element={<Home />} ></Route>
                    <Route path="/pokemon/:id" element={<Details />} ></Route>
                    <Route path="*" element={ <Navigate to={"/"} /> }></Route>
                </Routes>
            </Router>
        </div>


    </>
  )
}

export default App
