import { useState } from "react";
import TextArea from "./TextArea";

const Option = ({ option, name, id, minHeight, formData, setImages, setFormData }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const imageHandler = (e, id) => {
        if(e.target.files[0]){
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setImagePreview(objectUrl);
            // here removing the number from string
            const obj = { [`${id?.replace(/[0-9]/g, '')}Image`]: e.target.files[0] }
            setImages((prev)=>[...prev, obj]);
        }
    }

    return (
        <>
            {option ? <div className="option-name"> {option}. </div> : null}
            <TextArea
                name={name}
                option={option}
                minHeight={minHeight}
                formData={formData}
                setFormData={setFormData}
            />

            {imagePreview ? (
                <img className={`previewImage ${name}PreviewImage`} src={imagePreview} alt='profile'/>
            ) : null}

            <div className={`textarea-icons ${option ? 'option-textarea-icons' : ''}`}>
                <label htmlFor={id}>
                    <div className="icons">
                        <i className="fa-solid fa-camera"></i>
                    </div>
                    <input style={{display:"none"}} type="file" id={id} name="file" accept='.jpg, .png, .jpeg' onChange={(e)=>imageHandler(e, id)}/>
                </label>
            </div>
        </>
    )
}

export default Option;
