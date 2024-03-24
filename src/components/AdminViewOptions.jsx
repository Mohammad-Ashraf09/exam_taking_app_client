import Markdown from 'markdown-to-jsx';

const AdminViewOptions = ({ q }) => {
    return (
        <div className="options">
            <div className="options-in-a-row">
                {q?.option[0]?.aImage ? (
                    <span className="option option-image-container"> A.
                        <img src={q?.option[0]?.aImage} className="option-image"></img>
                    </span>
                ) : (
                    <div className="option"> A. <Markdown>{q?.option[0]?.aText}</Markdown></div>
                )}

                {q?.option[1]?.bImage ? (
                    <span className="option option-image-container"> B.
                        <img src={q?.option[1]?.bImage} className="option-image"></img>
                    </span>
                ) : (
                    <div className="option"> B. <Markdown>{q?.option[1]?.bText}</Markdown></div>
                )}
            </div>

            <div className="options-in-a-row">
                {q?.option[2]?.cImage ? (
                    <span className="option option-image-container"> C.
                        <img src={q?.option[2]?.cImage} className="option-image"></img>
                    </span>
                ) : (
                    <div className="option">C. <Markdown>{q?.option[2]?.cText}</Markdown></div>
                )}

                {q?.option[3]?.dImage ? (
                    <span className="option option-image-container"> D.
                        <img src={q?.option[3]?.dImage} className="option-image"></img>
                    </span>
                ) : (
                    <div className="option">D. <Markdown>{q?.option[3]?.dText}</Markdown></div>
                )}
            </div>
        </div>
    )
}

export default AdminViewOptions;
