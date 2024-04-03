import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const Instruction = () => {
    const paperId = useParams().id;
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <Navbar/>
            <div className="test-papers-list-container">
                <div className="test-papers-list-container-wrapper instruction-wrapper">
                    <h2 className="test-papers-list-heading paper-heading"> Instructions </h2>
                    <div className="test-papers-list-table instruction">
                        <div className="instruction-top">
                            <h4 className="imp-instruction">Important Instructions :</h4>
                            <ul className="instruction-container">
                                <li className="instruction-list">
                                    The test is of <strong>2 hours 45 minutes</strong> duration and the Test contains <strong>200</strong> multiple choice questions (four options with a single correct answer) from <strong>Physics, Chemistry and Biology (Botany and Zoology).</strong>
                                </li>
                                <li className="instruction-list">
                                    <strong>50</strong> questions in each subject are divided into <strong>two sections (A and B)</strong> as per details given below:
                                    <ul>
                                        <li className="instruction-list-child">
                                            <strong>Section A</strong> shall consist of <strong>35 (Thirty-five)</strong> Questions in each subject (Question Nos. – 1 to 35, 51 to 85, 101 to 135 and 151 to 185). All Questions are compulsory.
                                        </li>
                                        <li className="instruction-list-child">
                                            <strong>Section B</strong> shall consist of <strong>15 (Fifteen)</strong> questions in each subject (Question Nos. – 36 to 50, 86 to 100, 136 to 150 and 186 to 200). In section B, a candidate needs to <strong>attempt any 10 (Ten)</strong> questions out of <strong>15 (Fifteen)</strong> in each subject.
                                        </li>
                                    </ul>
                                </li>
                                <li className="instruction-list">
                                    <strong>Candidates are advised to read all 15 questions in each subject of Section-B</strong> before they start attempting the question paper. In the event of a candidate attempting more than ten questions, the <strong>first ten questions answered by the candidate shall be evaluated.</strong>
                                </li>
                                <li className="instruction-list">
                                    Each question carries <strong>4 marks</strong>. For each correct response, the candidate will get <strong>4 marks</strong>. For each incorrect response, <strong>1 mark</strong> will be deducted from the total scores. The maximum marks are <strong>720</strong>.
                                </li>
                                <li className="instruction-list"> All the best&#128522;</li>
                            </ul>
                        </div>
                        <div className="checkbox question-checkbox instruction-checkbox">
                            <input
                                className="checkbox-input question-checkbox-input"
                                type="checkbox"
                                onChange={(e)=>setIsChecked(e.target.checked)}
                            />
                            <label className="checkbox-label"> I've read all the above points regarding this exam </label>
                        </div>
                    </div>
                    {isChecked ? (
                        <Link to={`/paper/${paperId}/running-exam`} className="create-new-btn-container" style={{textDecoration: 'none'}}>
                            <button className='signin-btn create-new-btn'> Start Exam </button>
                        </Link>
                    ) : (
                        <div className="create-new-btn-container">
                            <div className="submit disable-btn"> Start Exam </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Instruction;
