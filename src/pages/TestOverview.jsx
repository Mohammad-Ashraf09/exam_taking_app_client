import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const TestOverview = () => {
    const paperId = useParams().id;
    const { user } = useContext(AuthContext);
    const [responses, setResponses] = useState([]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [physics, setPhysics] = useState(null);
    const [chemistry, setChemistry] = useState(null);
    const [botany, setBotany] = useState(null);
    const [zoology, setZoology] = useState(null);
    const [percentage, setPercentage] = useState(null);

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
                setCorrectOptions(res?.data?.questions?.map((item)=>item.correctOption));
            }catch(err){
                console.log(err);
            }
        }
        fetchPaper();
    }, []);

    useEffect(() => {    // for progress bar
        const progress = document.querySelector('.progress');
        let offset = 472;
        let interval = setInterval(() => {
            if (percentage >= 90) {
                if (offset === (107 - percentage)*5) {
                    clearInterval(interval);
                }
            } else if (percentage >= 80) {
                if (offset === (106 - percentage)*5) {
                    clearInterval(interval);
                }
            } else if (percentage >= 70) {
                if (offset === (105 - percentage)*5) {
                    clearInterval(interval);
                }
            } else if (percentage >= 60) {
                if (offset === (104 - percentage)*5) {
                    clearInterval(interval);
                }
            } else if (percentage >= 50) {
                if (offset === (101 - percentage)*5) {
                    clearInterval(interval);
                }
            } else if (percentage >= 40) {
                if (offset === (99 - percentage)*5) {
                    clearInterval(interval);
                }
            } else if (percentage >= 10) {
                if (offset === (97 - percentage)*5) {
                    clearInterval(interval);
                }
            } else if (percentage >= 1) {
                if (offset === (94 - percentage)*5) {
                    clearInterval(interval);
                }
            } else {
                if (offset === 472) {
                    clearInterval(interval);
                }
            }
            progress.style.strokeDashoffset = offset--;
        }, 0);
    }, [percentage]);

    useEffect(() => {    // main logic of all calculations
        if (
            correctOptions?.length &&
            responses?.length &&
            correctOptions?.length === responses?.length
        ) {
            if (correctOptions?.length === 200) {
                // for attempted count
                const phy = {
                    mandatory: responses.slice(0, 35),
                    optional: responses.slice(35, 50),
                };
                const chem = {
                    mandatory: responses.slice(50, 85),
                    optional: responses.slice(85, 100)
                };
                const bot = {
                    mandatory: responses.slice(100, 135),
                    optional: responses.slice(135, 150)
                };
                const zoo = {
                    mandatory: responses.slice(150, 185),
                    optional: responses.slice(185, 200)
                };
    
                let mandatoryCount = 0;
                let optionalCount = 0;
                let totalCount = 0;
    
                phy.mandatory.map((res) => {
                    if (res) mandatoryCount++;
                })
                phy.optional.map((res) => {
                    if (res) optionalCount++;
                })
                totalCount = totalCount + mandatoryCount;
                if (optionalCount > 10) {
                    totalCount = totalCount + 10;
                } else {
                    totalCount = totalCount + optionalCount;
                }
                setPhysics({attempted: totalCount});
                mandatoryCount = 0;
                optionalCount = 0;
                totalCount = 0;
    
                chem.mandatory.map((res) => {
                    if (res) mandatoryCount++;
                })
                chem.optional.map((res) => {
                    if (res) optionalCount++;
                })
                totalCount = totalCount + mandatoryCount;
                if (optionalCount > 10) {
                    totalCount = totalCount + 10;
                } else {
                    totalCount = totalCount + optionalCount;
                }
                setChemistry({attempted: totalCount});
                mandatoryCount = 0;
                optionalCount = 0;
                totalCount = 0;
    
                bot.mandatory.map((res) => {
                    if (res) mandatoryCount++;
                })
                bot.optional.map((res) => {
                    if (res) optionalCount++;
                })
                totalCount = totalCount + mandatoryCount;
                if (optionalCount > 10) {
                    totalCount = totalCount + 10;
                } else {
                    totalCount = totalCount + optionalCount;
                }
                setBotany({attempted: totalCount});
                mandatoryCount = 0;
                optionalCount = 0;
                totalCount = 0;
    
                zoo.mandatory.map((res) => {
                    if (res) mandatoryCount++;
                })
                zoo.optional.map((res) => {
                    if (res) optionalCount++;
                })
                totalCount = totalCount + mandatoryCount;
                if (optionalCount > 10) {
                    totalCount = totalCount + 10;
                } else {
                    totalCount = totalCount + optionalCount;
                }
                setZoology({attempted: totalCount});
                mandatoryCount = 0;
                optionalCount = 0;
                totalCount = 0;
    
                // for correct count
                const phyCorr = {
                    mandatory: correctOptions.slice(0, 35),
                    optional: correctOptions.slice(35, 50),
                };
                const chemCorr = {
                    mandatory: correctOptions.slice(50, 85),
                    optional: correctOptions.slice(85, 100)
                };
                const botCorr = {
                    mandatory: correctOptions.slice(100, 135),
                    optional: correctOptions.slice(135, 150)
                };
                const zooCorr = {
                    mandatory: correctOptions.slice(150, 185),
                    optional: correctOptions.slice(185, 200)
                };
    
                let attempted = 0;
                phy.mandatory.map((res, i) => {
                    if (res === phyCorr.mandatory[i]) mandatoryCount++;
                })
                phy.optional.map((res, i) => {
                    if (res) {
                        attempted++; 
                        if (attempted <= 10 && res === phyCorr.optional[i]) {
                            optionalCount++;
                        }
                    }
                })
                const a = mandatoryCount + optionalCount;
                setPhysics((prev) => ({...prev, correct: a}));
                mandatoryCount = 0;
                optionalCount = 0;
                attempted = 0;
    
                chem.mandatory.map((res, i) => {
                    if (res === chemCorr.mandatory[i]) mandatoryCount++;
                })
                chem.optional.map((res, i) => {
                    if (res) {
                        attempted++; 
                        if (attempted <= 10 && res === chemCorr.optional[i]) {
                            optionalCount++;
                        }
                    }
                })
                const b = mandatoryCount + optionalCount;
                setChemistry((prev) => ({...prev, correct: b}));
                mandatoryCount = 0;
                optionalCount = 0;
                attempted = 0;
    
                bot.mandatory.map((res, i) => {
                    if (res === botCorr.mandatory[i]) mandatoryCount++;
                })
                bot.optional.map((res, i) => {
                    if (res) {
                        attempted++; 
                        if (attempted <= 10 && res === botCorr.optional[i]) {
                            optionalCount++;
                        }
                    }
                })
                const c = mandatoryCount + optionalCount;
                setBotany((prev) => ({...prev, correct: c}));
                mandatoryCount = 0;
                optionalCount = 0;
                attempted = 0
    
                zoo.mandatory.map((res, i) => {
                    if (res === zooCorr.mandatory[i]) mandatoryCount++;
                })
                
                zoo.optional.map((res, i) => {
                    if (res) {
                        attempted++; 
                        if (attempted <= 10 && res === zooCorr.optional[i]) {
                            optionalCount++;
                        }
                    }
                })
                const d = mandatoryCount + optionalCount;
                setZoology((prev) => ({...prev, correct: d}));
                mandatoryCount = 0;
                optionalCount = 0;
                attempted = 0
            } else {
                // for attempted count
                const phy = responses.slice(0, (responses?.length / 4)*1)
                const chem = responses.slice((responses?.length / 4)*1, (responses?.length / 4)*2)
                const bot = responses.slice((responses?.length / 4)*2, (responses?.length / 4)*3)
                const zoo = responses.slice((responses?.length / 4)*3, responses?.length)
    
                let attempted = 0;
    
                phy.map((res) => {
                    if (res) attempted++;
                })
                setPhysics({attempted: attempted});
                attempted = 0;

                chem.map((res) => {
                    if (res) attempted++;
                })
                setChemistry({attempted: attempted});
                attempted = 0;

                bot.map((res) => {
                    if (res) attempted++;
                })
                setBotany({attempted: attempted});
                attempted = 0;

                zoo.map((res) => {
                    if (res) attempted++;
                })
                setZoology({attempted: attempted});
                attempted = 0;

                // for correct count
                const phyCorr = correctOptions.slice(0, (responses?.length / 4)*1)
                const chemCorr = correctOptions.slice((responses?.length / 4)*1, (responses?.length / 4)*2)
                const botCorr = correctOptions.slice((responses?.length / 4)*2, (responses?.length / 4)*3)
                const zooCorr = correctOptions.slice((responses?.length / 4)*3, responses?.length)
    
                let phyCorrect = 0;
                phy.map((res, i) => {
                    if (res === phyCorr[i]) phyCorrect++;
                })
                setPhysics((prev) => ({...prev, correct: phyCorrect}));

                let chemCorrect = 0;
                chem.map((res, i) => {
                    if (res === chemCorr[i]) chemCorrect++;
                })
                setChemistry((prev) => ({...prev, correct: chemCorrect}));

                let botCorrect = 0;
                bot.map((res, i) => {
                    if (res === botCorr[i]) botCorrect++;
                })
                setBotany((prev) => ({...prev, correct: botCorrect}));

                let zooCorrect = 0;
                zoo.map((res, i) => {
                    if (res === zooCorr[i]) zooCorrect++;
                })
                setZoology((prev) => ({...prev, correct: zooCorrect}));
            }
        }
    }, [correctOptions, responses]);

    useEffect(() => {     // for setting percentage
        if (physics && chemistry && botany && zoology) {
            const marks =
            ((physics?.correct + chemistry?.correct + botany?.correct + zoology?.correct) * 4) -
            (
                (physics?.attempted + chemistry?.attempted + botany?.attempted + zoology?.attempted ) -
                (physics?.correct + chemistry?.correct + botany?.correct + zoology?.correct)
            )
            setPercentage(Math.round(
                (marks / (
                    correctOptions?.length === 200 ? 180 * 4 : correctOptions?.length * 4     // this completely change to 720 hardcoded later
                )) * 100
            ));
        }
    }, [physics, chemistry, botany, zoology])

    const innerWidth = window.innerWidth<=430

    return (
        <>
            <Navbar/>
            <div className="test-paper-container">
                <div className="test-paper-container-wrapper">
                    <h2 className="test-papers-list-heading paper-heading"> Exam Overview </h2>

                    <div className="test-papers-list-table questions-div">
                        <div className="progress-bar">
                            <div className="outer-circle">
                                <div className="inner-circle"> {percentage}% </div>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                width={innerWidth ? '140px' : '160px'}
                                height={innerWidth ? '140px' : '160px'}
                            >
                                <defs>
                                    <linearGradient id="GradientColor">
                                        <stop offset="0%" stop-color="#0d47a1" />
                                        <stop offset="100%" stop-color="rgb(192, 64, 0)" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    className="progress"
                                    cx={innerWidth ? '70' : '80'}
                                    cy={innerWidth ? '70' : '80'}
                                    r={innerWidth ? '60' : '70'}
                                    stroke-linecap="round"
                                />
                            </svg>
                        </div>
                        <div className="marks-overview">
                            <div className="marks">
                                <div className="label">Attempts</div>
                                <div className="number">
                                    {physics?.attempted + chemistry?.attempted + botany?.attempted + zoology?.attempted}
                                    /
                                    {/* this completely change to 180 hardcoded later */}
                                    {correctOptions?.length === 200 ? 180 : correctOptions?.length}
                                </div>
                            </div>
                            <div className="marks">
                                <div className="label">Marks</div>
                                <div className="number">
                                    {
                                        ((physics?.correct + chemistry?.correct + botany?.correct + zoology?.correct) * 4) -
                                        (
                                            (physics?.attempted + chemistry?.attempted + botany?.attempted + zoology?.attempted ) -
                                            (physics?.correct + chemistry?.correct + botany?.correct + zoology?.correct)
                                        )
                                    } /
                                    {/* this completely change to 720 hardcoded later */}
                                    {correctOptions?.length === 200 ? 180 * 4 : correctOptions?.length * 4}
                                </div>
                            </div>
                            <div className="marks">
                                <div className="label">Correct</div>
                                <div className="number">
                                    {physics?.correct + chemistry?.correct + botany?.correct + zoology?.correct}
                                </div>
                            </div>
                            <div className="marks">
                                <div className="label">Wrong</div>
                                <div className="number">
                                    {
                                        (physics?.attempted + chemistry?.attempted + botany?.attempted + zoology?.attempted) -
                                        (physics?.correct + chemistry?.correct + botany?.correct + zoology?.correct)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="marks-overview">
                            <div className="marks subj-wise-marks">
                                <div className="label">Physics</div>
                                <div className="number">{physics?.correct}/{physics?.attempted}</div>
                            </div>
                            <div className="marks subj-wise-marks">
                                <div className="label">Chemistry</div>
                                <div className="number">{chemistry?.correct}/{chemistry?.attempted}</div>
                            </div>
                            <div className="marks subj-wise-marks">
                                <div className="label">Botany</div>
                                <div className="number">{botany?.correct}/{botany?.attempted}</div>
                            </div>
                            <div className="marks subj-wise-marks">
                                <div className="label">Zoology</div>
                                <div className="number">{zoology?.correct}/{zoology?.attempted}</div>
                            </div>
                        </div>
                    </div>
                    <Link to={`/paper/${paperId}/overview/responses`} style={{textDecoration: 'none'}}>
                        <div className="create-new-btn-container">
                            <button className='signin-btn create-new-btn'> View Paper </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default TestOverview;
