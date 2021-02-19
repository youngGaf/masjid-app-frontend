import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import CustomButton from '../custom-button/custom-button.component';
import './solat-time.styles.scss';

const SolatTime = ({ handleClick, prayer, time, batch }) => {
    const [solat, setSolat] = useState([]);
    const [count, setCountdown] = useState({
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    });

    useEffect(()=>{
        const requestParameters = {
            method: 'get'
        }
        fetch('http://localhost:8080/api/v1/solat-today', requestParameters)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setSolat(data.data);
        }).catch(error => {
            console.log(error.message)
        });
    }, []);
    
    useEffect(()=> {
        const interval = setInterval(() => {
            const today = moment().format('YYYY-MM-DD')
            //const mytime ='00:00'
           
            const then = moment(`${today}, ${time}`, "YYYY-MM-DD HH:mm");
            
            const now = moment();
            
            const countdown = moment(then._d - now._d).utc();
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
            setCountdown({ hours, minutes, seconds });
            
        }, 1000);

        if(interval){
            return () => {
                clearInterval(interval);
              }
        }

    }, [time, count]);

    const { hours, minutes, seconds } = count
    return (
        
        <div className='solat-time container grid'>
                <div className="solat card">
                        { solat ? 
                            <table id='t1'>
                                <thead>
                                    <tr>
                                        <th>Solat</th>
                                        <th><Moment format={'ll'}/></th>
                                    </tr>     
                                </thead>
                                <tbody>
                                    {solat.map((value)=> (
                                        <tr key={value._id}>
                                            <td>{value.prayer}</td>
                                            <td>{value.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                             : 
                            <h2>
                               SORRY BROTHER, NO SOLAT REGISTERED FOR TODAY YET!!
                            </h2>
                        }
                </div>    
                <div>
                    <h2>Next Solah</h2>
                    <div className="countdown-wrapper">
                        <div className="countdown-item">
                            {hours}
                            <span>hours</span>
                        </div>
                        <div className="countdown-item">
                            {minutes}
                            <span>minutes</span>
                        </div>
                        <div className="countdown-item">
                            {seconds}
                            <span>seconds</span>
                        </div>
                    </div>

                    <div className="count-down card">
                        <h2>Next prayer time </h2>
                        <div className="text">
                            <p>{prayer}: {time}</p>
                                <p>Batch: {batch}</p>
                            <p>Time: <Moment format={'LT'}/></p>
                        </div>
                    
                    </div>
                </div>
            <CustomButton handleClick={handleClick} id='reserve'>Reserve a space</CustomButton>
        </div>
    );
}

export default SolatTime;
