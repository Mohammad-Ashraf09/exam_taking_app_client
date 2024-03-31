import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const ThankYou = () => {
    return (
        <>
            <Navbar/>
            <div className="test-paper-container">
                <div className="test-paper-container-wrapper thank-you-container-wrapper">
                    <div className="test-papers-list-table thank-you">
                        <p className="thank-you-text">Thank You For Giving This Exam</p>
                        <Link to='/' style={{textDecoration: 'none'}}>
                            <button className='signin-btn create-new-btn'> Home </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThankYou;
