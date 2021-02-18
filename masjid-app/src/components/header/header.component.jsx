import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = () => {
    const url = 'https://www.freewebheaders.com/wp-content/gallery/islam/thumbs/thumbs_close-up-of-al-aqsa-mosque-domes-in-palestine-web-header.jpg'
    return (
        <div className='header' style={{
                    backgroundImage: `url(${url})`
                }}>
            <div className='container flex'>
                <h1 className='title'>Masjid booking app</h1>
                <div className="oval" style={{
                    backgroundImage: `url(${url})`
                }}>
                    
                </div>
                <Link className='option' to='/admin'> Admin </Link> 
            </div>
        </div>
    );
}

export default Header;
