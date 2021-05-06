import { Auth } from 'aws-amplify';

import { localStorageService } from '../modules/local-storage-service';
import { history } from '../routes/history';

export const registerUser = async ({ username, password, userAttributes }) => {
    const { birthdate, phone_number, gender, firstName, lastName, email } = userAttributes;
    const name = `${firstName} ${lastName}`;
    try {
        await Auth.signUp({
            username,
            password,
            attributes: {
                email,
                birthdate,
                phone_number,
                gender,
                name,
                'custom:firstName': firstName,
                'custom:lastName': lastName,
            }
        });
        history.push('/confirm-user');
    } catch (error) {
        console.log('error signing up:', error);
    }
}

export const login = async ({ email, password }) => {
    try {
        await Auth.signIn(email, password);
        history.push('/player-profile');
    } catch (error) {
        console.log('error signing in', error);
    }
}

export const logout = async () => {
    try {
        await Auth.signOut();
        history.push('/');
    } catch (error) {
        console.log('error signing out', error);
    }
}

export const confirmUser = async ({ username, code }) => {
    try {
        await Auth.confirmSignUp(username, code);
        history.push('/player-profile');
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

export const isLoggedIn = () => {
    const lastAuthUser = localStorageService.getLastAuthUser();
    if (lastAuthUser) {
        return true;
    } else {
        return false;
    }
}
