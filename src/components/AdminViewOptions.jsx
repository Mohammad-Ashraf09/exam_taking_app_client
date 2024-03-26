import Markdown from 'markdown-to-jsx';

const AdminViewOptions = ({ option }) => {
    return (
        <div className="options">
            <div className="options-in-a-row">
                {option[0]?.aImage ? (
                    <span className="option option-image-container"> A.
                        <img src={option[0]?.aImage} className="option-image"></img>
                    </span>
                ) : (
                    <div className="option"> A. <Markdown>{option[0]?.aText}</Markdown></div>
                )}

                {option[1]?.bImage ? (
                    <span className="option option-image-container"> B.
                        <img src={option[1]?.bImage} className="option-image"></img>
                    </span>
                ) : (
                    <div className="option"> B. <Markdown>{option[1]?.bText}</Markdown></div>
                )}
            </div>

            <div className="options-in-a-row">
                {option[2]?.cImage ? (
                    <span className="option option-image-container"> C.
                        <img src={option[2]?.cImage} className="option-image"></img>
                    </span>
                ) : (
                    <div className="option">C. <Markdown>{option[2]?.cText}</Markdown></div>
                )}

                {option[3]?.dImage ? (
                    <span className="option option-image-container"> D.
                        <img src={option[3]?.dImage} className="option-image"></img>
                    </span>
                ) : (
                    <div className="option">D. <Markdown>{option[3]?.dText}</Markdown></div>
                )}
            </div>
        </div>
    )
}

export default AdminViewOptions;
