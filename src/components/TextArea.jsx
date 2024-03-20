// import { useState } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
// import Markdown from 'markdown-to-jsx';

const modules = {
    toolbar: [
        // [{ 'font': [] }],
        ["bold", "italic", "underline"],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'color': [] }, { 'background': [] }],
        [
            {list: "ordered"},
            {list: "bullet"},
        ],
        
    ],
}

const TextArea = ({ minHeight, name, option, formData, setFormData }) => {
    // const [value, setValue] = useState('');
    const onChangeHandler = (input) => {
        if (name === 'question') {
            setFormData({...formData, question: input});
        } else {
            if (option === 'A') {
                setFormData({ ...formData, a: input });
            } else if (option === 'B') {
                setFormData({ ...formData, b: input });
            } else if (option === 'C') {
                setFormData({ ...formData, c: input });
            } else {
                setFormData({ ...formData, d: input });
            }
        }
    }

    return (
        // <textarea
        //     className="question-textarea"
        //     style={{minHeight: minHeight}}
        //     type="text"
        //     name={name}
        //     onChange={onChangeHandler}
        //     // disabled={true}  // implement this when we add new question all the previous questions input will disabled ans there should be a button for edit
        // />

        <ReactQuill
            className='question-textarea'
            style={{minHeight: minHeight}}
            // theme="snow"
            placeholder={name === 'question' ? "Type your question here..." : `option ${option}...`}
            theme="bubble"
            modules={modules}
            onChange={onChangeHandler}
            // onChange={setValue}
        />
        // <Markdown>{value}</Markdown>
    )
}

export default TextArea;
