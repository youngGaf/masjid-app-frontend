import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import TextScroller from '../../components/text-scroller/text-scroller.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import BookingList from '../../components/booking-list/booking-list.component';
import SolatTime from '../../components/solat-time/solat-time.component';
import './booking-page.styles.scss';

class BookingPage extends React.Component{
    constructor(props){
        super(props)
        const { batches, prayer, batch, bookingCount, time } = props;

        // convert batches into an array
        const range = ((size, startAt = 1) => { 
            return [...Array(size).keys()].map(i => i + startAt);
        });

        this.state = {
            email: '',
            prayer:  prayer,
            time: time,
            batch: batch,
            batches: batches ? range(parseInt(batches)): [0],
            bookingCount: bookingCount,
            bookingListTab: false,
            unbook: false
        }
    }
    
    handleSubmit = async (event) =>{
        // Define url
        const url = process.env.REACT_APP_URL ? 
            `${process.env.REACT_APP_URL}` : 'http://localhost:8080'
        
        event.preventDefault();
        console.log(event.target.id.charAt(4));
        const { email, prayer } = this.state;
        const requestParameters = {
            method: this.state.unbook ? 'delete': 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, prayer, batch: event.target.id.charAt(4)})
        }
        console.log(requestParameters.body)
        try {
            const URL = this.state.unbook ? `${url}/api/v1/user/unbook`: `${url}/api/v1/user/book`
            const response = await fetch(URL, requestParameters)
            const data = await response.json();
            alert(data.message);
            window.location.reload();
        } catch (error) {
           console.log(error); 
        }

    }
    
    handleChange = (e) =>{
        const { value } = e.target;
        // console.log(value);
        this.setState({ email: value })
    }

    handleClick = (e) =>{
        const { bookingCount } = this.state;

        if(bookingCount.length === 5){
            alert('Sorry you can no longer book today, try again tomorrow');
            return
        }
        // Reserve space
        if(e.target.id.includes('reserve')){
            return this.setState({bookingListTab: true}, () =>{console.log(this.state)})
        }

            const container = document.getElementById('work-container');
            const btns = container.getElementsByClassName('custom-button');
            const forms = container.getElementsByClassName('my-form');
    
            // Set active button
            for(var i=0; i<btns.length; i++){
                var current = document.getElementsByClassName("active");
                // If there's an active class
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" active", "");
                }
                // Add the active class to the current/clicked button
                    e.target.className += " active";
            }
    
            // Set dynamic form display
            for(var j=0; j<forms.length; j++){
                    // check if the last value of the id string matches with that of target
                    if (e.target.id.slice(-1) === forms[j].id.slice(-1)){
                        forms[j].className = forms[j].className.replace(" display", "");
                    }else{
                        if(forms[j].className.includes("display")) continue; 
                        forms[j].className += " display";
                    }
            }


        // Set unbook state
        if(e.target.id.includes('ub')){
                return this.setState({unbook: true},() => {console.log(this.state)});
        } else{
                return this.setState({unbook: false}, () => {console.log(this.state)});
        }

    }
        
    
    

    render(){
        
        const { email , prayer, batches, batch, bookingListTab, bookingCount, time } = this.state
        return (
            <div className='booking'>

                {/* Transitioning component section */}
                <section className='transit-element'>
                    <TextScroller id='text' text='Asalamualaykum Brothers!!, please kindly come along with your face masks and mat also ensure you adhere with the new regulations'>
                    </TextScroller>
                </section>

                {/* Solat time section */}
                <section className='solat-space'>
                    <SolatTime handleClick={this.handleClick} prayer={prayer} time={time} batch={batch}/>
                </section>
                
                {/* Booking form section */}
                <section className="booking-form">
                    {bookingListTab && 
                    <div className="container" id='work-container'>
                        {batches.map(value => (
                            <div key={value} className="booking-div my-1">
                                <h2>Batch {value}: {bookingCount[value - 1]}/7</h2> 
                                <CustomButton
                                    id={`b${value}`} 
                                    handleClick={this.handleClick} 
                                    margin={'m-1'}>
                                    Book
                                </CustomButton>
                                <CustomButton 
                                    handleClick={this.handleClick} 
                                    margin={'m-1'} 
                                    id={`ub${value}`} >
                                    Unbook
                                </CustomButton>
                                <div className="mygrid m-1">
                                    <form className='my-form flex display' id={`form${value}`} onSubmit={this.handleSubmit}>
                                        <FormInput 
                                            id={`f${value}`}
                                            type='email'
                                            value={email}
                                            onChange={this.handleChange}
                                            placeholder='Email'
                                            required
                                        />
                                        <CustomButton type='submit'>Send</CustomButton>
                                    </form>
                                    <BookingList id='l1' prayer={prayer} batch={value}/>
                                </div> 
                            </div>
                        ))
                        }
                    </div>}
                </section>

            </div>
        );
    }
}

export default BookingPage;
