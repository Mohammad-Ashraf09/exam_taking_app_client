import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import Timer from "./Timer";
// import { REACT_APP_BASE_URL } from '../config/keys';


const Navbar = ({ isRunningTest, selectedOptions, submitExamHandler }) => {
    const { user } = useContext(AuthContext);
    const [attemptedQuestion, setAttemptedQuestion] = useState(0);

    const logoutHandler = () =>{
        const logout = window.confirm("Are you sure, you want to logout?");
        if(logout){
            localStorage.clear();
            window.location.href='/'
        }
    }

    useEffect(() => {
        let count = 0;
        selectedOptions?.map((item)=>{
            if (item) count++;
        });
        setAttemptedQuestion(count);
    }, [selectedOptions]);

  return (
    <div className='navbar-container'>
        <div className="navbar-left">
            <img src='/logo-48.png' alt="" className="logo-img"/>
            {/* <div className="logo-text">Dr<span style={{color: '#C04000'}}>Fiza</span></div> */}
            <div className="logo-text">Hell<span style={{color: 'black'}}>o...</span></div>
        </div>

        {user ?
            <div className="navbar-right">
                {user?.isAdmin ? (
                    <div className="navbar-right-item">
                        <NavLink to='/' className={({isActive}) => `${isActive ? 'active' : 'inactive'}`}>
                            <div className="nav"> Dashboard </div>
                        </NavLink>
                    </div>
                ) : null}

                {(!user?.isAdmin && isRunningTest) ? (
                    <>
                        <div className="navbar-right-item">
                            <div className="nav timer">
                                <Timer submitExamHandler={submitExamHandler}/>
                            </div>
                        </div>

                        <div className="navbar-right-item">
                            <div className="nav attempt">
                                Attempts:&nbsp;
                                <span className="timer">{attemptedQuestion}</span>
                            </div>
                        </div>
                    </>
                ) : null }

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
