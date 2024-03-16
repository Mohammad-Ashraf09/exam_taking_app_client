// import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const LoginOption = () => {
    return (
        <>
        <Navbar/>
        <div className="loginOption-container">
            <div className="loginOption-container-wrapper">
                <Link to='/studentLogin' style={{textDecoration: 'none'}}>
                    <div className="loginOption student"> Student Login </div>
                </Link>
                <Link to='/adminLogin' style={{textDecoration: 'none'}}>
                    <div className="loginOption admin"> Admin Login </div>
                </Link>
            </div>
        </div>
        </>
    )
}

export default LoginOption;
