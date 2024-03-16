import { useState } from 'react';

const FormInput = ({name, type, placeholder, errorMsg, pattern, required, onChangeHandler}) => {
    const [focused, setFocused] = useState(false);

    return (
        <>
            <div className='form-input'>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    pattern={pattern}
                    required={required}
                    onChange={onChangeHandler}
                    onBlur={()=>setFocused(true)}
                    onFocus={()=>name==="confirmPassword" && setFocused(true)}
                    focused={focused.toString()}
                />
                <div className='error-msg'>{errorMsg}</div>
            </div>
        </>
    )
}

export default FormInput;
