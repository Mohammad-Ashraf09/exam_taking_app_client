import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import StudentViewOptions from "../components/StudentViewOptions";

const StudentViewRunningTestPaper = () => {
    const paperId = useParams().id;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [paper, setPaper] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const optionChangeHandler = (event, index) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event==='remove' ? '' : event.target.value;
        setSelectedOptions(newSelectedOptions);
        sessionStorage.setItem('responses', JSON.stringify(newSelectedOptions));
    };

    const submitExamHandler = async(isTimesUp) => {
        const isSubmit = !isTimesUp ? window.confirm('Are you sure, you want to Submit Exam') : true;

        if (isSubmit) {
            sessionStorage.removeItem('responses');
            const data = {
                userId: user?._id,
                paperId,
                attemptedAt: Date.now(),
                responses: selectedOptions,
            }
            try{
                await axios.put(`https://exam-taking-app-backend.vercel.app/api/users/${user?._id}/exam`, data);
                // await axios.put(`http://localhost:8000/api/users/${user?._id}/exam`, data);
                navigate(`/paper/${paperId}/thank-you`);
                sessionStorage.removeItem('timeLeft');
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
                const responses = JSON.parse(sessionStorage.getItem('responses'));
                if (responses?.length) {
                    setSelectedOptions(responses);
                } else {
                    setSelectedOptions(Array(res?.data?.questions?.length).fill(''));
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchPaper();
    }, []);

    return (
        <>
            <Navbar
                isRunningTest={true}
                selectedOptions={selectedOptions}
                submitExamHandler={submitExamHandler}
                timeAllotted={paper?.timeAllotted}
            />
            <div className="test-paper-container">
                <div className="test-paper-container-wrapper">
                    <h2 className="test-papers-list-heading paper-heading"> {paper?.paperTitle} </h2>

                    <div className="test-papers-list-table questions-div">
                        {paper?.questions?.map((q, index)=>(
                            <div key={q?.questionNo} style={{width: '100%'}}>
                                <div className="question-container">
                                    <div className="question-number"> Q.{q?.questionNo}</div>
                                    <div className="question">
                                        {q?.question?.text ? <div className="question-text"><Markdown>{q?.question?.text}</Markdown></div> : null}
                                        {q?.question?.image ? <img src={q?.question?.image} className="question-image"></img> : null}
                                        <StudentViewOptions
                                            index={index}
                                            option={q?.option}
                                            selectedOptions={selectedOptions}
                                            optionChangeHandler={optionChangeHandler}
                                        />
                                    </div>
                                </div>
                                {selectedOptions[index] ? (
                                    <div
                                        className="correct-option-container remove-response"
                                        onClick={()=>optionChangeHandler('remove', index)}
                                    > remove response </div>
                                ) : null}
                                <hr />
                            </div>
                        ))}
                    </div>
                    <div className="create-new-btn-container">
                        <button className='signin-btn create-new-btn' onClick={()=>submitExamHandler(false)}> Submit </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentViewRunningTestPaper;
