import Option from "./Option";

const CreateQuestion = ({ qNumber, formData, setFormData, setImages, editHandler }) => {
    const onChangeHandler = (e, type) => {
        if (type === 'correctOption') {
            setFormData({...formData, questionNo: qNumber, correctOption: e.target.value});
        } else {
            setFormData({...formData, questionNo: qNumber, subTitle: e.target.value});
        }
    }

    const onCheckboxClick = (e) => {
        setFormData({...formData, isChecked: e.target.checked});
    }

    return (
        <div className="create-question-container">
            <div className="create-question-left">Q.{qNumber}</div>
            <div className="create-question-middle">
                {/* question input */}
                <div className="question-input">
                    <Option
                        name="question"
                        id={`question${qNumber}`}
                        minHeight="100px"
                        formData={formData}
                        setFormData={setFormData}
                        setImages={setImages}
                    />
                </div>

                {/* options input */}
                <div className="options-input">
                    {['A','B','C','D'].map((item) =>
                        <div key={item} className="option-input">
                            <Option
                                name="option"
                                id={item+qNumber}
                                option={item}
                                minHeight="40px"
                                formData={formData}
                                setFormData={setFormData}
                                setImages={setImages}
                            />
                        </div>
                    )}
                </div>

                <div className="correct-option-and-checkbox">
                    {/* correct option input */}
                    <input
                        type="text"
                        className="header-input correct-option"
                        name='correctOption'
                        placeholder='Correct Option (a,b,c,d)'
                        pattern="^[a-d]{1,1}$"
                        required
                        onChange={(e)=>onChangeHandler(e, 'correctOption')}
                    />
                    {/* sub-title input */}
                    <input
                        type="text"
                        className="header-input correct-option"
                        name='subTitle'
                        placeholder='Sub-title'
                        required
                        onBlur={(e)=>onChangeHandler(e, 'subTitle')}
                    />
                    {/* checkbox */}
                    <div className="checkbox question-checkbox">
                        <input
                            className="checkbox-input question-checkbox-input"
                            type="checkbox"
                            onChange={onCheckboxClick}
                        />
                        <label className="checkbox-label"> I've completed this question </label>
                    </div>
                </div>
            </div>
            <div className="create-question-right">
                <i className="fa-solid fa-pen-to-square" onClick={()=>editHandler(qNumber)}></i>
            </div>
        </div>
    )
}

export default CreateQuestion;
