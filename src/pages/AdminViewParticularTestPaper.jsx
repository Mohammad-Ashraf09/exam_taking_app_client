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
                await axios.put(`https://exam-taking-app-backend.vercel.app/api/papers/${paperId}/live`, data);
                // await axios.put(`http://localhost:8000/api/papers/${paperId}/live`, data);
                setIsLive(!isLive);
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {     // 2 baar call ho rahi hai api
        const fetchPaper = async() => {
            try{
                const res = await axios.get(`https://exam-taking-app-backend.vercel.app/api/papers/${paperId}/paper`);
                // const res = await axios.get(`http://localhost:8000/api/papers/${paperId}/paper`);
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
                            <div key={q?.questionNo} style={{width: '100%'}}>
                                <div className="question-container">
                                    <div className="question-number"> Q. {q?.questionNo}</div>
                                    <div className="question">
                                        {q?.question?.text ? <div className="question-text"><Markdown>{q?.question?.text}</Markdown></div> : null}
                                        {q?.question?.image ? <img src={q?.question?.image} className="question-image"></img> : null}
                                        <AdminViewOptions option={q?.option}/>
                                    </div>
                                </div>
                                <div className="correct-option-container">
                                    <div >correct option : <span style={{fontWeight: 'bold', color: 'rgb(192, 64, 0)'}}>{q?.correctOption}</span></div>
                                </div>
                                <hr />
                            </div>
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
