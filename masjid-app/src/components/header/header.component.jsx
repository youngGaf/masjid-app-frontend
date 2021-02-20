import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { DetailsContext } from '../../store/store';
import './header.styles.scss';



const Header = ({ history, match}) => {
    const [show, setShow] = useState(false);
    const [details, setDetails] = useContext(DetailsContext);

    const showModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }

    const handleChange = (e) => {
        //console.log(e.target.value);
       const { value, name } = e.target;
       setDetails((prevUser) => ({...prevUser, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`${match.url}admin`);
        hideModal();
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
                            name='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                        <FormInput
                            id='#f-m2'
                            name='password'
                            type='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />    
                        <CustomButton type='submit' id='mb-1' margin={'m-2'}>Sign In</CustomButton>
                    </form> 
                </Modal.Body>
         
            </Modal>
        </div>
    );
}

export default withRouter(Header);
