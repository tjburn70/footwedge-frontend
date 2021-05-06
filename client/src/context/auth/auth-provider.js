import { useState, useEffect, useCallback } from 'react';
import { Hub } from 'aws-amplify';

import { AuthStateContext } from './auth-context';
import { isLoggedIn } from '../../utils/auth';


const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: isLoggedIn(),
        username: null,
        errorMessage: null,
    });

    const listener = useCallback((data) => {
        switch(data.payload.event) {
            case 'signIn':
                setAuthState((state) => ({...state, isLoggedIn: true }));
                break;
            case 'signUp':
                const username = data.payload.data.user.username;
                setAuthState(() => ({username: username, isLoggedIn: true }));
                console.log('user signed up');
                break;
            case 'signOut':
                console.log('user signed out');
                setAuthState(() => ({username: null, isLoggedIn: false }));
                break;
            case 'signUp_failure':
                console.log('signup failure');
                setAuthState((state) => ({...state, errorMessage: data.payload.data.message}));
                break;
            case 'signIn_failure':
                console.log('user sign in failed');
                setAuthState((state) => ({...state, errorMessage: data.payload.data.message}));
                break;
            case 'tokenRefresh':
                console.log('token refresh succeeded');
                break; 
            default:
                break;
        }
    }, []);

    useEffect(() => {
        Hub.listen('auth', listener);
    }, [listener]);

    return (
        <AuthStateContext.Provider value={authState}>
            {children}
        </AuthStateContext.Provider>
    );
}

export { AuthProvider };