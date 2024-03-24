import { useParams } from "react-router-dom";

const TestOverview = () => {
    const paperId = useParams().id;

    return (
        <div>{paperId}</div>
    )
}

export default TestOverview;
