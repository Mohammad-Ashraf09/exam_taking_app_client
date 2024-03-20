import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminHome = () => {
    return (
        <>
            <Navbar/>
            <div className="loginOption-container">
                <div className="loginOption-container-wrapper adminHome-container-wrapper">
                    <Link to='/paperList' style={{textDecoration: 'none'}}>
                        <div className="loginOption student"> View Test Papers </div>
                    </Link>
                    <Link to='/studentList' style={{textDecoration: 'none'}}>
                        <div className="loginOption admin"> View Student Lists </div>
                    </Link>
                    <Link to='/createPaper' style={{textDecoration: 'none'}}>
                        <div className="loginOption admin"> Create Paper </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AdminHome;
