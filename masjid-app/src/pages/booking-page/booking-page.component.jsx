import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import TextScroller from '../../components/text-scroller/text-scroller.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import BookingList from '../../components/booking-list/booking-list.component';
import SolatTime from '../../components/solat-time/solat-time.component';
import './booking-page.styles.scss';

class BookingPage extends React.Component{
    constructor(){
        super()

        this.state = {
            email: '',
            prayer: 'asr',
            batch: '1',
            bookingListTab: false,
            unbook: false
        }
    }
    
    
    handleSubmit = async (event) =>{
        event.preventDefault();
        const { email, prayer, batch } = this.state;
        const requestParameters = {
            method: this.state.unbook ? 'delete': 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, prayer, batch})
        }
        const URL = this.state.unbook ? 'http://localhost:8080/api/v1/user/unbook': 'http://localhost:8080/api/v1/user/book'
        const response = await fetch(URL, requestParameters)
        const data = await response.json();
        console.log(data);
        alert(data.message);
    }
    
    handleChange = (e) =>{
        const { value } = e.target;
        // console.log(value);
        this.setState({ email: value })
    }

    handleClick = (e) =>{
        if(e.target.id.includes('b2')){
            if (this.state.bookingListTab){ 
                return this.setState({unbook: true},() => {console.log(this.state)});
            }
            this.setState({ bookingListTab: !this.state.bookingListTab, unbook: true }, () => {console.log(this.state);
            });
        }else{
            if (this.state.bookingListTab) {
                return this.setState({unbook: false}, () => {console.log(this.state)});
            }
            this.setState({ bookingListTab: !this.state.bookingListTab, unbook: false }, () => {
                console.log(this.state);
            });
        }
        
    }
    

    render(){
        const { email , bookingListTab, prayer, batch } = this.state
        return (
            <div className='booking'>
                <section className='transit-element'>
                    <TextScroller id='text' text='Asalamualaykum Brothers!!, please kindly come along with your face masks and mat also ensure you adhere with the new regulations'>
                    </TextScroller>
                </section>
                <section className='solat-space'>
                    <SolatTime />
                </section>
                <section className="booking-form my-2">
                    <div className="container">
                        <div className="booking-div">
                            <h2>Batch 1: 1/7</h2>
                            <CustomButton 
                                handleClick={this.handleClick} 
                                margin={'m-1'} 
                                id={`b1${!this.state.unbook && this.state.bookingListTab ? '-active': ''}`}>
                                Book
                            </CustomButton>
                            <CustomButton 
                                handleClick={this.handleClick} 
                                margin={'m-1'} 
                                id={`b2${this.state.unbook && this.state.bookingListTab ? '-active': ''}`}>
                                Unbook
                            </CustomButton>
                            { bookingListTab && 
                                <div className="mygrid m-1">
                                    <form className='my-form flex' onSubmit={this.handleSubmit}>
                                        <FormInput 
                                            id='f1'
                                            type='email'
                                            value={email}
                                            onChange={this.handleChange}
                                            placeholder='Email'
                                            required
                                        />
                                        <CustomButton type='submit' id='b3'>Send</CustomButton>
                                    </form>
                                    <BookingList id='l1' prayer={prayer} batch={batch}/>
                                </div> 
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default BookingPage;
