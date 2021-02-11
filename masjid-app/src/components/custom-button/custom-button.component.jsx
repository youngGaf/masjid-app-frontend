import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, active, margin, handleClick, ...otherProps }) => (
    <button 
        className={active ? `custom-button ${margin} ${active}`: `custom-button ${margin}` } 
        {...otherProps} 
        onClick={handleClick}
    >
        {children}
    </button>

)

export default CustomButton;