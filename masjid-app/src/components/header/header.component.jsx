import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = () => {
    return (
        <div className='header'>
            <div className='background-image ' style={{
                backgroundImage: 'url(https://i.postimg.cc/ZnHTP71s/aircraft-airplane-boat-1575833.jpg)'
            }}>
                <h2 className='title'> Masjid booking app</h2>
                <Link className='option' to='/admin'> Admin </Link> 
            </div>
        </div>
    );
}

export default Header;
