import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './header.styles.scss';



const Header = () => {
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({email: '', password: ''});

    const showModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }

    const handleChange = (e) => {
       const { value, name } = e.target;
       setDetails({[name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const url = 'https://www.freewebheaders.com/wp-content/gallery/islam/thumbs/thumbs_close-up-of-al-aqsa-mosque-domes-in-palestine-web-header.jpg'

    const { email, password } = details;
    return (
        <div className='header' >
            <div className='container flex' style={{
                    backgroundImage: `url(${url})`
                }}>
                <h1 className='title'><Link to='/' >Masjid booking app</Link></h1>
                {/* <div className="oval" style={{
                    backgroundImage: `url(${url})`
                }}>
                    
                </div> */}
                <CustomButton id='button' handleClick={showModal}>Admin</CustomButton>
            </div>
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title >ADMIN</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form className='modal-form flex' onSubmit={handleSubmit}>
                        <FormInput
                            id='#f-m1'
                            type='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                        <FormInput
                            id='#f-m2'
                            type='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />    
                        <CustomButton type='submit' id='mb-1' 
                            margin={'my-2'}>Sign In</CustomButton>
                    </form> 
                </Modal.Body>
         
            </Modal>
        </div>
    );
}

export default Header;
