import React, { useEffect } from 'react';

const Loading = ({ solat }) => {
    
    const demoAsyncCall = () => {
        return new Promise((resolve) => setTimeout(() => resolve(), 2500));
    }
    useEffect(() => {
        demoAsyncCall();
    });

    return(
        solat === undefined ? null: <div>I don load</div>
    );
}

export default Loading;
