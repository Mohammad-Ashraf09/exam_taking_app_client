// import React from 'react'
import { util } from "../utils/util";

const TestPaperList = ({ paper, handleDetelePaper }) => {
    const createdDate = util.getFormattedDate(paper?.createdAt);
    // const liveDate = util.getFormattedDate(paper?.liveAt);   // uncomment this when implemented

    return (
        <div className="test-paper-row">
            <p className="sub-heading sub-heading-test-name test-name"> {paper?.paperTitle} </p>
            <p className="sub-heading sub-heading-create-date other">{createdDate}</p>
            <p className="sub-heading sub-heading-live-date other">{createdDate}</p>
            <p className="sub-heading sub-heading-active other">Yes</p>
            <i className="fa-solid fa-trash-can sub-heading sub-heading-delete" onClick={()=>handleDetelePaper(paper?._id)}></i>
        </div>
    )
}

export default TestPaperList;
