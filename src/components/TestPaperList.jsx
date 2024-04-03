// import React from 'react'
import { Link } from "react-router-dom";
import { util } from "../utils/util";

const TestPaperList = ({ paper, deletePaperHandler, isAdmin }) => {
    const {_id, paperTitle, totalQuestion, createdAt, isLive, liveAt, attemptedAt} = paper;

    const createdDate = util.getFormattedDate(createdAt);
    const liveDate = isLive ? util.getFormattedDate(liveAt) : '';
    const attemptedDate = attemptedAt ? util.getFormattedDate(+attemptedAt) : '';

    let redirectTo = '';
    if (isAdmin) {
        redirectTo = `/paperList/paper/${_id}`;
    } else {
        if (attemptedAt) {
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
                {!isAdmin ? <p className="sub-heading other">{attemptedDate}</p> : null}
                <p className="sub-heading other no-of-ques" style={{color: '#0d47a1'}}>{totalQuestion}</p>
            </Link>
            {isAdmin ? (
                <i className="fa-solid fa-trash-can sub-heading sub-heading-delete" onClick={()=>deletePaperHandler(_id)}></i>
            ) : ( attemptedAt ? (
                    <i className="fa-solid fa-check sub-heading sub-heading-delete tick-mark"></i>
                ) : (
                    <i className="fa-solid fa-xmark sub-heading sub-heading-delete" style={{visibility: 'hidden'}}></i>
                )
            )}
        </div>
    )
}

export default TestPaperList;
