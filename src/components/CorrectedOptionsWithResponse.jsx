import Markdown from 'markdown-to-jsx';

const CorrectedOptionsWithResponse = ({ option, response, correctOption }) => {
    return (
        <div className="options">
            <div className="options-in-a-row">
                <label className="option">
                    <input
                        className='option-radio-button'
                        type="radio"
                        value='a'
                        checked={response === 'a'}
                    />

                    {option[0]?.aImage ? (
                            <img
                                src={option[0]?.aImage}
                                className={`option-image ${(response==='a' && response!==correctOption) ? 'wrong-ans-image' : ''}`}
                            ></img>
                    ) : (
                        <Markdown className={(response==='a' && response!==correctOption) ? 'wrong-ans' : ''}>
                            {option[0]?.aText}
                        </Markdown>
                    )}
                </label>

                <label className="option">
                    <input
                        className='option-radio-button'
                        type="radio"
                        value='b'
                        checked={response === 'b'}
                    />
                    {option[1]?.bImage ? (
                            <img
                                src={option[1]?.bImage}
                                className={`option-image ${(response==='b' && response!==correctOption) ? 'wrong-ans-image' : ''}`}
                            ></img>
                    ) : (
                        <Markdown className={(response==='b' && response!==correctOption) ? 'wrong-ans' : ''}>
                            {option[1]?.bText}
                        </Markdown>
                    )}
                </label>
            </div>

            <div className="options-in-a-row">
                <label className="option">
                    <input
                        className='option-radio-button'
                        type="radio"
                        value='c'
                        checked={response === 'c'}
                    />
                    {option[2]?.cImage ? (
                            <img
                                src={option[2]?.cImage}
                                className={`option-image ${(response==='c' && response!==correctOption) ? 'wrong-ans-image' : ''}`}
                            ></img>
                    ) : (
                        <Markdown className={(response==='c' && response!==correctOption) ? 'wrong-ans' : ''}>
                            {option[2]?.cText}
                        </Markdown>
                    )}
                </label>

                <label className="option">
                    <input
                        className='option-radio-button'
                        type="radio"
                        value='d'
                        checked={response === 'd'}
                    />
                    {option[3]?.dImage ? (
                            <img
                                src={option[3]?.dImage}
                                className={`option-image ${(response==='d' && response!==correctOption) ? 'wrong-ans-image' : ''}`}
                            ></img>
                    ) : (
                        <Markdown className={(response==='d' && response!==correctOption) ? 'wrong-ans' : ''}>
                            {option[3]?.dText}
                        </Markdown>
                    )}
                </label>
            </div>
        </div>
    )
}

export default CorrectedOptionsWithResponse;
