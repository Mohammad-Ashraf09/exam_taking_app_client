import TestPaperList from "./TestPaperList";

const TestPapersTable = ({ papers, deletePaperHandler, isAdmin}) => {
    return (
        <div className="test-papers-list-table">
            <div className="test-papers-list-sub-heading">
                <p className="sub-heading sub-heading-test-name"> Test Name</p>
                {isAdmin ? <p className="sub-heading"> Create Date </p> : null}
                <p className="sub-heading"> Live Date </p>
                {!isAdmin ? <p className="sub-heading"> Attempted Date </p> : null}
                <p className="sub-heading"> No. of Questions </p>
                <p className="sub-heading sub-heading-delete"></p>
            </div>

            <div className="test-papers-list">
                {papers?.map((paper)=>(
                    <TestPaperList
                        key={paper?.id}
                        paper={paper}
                        deletePaperHandler={deletePaperHandler}
                        isAdmin={isAdmin}
                    />
                ))}
            </div>
        </div>
    )
}

export default TestPapersTable;
