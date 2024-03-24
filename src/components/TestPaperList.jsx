// import React from 'react'
import { Link } from "react-router-dom";
import { util } from "../utils/util";

const TestPaperList = ({ paper, deletePaperHandler, isAdmin }) => {
    const {_id, paperTitle, totalQuestion, createdAt, isLive, liveAt, attemptedDate} = paper;

    const createdDate = util.getFormattedDate(createdAt);
    const liveDate = isLive ? util.getFormattedDate(liveAt) : '';
    const attemptedAt = attemptedDate ? util.getFormattedDate(+attemptedDate) : '';

    let redirectTo = '';
    if (isAdmin) {
        redirectTo = `/paperList/paper/${_id}`;
    } else {
        if (attemptedDate) {
            redirectTo = `/paper/${_id}/overview`;
        } else {
            redirectTo = `/paper/${_id}/instruction`;
        }
    }

    return (
        <div className="test-paper-row-delete">
            <Link className="test-paper-row" to={redirectTo} style={{textDecoration: 'none', color:'black'}}>
                <p className="sub-heading sub-heading-test-name test-name"> {paperTitle} </p>
                {isAdmin ? <p className="sub-heading other">{createdDate}</p> : null}
                <p className="sub-heading other">{liveDate}</p>
                {!isAdmin ? <p className="sub-heading other">{attemptedAt}</p> : null}
                <p className="sub-heading other" style={{color: '#0d47a1'}}>{totalQuestion}</p>
            </Link>
            {isAdmin ? (
                <i className="fa-solid fa-trash-can sub-heading sub-heading-delete" onClick={()=>deletePaperHandler(_id)}></i>
            ) : ( attemptedDate ? (
                    <i className="fa-solid fa-check sub-heading sub-heading-delete tick-mark"></i>
                ) : (
                    <i className="fa-solid fa-xmark sub-heading sub-heading-delete" style={{visibility: 'hidden'}}></i>
                )
            )}
        </div>
    )
}

export default TestPaperList;
