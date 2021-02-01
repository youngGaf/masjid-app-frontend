import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = () => {
    return (
        <div className='header'>
            <div className='container flex'>
                <h1 className='title'>Masjid booking app</h1>
                <div className="oval">
                    
                </div>
                <Link className='option' to='/admin'> Admin </Link> 
            </div>
        </div>
    );
}

export default Header;
