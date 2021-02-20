import React from 'react';
import './unauthorized.styles.scss';

const Unauthorized = () => {
    const url = 'https://s3.amazonaws.com/gotchastream/article-images/b4e2e038da834b4843e20bae97471d6701d38fe9/c65447fb6f0585a26bbba299250435d8.jpg'
    return (
        <div className='auth' style={{backgroundImage: `url(${url})`}}>
        </div>
    );
}

export default Unauthorized;
