import React, { useEffect, useState } from 'react';
import './booking-list.styles.scss';

const BookingList = ({prayer, batch}) => {
    const [bookList, setBookList] = useState([]);

    const url = process.env.REACT_APP_URL ? 
        `${process.env.REACT_APP_URL}` : 'http://localhost:8080'
        

    useEffect(() => {
        const requestParameters = {
            method: 'get'
        }
        fetch(`${url}/api/v1/user/bookingList?prayer=${prayer}&batch=${batch}`, requestParameters)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            setBookList(data.data);
        }).catch(error => {
            console.log(error.message)
        });

    }, [prayer, batch, url]);

    return (
        <ul>
            {bookList && bookList.map(list => (
                <li key={list.userId}>{list.name}</li>
            ))}
        </ul>
    );
}

export default BookingList;
