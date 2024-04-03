import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Compressor from 'compressorjs';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../src/firebase";
import { find } from 'lodash';
import CreateQuestion from "../components/CreateQuestion";
import Navbar from "../components/Navbar";

const CreatePaper = () => {
    const navigate = useNavigate();
    const scrollRef = useRef();
    const [paperTitle, setPaperTitle] = useState('');
    const [timeAllotted, setTimeAllotted] = useState(0);
    const [noOfQuestions, setNoOfQuestion] = useState(1);
    const [count, setCount] = useState(1);
    const [formArray, setFormArray] = useState([]);
    const [formData, setFormData] = useState(null);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [allImagesUploaded, setAllImagesUploaded] = useState(false);
    const [dontHaveImages, setDontHaveImages] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [hideSaveBtn, setHideSaveBtn] = useState(false);

    const loader = "/gif-loader.gif";

    const uploadToFirebase = async(name, img) => {
        new Compressor(img, {
            quality: 0.6,  // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {
                const imgName = compressedResult?.name?.toLowerCase()?.split(' ').join('-');
                const uniqueImageName = new Date().getTime() + '-' + imgName;
        
                const storageRef = ref(storage, uniqueImageName);
                const uploadTask = uploadBytesResumable(storageRef, compressedResult);
        
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        console.log(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImageUrls((prev)=>[...prev, {[name]: downloadURL}]);
                        });
                    }
                );
            },
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const isSubmit = window.confirm("Are you sure, you want to submit?");

        if (isSubmit) {
            setIsLoader(true);
            setHideSaveBtn(true);
    
            if (images?.length) {
                images?.map((item) => {
                    uploadToFirebase(Object.keys(item), item[Object.keys(item)]);
                });
            } else {
                setDontHaveImages(true);
            }
        }
    }

    const addMoreQuestionHandler = () => {
        if (images?.length) {
            setFormData({...formData, isChecked: false});
            images?.map((item) => {
                uploadToFirebase(Object.keys(item), item[Object.keys(item)]);
            });
        } else {
            setDontHaveImages(true);
        }
    }

    const editHandler = (qNumber) => {
        console.log('editHandler------',qNumber)
    }

    useEffect(() => {   // this useEffect to ensure that all the images uploaded for a question and set a key for confirmation
        if (imageUrls?.length === images?.length && images?.length) {
            console.log('all images uploaded..............................')
            setAllImagesUploaded(true);
        }
    }, [imageUrls?.length])

    useEffect(() => {   // this useEffect is adding 1 question form data to final form array
        if (allImagesUploaded || dontHaveImages) {
            const formObj = {
                questionNo: formData?.questionNo,
                question: {
                    text: formData?.question,
                    image: find(imageUrls, 'questionImage') ? find(imageUrls, 'questionImage')['questionImage'] : '',
                },
                option: [
                    {aText: formData?.a ? formData?.a : '', aImage: find(imageUrls, 'AImage') ? find(imageUrls, 'AImage')['AImage'] : ''},
                    {bText: formData?.b ? formData?.b : '', bImage: find(imageUrls, 'BImage') ? find(imageUrls, 'BImage')['BImage'] : ''},
                    {cText: formData?.c ? formData?.c : '', cImage: find(imageUrls, 'CImage') ? find(imageUrls, 'CImage')['CImage'] : ''},
                    {dText: formData?.d ? formData?.d : '', dImage: find(imageUrls, 'DImage') ? find(imageUrls, 'DImage')['DImage'] : ''},
                ],
                correctOption: formData?.correctOption,
            }

            setFormArray((prev)=>[...prev, formObj]);
            if (count < noOfQuestions) {
                setCount(count+1);
            }
            setFormData(null);
            setAllImagesUploaded(false);
            setImages([]);
            setImageUrls([]);
            setDontHaveImages(false);
        }
    }, [allImagesUploaded, dontHaveImages]);

    useEffect(() => {  // this useEffect is for final submission
        if (formArray?.length === noOfQuestions) {
            const finalData = {paperTitle, totalQuestion: noOfQuestions, timeAllotted, questions: formArray};
            const savePaperToDB = async() => {
                try{
                    console.log('on submit-------',finalData)
                    await axios.post(`https://exam-taking-app-backend.vercel.app/api/papers/create`, finalData);
                    // await axios.post("http://localhost:8000/api/papers/create", finalData);
                    navigate("/");
                }catch(err){
                    console.log(err);
                }
            }
            savePaperToDB();
        }
    }, [formArray?.length]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [formArray?.length]);

    return (
        <>
            <Navbar/>
            <form className="createPaper-container" onSubmit={submitHandler}>
                <div className="createPaper-container-wrapper">
                    <div className="createPaper-title-ques-number">
                        <div className="createPaper-title-ques-number-wrapper">
                            <div className="paper-title-div">
                                <input
                                    type="text"
                                    className="header-input paper-title"
                                    name='paperTitle'
                                    placeholder='Title'
                                    required
                                    onBlur={(e)=>setPaperTitle(e.target.value)}
                                />
                            </div>
                            <div className="timer-noOfQues-div">
                                <input
                                    type="number"
                                    className="header-input no-of-question time-allotted"
                                    name='timeAllotted'
                                    placeholder='Time (in sec.)'
                                    // defaultValue={noOfQuestions}
                                    required
                                    onBlur={(e)=>setTimeAllotted(parseInt(e.target.value))}
                                />
                                <input
                                    type="number"
                                    className="header-input no-of-question"
                                    name='noOfQuestion'
                                    placeholder='No of Ques.'
                                    // value={noOfQuestions}      // it only work and can be editable input field when we take onChange
                                    defaultValue={noOfQuestions}  // it works even with onBlur
                                    required
                                    onBlur={(e)=>setNoOfQuestion(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="create-paper">
                        {[...Array(count)].map((page,i) =>
                            <div key={i} ref={scrollRef}>
                                <CreateQuestion
                                    qNumber={i+1}
                                    formData={formData}
                                    setFormData={setFormData}
                                    setImages={setImages}
                                    editHandler={editHandler}
                                />
                            </div>
                        )}
                    </div>
                    {noOfQuestions > count ? (
                        formData?.isChecked ? (
                            <div className="submit" onClick={addMoreQuestionHandler}> Add More </div>
                        ) : (
                            <div className="submit disable-btn"> Add More </div>
                        )
                    ) : (
                        <>
                            {!hideSaveBtn ? <button className="submit"> Submit </button> : null}
                            {isLoader ?
                                <div className="loader-button register-btn signin-btn">
                                    <img className='loader' src={loader} alt="" />
                                </div>
                            : null}
                        </>
                    )}
                </div>
            </form>
        </>
    )
}

export default CreatePaper;
