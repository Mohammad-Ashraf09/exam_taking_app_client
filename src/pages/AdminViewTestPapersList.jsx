import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import TestPapersTable from "../components/TestPapersTable";

const AdminViewTestPapersList = () => {
    const [papers, setPapers] = useState([]);

    const deletePaperHandler = async(id) => {
        const isDelete = window.confirm('Are you sure...you want delete this paper');
        if (isDelete) {
            try{
                // await axios.delete(`${REACT_APP_BASE_URL}/papers/${id}`);
                await axios.delete(`http://localhost:8000/api/papers/${id}/delete`);
                setPapers((prev)=> prev.filter((item)=> item?._id !== id))
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {    // 2 baar call ho rahi hai api
            const fetchPapersList = async() => {
                try{
                    // await axios.get(`${REACT_APP_BASE_URL}/papers`);
                    const res = await axios.get("http://localhost:8000/api/papers/list");
                    // console.log('data----', res?.data)
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
                    <TestPapersTable
                        papers={papers}
                        deletePaperHandler={deletePaperHandler}
                        isAdmin={true}
                    />
                    <Link to='/createPaper' className="create-new-btn-container" style={{textDecoration: 'none'}}>
                        <button className='signin-btn create-new-btn'> Create New </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AdminViewTestPapersList;
