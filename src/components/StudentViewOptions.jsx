import Markdown from 'markdown-to-jsx';

const StudentViewOptions = ({ index, option, selectedOptions, optionChangeHandler }) => {
    return (
        <div className="options">
            <div className="options-in-a-row">
                <label className="option">
                    <input
                        className='option-radio-button'
                        type="radio"
                        value='a'
                        checked={selectedOptions[index] === 'a'}
                        onChange={(e) => optionChangeHandler(e, index)}
                    />

                    {option[0]?.aImage ? (
                            <img src={option[0]?.aImage} className="option-image"></img>
                    ) : (
                        <Markdown>{option[0]?.aText}</Markdown>
                    )}
                </label>

                <label className="option">
                    <input
                        className='option-radio-button'
                        type="radio"
                        value='b'
                        checked={selectedOptions[index] === 'b'}
                        onChange={(e) => optionChangeHandler(e, index)}
                    />
                    {option[1]?.bImage ? (
                            <img src={option[1]?.bImage} className="option-image"></img>
                    ) : (
                        <Markdown>{option[1]?.bText}</Markdown>
                    )}
                </label>
            </div>

            <div className="options-in-a-row">
                <label className="option">
                    <input
                        className='option-radio-button'
                        type="radio"
                        value='c'
                        checked={selectedOptions[index] === 'c'}
                        onChange={(e) => optionChangeHandler(e, index)}
                    />
                    {option[2]?.cImage ? (
                            <img src={option[2]?.cImage} className="option-image"></img>
                    ) : (
                        <Markdown>{option[2]?.cText}</Markdown>
                    )}
                </label>

                <label className="option">
                    <input
                        className='option-radio-button'
                        type="radio"
                        value='d'
                        checked={selectedOptions[index] === 'd'}
                        onChange={(e) => optionChangeHandler(e, index)}
                    />
                    {option[3]?.dImage ? (
                            <img src={option[3]?.dImage} className="option-image"></img>
                    ) : (
                        <Markdown>{option[3]?.dText}</Markdown>
                    )}
                </label>
            </div>
        </div>
    )
}

export default StudentViewOptions;
