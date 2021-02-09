import React, { useEffect, useState } from 'react';
import './booking-list.styles.scss';

const BookingList = ({prayer, batch}) => {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        const requestParameters = {
            method: 'get'
        }
        fetch(`http://localhost:8080/api/v1/user/bookingList?prayer=${prayer}&batch=${batch}`, requestParameters)
        .then(res => res.json())
        .then(data => {
            setBookList(data.data);
        })
        .catch(err => console.log(err.message));
    }, [prayer, batch]);

    return (
        <ul>
            {bookList && bookList.map(list => (
                <li key={list.userId}>{list.name}</li>
            ))}
        </ul>
    );
}

export default BookingList;
