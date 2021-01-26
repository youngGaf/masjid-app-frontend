import React, { useEffect, useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './booking-page.styles.scss';

class BookingPage extends React.Component{
    constructor(){
        super()

        this.state = {
            email: ''
        }
    }
    
    
    handleSubmit = (event) =>{
        event.preventDefault();

    }
    
    handleChange = (e) =>{
        const { value } = e.target;
        console.log(value);
        this.setState({ email: value })
    }

    render(){
        const { email } = this.state
        return (
            <div className='booking'>
               <div className='booking-form-container'>
                    <form className='booking-form' onSubmit={this.handleSubmit} >
                        <FormInput id='f1'
                            type='email'
                            name='email'
                            value={email}
                            handleChange={this.handleChange}
                            placeholder='Email'
                            required
                        />
                        <CustomButton id='c1' type='submit'> Book </CustomButton>
                    </form>
               </div>
            </div>
        );
    }
}

export default BookingPage;
