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

        const { batches, solat, bookingCount } = props;
        
        // convert batches into an array
        const range = ((size, startAt = 1) => { 
            return [...Array(size).keys()].map(i => i + startAt);
        });

        this.state = {
            email: '',
            prayer:  solat.prayer,
            batches: batches ? range(parseInt(batches)): [1,2],
            bookingCount: bookingCount,
            bookingListTab: false,
            unbook: false
        }
    }
    
    
    handleSubmit = async (event) =>{
        event.preventDefault();
        const { email, prayer } = this.state;
        const requestParameters = {
            method: this.state.unbook ? 'delete': 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, prayer, batch: event.target.id.charAt(1)})
        }
        console.log(requestParameters.body)
        try {
            const URL = this.state.unbook ? 'http://localhost:8080/api/v1/user/unbook': 'http://localhost:8080/api/v1/user/book'
            const response = await fetch(URL, requestParameters)
            const data = await response.json();
            console.log(data);
            alert(data.message);
            this.setState({
                email: '',
                bookingListTab: false,
                unbook: false
            });
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
        const container = document.getElementById('work-container');
        const btns = container.getElementsByClassName('custom-button');
        for(var i=0; i<btns.length; i++){
            var current = document.getElementsByClassName("active");
            // If there's no active class
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            // Add the active class to the current/clicked button
                e.target.className += " active";
        }
        if(e.target.id.includes('ub2')){
            if (this.state.bookingListTab){ 
                return this.setState({unbook: true},() => {console.log(this.state)});
            }
            this.setState({ bookingListTab: !this.state.bookingListTab, unbook: true }, () => {
                console.log(this.state);
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
        
        const { email , bookingListTab, prayer, batches, bookingCount } = this.state
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
                    <div className="container" id='work-container'>
                        {batches.map(value => (
                            <div key={value} className="booking-div my-1">
                                <h2>Batch {value}: {bookingCount[value - 1]}/7</h2> 
                                <CustomButton 
                                    handleClick={this.handleClick} 
                                    margin={'m-1'}>
                                    Book
                                </CustomButton>
                                <CustomButton 
                                    handleClick={this.handleClick} 
                                    margin={'m-1'} 
                                    id='ub2'>
                                    Unbook
                                </CustomButton>
                                { bookingListTab && 
                                    <div className="mygrid m-1">
                                        <form className='my-form flex' id={`b${value}`} onSubmit={this.handleSubmit}>
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
                                }
                            </div>
                        ))
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default BookingPage;
