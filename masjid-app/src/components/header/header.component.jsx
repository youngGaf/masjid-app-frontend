import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { DetailsContext } from '../../store/store';
import './header.styles.scss';



const Header = ({ history, match}) => {
    const [show, setShow] = useState(false);
    const [details, setDetails] = useContext(DetailsContext);

    const url = process.env.REACT_APP_URL ? 
        `${process.env.REACT_APP_URL}` : 'http://localhost:8080'

    // Keep logged in session
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('details')) || {};
        setDetails((prevDetails) =>({...prevDetails, ...data}));
    }, [setDetails]);

    const showModal = () => {
        if(currentUser){
            history.push(`${match.url}admin`);
        }else{
            setShow(true);
        }
    }

    const hideModal = () => {
        setShow(false);
    }

    const handleChange = (e) => {
       const { value, name } = e.target;
       setDetails((prevDetails) => ({...prevDetails, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(details)
        }
        
        fetch(`${url}/api/v1/admin/auth`, requestParameters)
        .then(res => res.json())
        .then(({ data, status, message}) => {
            if(status === 'success'){
                console.log(data);
                setDetails((prevDetails) =>({...prevDetails, authenticated: data.authenticated, currentUser: data.user, token: data.token}));
                
                // Store session in local storage
                localStorage.setItem('details', JSON.stringify({authenticated: data.authenticated, currentUser: data.user, token: data.token}));
                
                history.push(`${match.url}admin`);
                hideModal();
            }else{
                alert(message);
            }
        }).catch(error => {
            console.log(error.message)
       }); 

    }

    const imageUrl = 'https://www.freewebheaders.com/wp-content/gallery/islam/thumbs/thumbs_close-up-of-al-aqsa-mosque-domes-in-palestine-web-header.jpg'

    const { email, password, currentUser } = details;
    return (
        <div className='header' >
            <div className='container flex' style={{backgroundImage: `url(${imageUrl})`}}>
                <h1 className='title'><Link to='/'>Masjid booking app</Link></h1>
                {currentUser ? 
                <CustomButton id='button' handleClick={showModal}>Admin {currentUser}</CustomButton>
                : <CustomButton id='button' handleClick={showModal}>Admin</CustomButton>
                }
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
