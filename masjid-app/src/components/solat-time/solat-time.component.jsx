import React from 'react';
import Moment from 'react-moment';
import CustomButton from '../custom-button/custom-button.component';
import './solat-time.styles.scss';

const SolatTime = ({ handleClick }) => {
    return (
        <div className='solat-time container grid'>
                <div className="solat card">
                    <table id='t1'>
                        <thead>
                            <tr>
                                <th>Solat</th>
                                <th><Moment format={'ll'}/></th>
                            </tr>     
                        </thead>
                        <tbody>
                            <tr>
                                <td>Subuhi</td>
                                <td>06:30</td>
                            </tr>
                            <tr>
                                <td>Sunrise</td>
                                <td>07:00</td>
                            </tr>
                            <tr>
                                <td>Zuhur</td>
                                <td>07:00</td>
                            </tr>
                            <tr>
                                <td>Asr</td>
                                <td>07:00</td>
                            </tr>
                            <tr>
                                <td>Maghrib</td>
                                <td>07:00</td>
                            </tr>
                            <tr>
                                <td>Ishai</td>
                                <td>07:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>    
                
                <div className="count-down card">
                    <h2>Next prayer time </h2>
                    <div className="text">
                        <p>Fajr: 06:30</p>
                        <p>00h:00m:00s</p>
                    </div>
                </div>
            <CustomButton handleClick={handleClick} id='reserve'>Reserve a space</CustomButton>
        </div>
    );
}

export default SolatTime;
