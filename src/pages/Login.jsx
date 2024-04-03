import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState} from 'react'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import {loginCall} from "../loginCall"
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
// import { REACT_APP_BASE_URL } from '../config/keys';


const Login = ()=> {
    const location = useLocation();
    const [allUsers, setAllUsers] = useState([]);
    const [invalidCredential, setInvalidCredential] = useState(false);
    const username = useRef();
    const password = useRef();
    const { dispatch } = useContext(AuthContext);
    
    const submitHandler = async(e) => {
        e.preventDefault();
        setInvalidCredential(false);
        const item = Object.values(allUsers)?.filter((item)=> item.username === username?.current?.value);

        if(item.length > 0) {
            const validPassword = await bcrypt.compare(password.current.value, item[0].password);
            if(validPassword) {
                loginCall({username: username.current.value, password: password.current.value}, dispatch);
            }
            else {
                setInvalidCredential(true);
            }
        }
        else {
            setInvalidCredential(true);
        }
    }

    useEffect(()=>{
        const fetchAllUsers = async() => {
            const res = await axios.get("https://exam-taking-app-backend.vercel.app/api/users");
            // const res = await axios.get("http://localhost:8000/api/users");
            const users = res?.data?.filter((user) => {
                if (location?.pathname.includes('adminLogin')) {
                    return user?.isAdmin === true;
                } else {
                    return user?.isAdmin === false;
                }
            });
            setAllUsers(users);
        }
        fetchAllUsers();
    }, []);
    // console.log('users---------',allUsers)

    const loginText = location?.pathname.includes('adminLogin') ? 'Admin Login' : 'Student Login';

    return (
        <>
            <Navbar/>
            <div className="login-container">
                <form className="login-container-wrapper" onSubmit={submitHandler}>
                    <h3 className="signin-text"> {loginText} </h3>
                    <div className="input-section">
                        <input
                            type="text"
                            className="username"
                            name='username'
                            placeholder='Username'
                            ref={username}
                            required
                        />
                        <input
                            type="password"
                            className="password"
                            name='password'
                            placeholder='Password'
                            ref={password}
                            required
                            minLength='6'
                        />
                    </div>
                    {invalidCredential && <div className="invalid-credential">Invalid Credentials!</div>}

                    <div className="form-group">
                        <div className="checkbox">
                        <input className="checkbox-input" type="checkbox"/>
                        <label className="checkbox-label"> Remember Me </label>
                        </div>
                        <div className="forgot-pass"> Forgot Password? </div>
                    </div>
                
                    <button className='signin-btn'>Login</button>
                    <Link
                        to={`${location?.pathname.includes('adminLogin') ? '/adminSignup' : '/studentSignup'}`}
                        style={{textDecoration: 'none'}}
                    >
                        <p className='signup-text'>don't have account?</p>
                    </Link>
                </form>
            </div>
        </>
    )
}

export default Login;
