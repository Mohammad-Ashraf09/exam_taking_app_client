import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../src/firebase";
import Compressor from 'compressorjs';
// import { REACT_APP_BASE_URL } from '../config/keys';
import { omit } from 'lodash';
import Navbar from "../components/Navbar";

const Signup = () => {
    const defaultDP = "/default-dp.png";
    const loader = "/gif-loader.gif";

    const location = useLocation();
    const navigate = useNavigate();
    const [currentDP, setCurrentDP] = useState(defaultDP);
    const [dpPreview, setDpPreview] = useState(null);
    const [isLoader, setIsLoader] = useState(false);
    const [hideSaveBtn, setHideSaveBtn] = useState(false);
    const [values, setValues] = useState({
        name:"",
        username:"",
        password:"",
        confirmPassword:"",
        profilePicture:"",
    });

    const signupText = location?.pathname.includes('adminSignup') ? 'Admin Signup' : 'Student Signup';

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Full Name",
            errorMsg: "Full Name should be 3-30 characters and shouldn't include any special character!",
            pattern:"^[A-Z a-z]{3,30}$",
            required: true,
        },
        {
            id: 2,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMsg: "Username should be 3-16 characters in small letters, underscore and numbers only!",
            pattern:"^[0-9a-z_]{3,16}$",
            required: true,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMsg: "Password should be 8-20 character and include at least 1 capital letter, 1 number and 1 special character!",
            pattern:"^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$",
            required: true,
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMsg: "Passwords don't match!",
            pattern: values.password,
            required: true,
        },
    ]

    const onChangeHandler = (e)=>{
        setValues({...values, [e.target.name]: e.target.value});
    }

    const dpHandler = (e) =>{
        if(e.target.files[0]){
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setDpPreview(objectUrl);
            setCurrentDP(e.target.files[0]);
        }
    }

    const saveHandler = async(e) =>{
        e.preventDefault();
        setIsLoader(true);
        setHideSaveBtn(true)

        if(typeof(currentDP)==='string'){
            setValues({...values, profilePicture: currentDP});
        }
        else{
            new Compressor(currentDP, {
                quality: 0.4,  // 0.6 can also be used, but its not recommended to go below.
                success: (compressedResult) => {
                    const imgName = compressedResult?.name?.toLowerCase()?.split(' ').join('-');
                    const uniqueImageName = new Date().getTime() + '-' + imgName;
            
                    const storageRef = ref(storage, uniqueImageName);
                    const uploadTask = uploadBytesResumable(storageRef, compressedResult);
            
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                                default:
                                    break;
                            }
                        },
                        (error) => {
                            console.log(error)
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                setValues({...values, profilePicture: downloadURL});
                            });
                        }
                    );
                },
            });
        }
    }

    useEffect(()=>{     // this useEffect is real submit handler
        if(values?.profilePicture){
            let formValue = omit(values, ['confirmPassword'])
            if (location?.pathname.includes('adminSignup')) {
                formValue = { ...formValue, isAdmin: true };
            }
            const saveDetailsToDB = async() => {
                try{
                    await axios.post(`https://exam-taking-app-backend.vercel.app/api/auth/register`, formValue);
                    // await axios.post("http://localhost:8000/api/auth/register", formValue);
                    setIsLoader(false);
                    setHideSaveBtn(false);
                    navigate(location?.pathname.includes('adminSignup') ? "/adminLogin" : "/studentLogin");
                }catch(err){
                    console.log(err);
                }
            }
            saveDetailsToDB();
        }
    },[values?.profilePicture]);

    // console.log(values)


    return (
        <>
        <Navbar/>
        <div className='signup-container'>
            <form className="signup-container-wrapper" onSubmit={saveHandler}>
                <h3 className="signin-text heading"> {signupText} </h3>
                <div className="upload-dp-section">
                    <div className='dp'>
                        {dpPreview ?
                            <img className="profile-picture" src={dpPreview} alt='profile'/>
                            :
                            <img className='profile-picture' src={currentDP} alt="" />
                        }
                    </div>
                    <div className='dp-controls'>
                        <label htmlFor="dp">
                            <div className='gallery-text'>Gallery</div>
                            <input style={{display:"none"}} type="file" id="dp" name="file" accept='.jpg, .png, .jpeg' onChange={dpHandler}/>
                        </label>
                        <div className='gallery-text' onClick={()=>{setCurrentDP(defaultDP); setDpPreview(null)}}>Remove</div>
                    </div>
                </div>

                <div className="input-section">
                    {inputs.map((item)=>(
                        <FormInput
                            key={item.id}
                            name={item.name}
                            type={item.type}
                            placeholder={item.placeholder}
                            errorMsg={item.errorMsg}
                            pattern={item.pattern}
                            required={item.required}
                            values={values[item.name]}
                            onChangeHandler={onChangeHandler}
                        />
                    ))}
                </div>

                {!hideSaveBtn ? <button type='submit' className="register-btn signin-btn">Register</button> : null}
                {isLoader ?
                    <div className="loader-button register-btn signin-btn">
                        <img className='loader' src={loader} alt="" />
                    </div>
                : null}
                {!hideSaveBtn ?
                    <Link
                        to={`${location?.pathname.includes('adminSignup') ? '/adminLogin' : '/studentLogin'}`}
                        className='existing-member'
                    >
                        Already Signup?
                    </Link>
                : null}
            </form>
        </div>
        </>
    )
}

export default Signup;
