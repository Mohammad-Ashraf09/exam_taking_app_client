import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import CorrectedOptionsWithResponse from "../components/CorrectedOptionsWithResponse";

const StudentViewDoneTestPaper = () => {
    const paperId = useParams().id;
    const { user } = useContext(AuthContext);
    const [paperTitle, setPaperTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [updatedQuestions, setUpdatedQuestions] = useState([]);
    const [responses, setResponses] = useState([]);

    useEffect(() => {    // 2 baar call ho rahi hai api
        const fetchLoggedInUser = async() => {
            try{
                const res = await axios.get(`https://exam-taking-app-backend.vercel.app/api/users/${user?._id}/user`);
                // const res = await axios.get(`http://localhost:8000/api/users/${user?._id}/user`);
                setResponses(res?.data?.attemptedPapers?.filter((item)=>item.paperId === paperId)?.[0]?.responses);
            }catch(err){
                console.log(err);
            }
        }
        fetchLoggedInUser();
    }, []);
    
    useEffect(() => {     // 2 baar call ho rahi hai api
        const fetchPaper = async() => {
            try{
                const res = await axios.get(`https://exam-taking-app-backend.vercel.app/api/papers/${paperId}/paper`);
                // const res = await axios.get(`http://localhost:8000/api/papers/${paperId}/paper`);
                setPaperTitle(res?.data?.paperTitle);
                setQuestions(res?.data?.questions);
            }catch(err){
                console.log(err);
            }
        }
        fetchPaper();
    }, []);

    useEffect(() => {
        if (questions?.length) {
            const data = questions?.map((ques, i) => {
                return {
                    ...ques,
                    response: responses[i]
                }
            })
            setUpdatedQuestions(data);
        }
    }, [questions?.length]);

    return (
        <>
            <Navbar/>
            <div className="test-paper-container">
                <div className="test-paper-container-wrapper">
                    <h2 className="test-papers-list-heading paper-heading"> {paperTitle} </h2>

                    <div className="test-papers-list-table questions-div">
                        {updatedQuestions?.map((q)=>(
                            <div key={q?.questionNo} style={{width: '100%'}}>
                                <div className="question-container">
                                    <div className="question-number"> Q.{q?.questionNo}</div>
                                    <div className="question">
                                        <div className="question-text"><Markdown>{q?.question?.text}</Markdown></div>
                                        {q?.question?.image ? <img src={q?.question?.image} className="question-image"></img> : null}
                                        <CorrectedOptionsWithResponse
                                            option={q?.option}
                                            response={q?.response}
                                            correctOption={q?.correctOption}
                                        />
                                    </div>
                                </div>
                                <div className="correct-option-container">
                                    <div >correct option : <span style={{fontWeight: 'bold', color: 'rgb(192, 64, 0)'}}>{q?.correctOption}</span></div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentViewDoneTestPaper;

