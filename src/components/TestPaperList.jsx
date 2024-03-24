// import React from 'react'
import { Link } from "react-router-dom";
import { util } from "../utils/util";

const TestPaperList = ({ paper, deletePaperHandler }) => {
    const {_id, paperTitle, totalQuestion, createdAt, isLive, liveAt} = paper;

    const createdDate = util.getFormattedDate(createdAt);
    const liveDate = isLive ? util.getFormattedDate(liveAt) : '';

    return (
        <div className="test-paper-row-delete">
            <Link className="test-paper-row" to={`/paperList/paper/${_id}`} style={{textDecoration: 'none', color:'black'}}>
                <p className="sub-heading sub-heading-test-name test-name"> {paperTitle} </p>
                <p className="sub-heading sub-heading-create-date other">{createdDate}</p>
                <p className="sub-heading sub-heading-live-date other">{liveDate}</p>
                <p className="sub-heading sub-heading-active other" style={{color: '#0d47a1'}}>{totalQuestion}</p>
            </Link>
            <i className="fa-solid fa-trash-can sub-heading sub-heading-delete" onClick={()=>deletePaperHandler(_id)}></i>
        </div>
    )
}

export default TestPaperList;
