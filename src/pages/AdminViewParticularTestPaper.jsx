import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Markdown from 'markdown-to-jsx';
import AdminViewOptions from "../components/AdminViewOptions";

const AdminViewParticularTestPaper = () => {
    const paperId = useParams().id;
    const [paper, setPaper] = useState(null);
    const [isLive, setIsLive] = useState(false);

    const liveHidePaperHandler = async() => {
        const isUpdate = window.confirm(`Are you sure, you want to ${isLive ? 'Hide' : 'Live'} this paper`);
        if (isUpdate) {
            const data = {
                paperId,
                isLive: !isLive,
                liveAt: Date.now(),
            }
            try{
                // await axios.put(`${REACT_APP_BASE_URL}/papers/${paperId}`);
                await axios.put(`http://localhost:8000/api/papers/${paperId}/live`, data);
                setIsLive(!isLive);
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {     // 2 baar call ho rahi hai api
        const fetchPaper = async() => {
            try{
                // await axios.get(`${REACT_APP_BASE_URL}/papers/${paperId}`);
                const res = await axios.get(`http://localhost:8000/api/papers/${paperId}/paper`);
                setPaper(res?.data);
                setIsLive(res?.data?.isLive);
            }catch(err){
                console.log(err);
            }
        }
        fetchPaper();
    }, []);

    return (
        <>
            <Navbar/>
            <div className="test-paper-container">
                <div className="test-paper-container-wrapper">
                    <h2 className="test-papers-list-heading paper-heading"> {paper?.paperTitle} </h2>

                    <div className="test-papers-list-table questions-div">
                        {paper?.questions?.map((q)=>(
                            <>
                                <div className="question-container">
                                    <div className="question-number"> Q. {q?.questionNo}</div>
                                    <div className="question">
                                        <div className="question-text"><Markdown>{q?.question?.text}</Markdown></div>
                                        {q?.question?.image ? <img src={q?.question?.image} className="question-image"></img> : null}
                                        <AdminViewOptions q={q}/>
                                    </div>
                                </div>
                                <div className="correct-option-container">
                                    <div >correct option : <span style={{fontWeight: 'bold', color: 'rgb(192, 64, 0)'}}>{q?.correctOption}</span></div>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                    <div className="create-new-btn-container">
                        <button className='signin-btn create-new-btn' onClick={liveHidePaperHandler}>
                            {isLive ? 'Hide this paper' : 'Live this paper'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminViewParticularTestPaper;
