// react
import { useState } from 'react';
import './FormTemplate.css'

const FormElement = (props) => {
  
    const [focused, setFocuse] = useState(false);

    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocuse = (e) => {
        setFocuse(true);
    }

    return (
        <div className="t-form-element">
            <label className='t-form-label'>{label}</label>
            <input className='t-form-input'
                {...inputProps} 
                onChange={onChange}
                onBlur={handleFocuse}
                // onFocus={() => inputProps.name === "confirmPassword" && setFocuse(true)}
                focused={focused.toString()}
            />
            <span> {errorMessage} </span>
        </div>
    )
}

export default FormElement