import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, margin, handleClick, ...otherProps }) => (
    <button 
        className={margin ? `custom-button ${margin}`: 'custom-button'} 
        {...otherProps} 
        onClick={handleClick}
    >
        {children}
    </button>

)

export default CustomButton;