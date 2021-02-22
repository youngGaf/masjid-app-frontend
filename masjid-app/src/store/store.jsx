import React, { useState } from 'react';

export const DetailsContext = React.createContext({email: '', password: '', authenticated: false, token: '', currentUser: ''});

const Store = ({children}) => {
    const [details, setDetails] = useState({email: '', password: '', authenticated: false, token: '', currentUser: ''});
    return (
        <DetailsContext.Provider value={[details, setDetails]}>
            {children}
        </DetailsContext.Provider>
    );
}

export default Store;
