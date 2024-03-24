import { useParams } from "react-router-dom";

const Instruction = () => {
    const paperId = useParams().id;

    return (
        <div>{paperId}</div>
    )
}

export default Instruction;
