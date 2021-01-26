import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ handleChange, ...otherProps}) => {
    return (
        <div className='group'>
            <input className='form-input' onChange={ handleChange } {...otherProps}/>
        </div>
    );
}

export default FormInput;
