import { useContext } from "react";
// import axios from 'axios';
// import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
// import { REACT_APP_BASE_URL } from '../config/keys';


const Navbar = () => {
    // const location = useLocation();
    const { user } = useContext(AuthContext);
    // const {user:currentUser} = useContext(AuthContext);
    // const dp = user?.profilePicture?.includes('https://') ? user?.profilePicture : `/assets/${user?.profilePicture}`;

    const logoutHandler = () =>{
        const logout = window.confirm("Are you sure, you want to logout?");
        if(logout){
            localStorage.clear();
            window.location.href='/'
        }
    }

  return (
    <div className='navbar-container'>
        <div className="navbar-left">
            <img src='/logo-48.png' alt="" className="logo-img"/>
            {/* <div className="logo-text">Dr<span style={{color: '#C04000'}}>Fiza</span></div> */}
            <div className="logo-text">Hell<span style={{color: 'black'}}>o...</span></div>
        </div>

        {/* {!['/', '/loginOption', '/studentLogin', '/adminLogin', '/studentSignup', '/adminSignup'].includes(location?.pathname) ? */}
        {user ?
            <div className="navbar-right">
                <div className="navbar-right-item">
                    <NavLink to='/' className={({isActive}) => `${isActive ? 'active' : 'inactive'}`}>
                        <div className="nav"> Dashboard </div>
                    </NavLink>
                </div>

                {/* <div className="navbar-right-item">
                    <div className="nav timer"> Timer </div>
                </div>

                <div className="navbar-right-item">
                    <div className="nav attempt"> Attempts: 5 <s/div>
                </div> */}

                <div className="navbar-right-item user-dp-name">
                    {user?.isAdmin ?
                        <>
                            <NavLink to={`/adminProfile/${user?._id}`} className={({isActive}) => `${isActive ? 'active' : 'inactive'}`}>
                                <img src={user?.profilePicture} alt="" className="navbar-img" />
                            </NavLink>
                            <NavLink to={`/adminProfile/${user?._id}`} className={({isActive}) => `${isActive ? 'active' : 'inactive'}`}>
                                <div className="navbar-username">{user?.name}</div>
                            </NavLink>
                        </> :
                        <>
                            <img src={user?.profilePicture} alt="" className="navbar-img" style={{cursor: "default"}} />
                            <div className="navbar-username" style={{cursor: "default"}}>{user?.name}</div>
                        </>
                    }
                </div>
                <div className="navbar-right-item nav logout" onClick={logoutHandler}> Logout </div>
            </div> :
        null}
    </div>
  )
}

export default Navbar;
