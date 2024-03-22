import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import TestPaperList from "../components/TestPaperList";

const AdminViewTestPapersList = () => {
    const [papers, setPapers] = useState([]);

    const handleDetelePaper = async(id) => {
        const isDelete = window.confirm('Are you sure...you want delete this paper');
        if (isDelete) {
            try{
                // await axios.delete(`${REACT_APP_BASE_URL}/papers/${id}`);
                await axios.delete(`http://localhost:8000/api/papers/${id}`);
                setPapers((prev)=> prev.filter((item)=> item?._id !== id))
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {
            const fetchPapersList = async() => {
                try{
                    // await axios.get(`${REACT_APP_BASE_URL}/papers`);
                    const res = await axios.get("http://localhost:8000/api/papers");
                    console.log('data----', res?.data)
                    setPapers(res?.data)
                }catch(err){
                    console.log(err);
                }
            }
            fetchPapersList();
    }, []);

    return (
        <>
            <Navbar/>
            <div className="test-papers-list-container">
                <div className="test-papers-list-container-wrapper">
                    <h2 className="test-papers-list-heading"> Test Papers List </h2>

                    <div className="test-papers-list-table">
                        <div className="test-papers-list-sub-heading">
                            <p className="sub-heading sub-heading-test-name"> Test Name</p>
                            <p className="sub-heading sub-heading-create-date"> Crete Date </p>
                            <p className="sub-heading sub-heading-live-date"> Live Date </p>
                            <p className="sub-heading sub-heading-active"> Active </p>
                            <p className="sub-heading sub-heading-delete"></p>
                        </div>

                        <div className="test-papers-list">
                            {papers?.map((paper)=>(
                                <TestPaperList key={paper?.id} paper={paper} handleDetelePaper={handleDetelePaper}/>
                            ))}
                        </div>

                    </div>

                    <Link to='/createPaper' className="create-new-btn-container" style={{textDecoration: 'none'}}>
                        <button className='signin-btn create-new-btn'> Create New </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AdminViewTestPapersList;
