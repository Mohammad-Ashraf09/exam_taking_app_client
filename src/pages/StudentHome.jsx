import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { find } from 'lodash';
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TestPapersTable from '../components/TestPapersTable';

const StudentHome = () => {
    const { user } = useContext(AuthContext);
    const [papers, setPapers] = useState([]);
    const [updatedPapers, setUpdatedPapers] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {    // 2 baar call ho rahi hai api
        const fetchPapersList = async() => {
            try{
                // await axios.get(`${REACT_APP_BASE_URL}/papers`);
                const res = await axios.get("http://localhost:8000/api/papers/list");
                const livedPapers = res?.data?.filter((paper) => paper?.isLive);
                setPapers(livedPapers);
            }catch(err){
                console.log(err);
            }
        }
        fetchPapersList();
    }, []);

    useEffect(() => {    // 2 baar call ho rahi hai api
        const fetchLoggedInUser = async() => {
            try{
                // await axios.get(`${REACT_APP_BASE_URL}/papers`);
                const res = await axios.get(`http://localhost:8000/api/users/${user?._id}/user`);
                setUserData(res?.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchLoggedInUser();
    }, []);

    useEffect(() => {  // finding papers which user attempted and setting a key of date of attempt
        if (papers?.length && userData?._id) {
            papers?.map((paper) => {
                const obj = find(userData?.attemptedPapers, {'paperId': paper?._id});
                if (obj) {
                    const updatedPaper = {...paper, attemptedAt: obj?.attemptedAt};
                    setUpdatedPapers((prev) => [...prev, updatedPaper]);
                } else {
                    setUpdatedPapers((prev) => [...prev, paper]);
                }
            })
        }
    }, [papers?.length, userData?._id]);

    return (
        <>
            <Navbar/>
            <div className="test-papers-list-container">
                <div className="test-papers-list-container-wrapper">
                    <h2 className="test-papers-list-heading"> Test Papers List </h2>
                    <TestPapersTable papers={updatedPapers} />
                </div>
            </div>
        </>
    )
}

export default StudentHome;
