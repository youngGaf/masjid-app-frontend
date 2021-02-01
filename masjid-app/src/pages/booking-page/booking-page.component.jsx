import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import TextScroller from '../../components/text-scroller/text-scroller.component';
import SolatTime from '../../components/solat-time/solat-time.component';
import './booking-page.styles.scss';

class BookingPage extends React.Component{
    constructor(){
        super()

        this.state = {
            email: '',
            prayer: 'asr',
            batch: '1'
        }
    }
    
    
    handleSubmit = async (event) =>{
        event.preventDefault();
        const { email, prayer, batch } = this.state;
        const requestParameters = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, prayer, batch})
        }

        const response = await fetch('http://localhost:8080/api/v1/user/book', requestParameters)
        const data = await response.json();
        console.log(data);
        alert(data.message);
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
                <section className='transit-element'>
                    <TextScroller id='text' text='Asalamualaykum Brothers!!, please kindly come along with your face masks and mat also ensure you adhere with the new regulations'>
                    </TextScroller>
                </section>
                <section className='solat-space'>
                        <SolatTime />
                </section>
                <section className="booking-form">
                    
                </section>
            </div>
        );
    }
}

export default BookingPage;
