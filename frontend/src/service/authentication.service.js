import { publicKey }  from './publickey.js';
import * as jwt from "jsonwebtoken";

export const authenticationService = {
    logout,
    storeTokens,
    isAuthenticated
};


function storeTokens(jwtData) {
    if (jwtData.token) {
        console.log("stored token")
        localStorage.setItem('token', jwtData.token);        
    }

    if (jwtData.refresh_token) {
        console.log("stored refresh token")
        localStorage.setItem('refreshtoken', jwtData.refresh_token);       
    }
}

function isAuthenticated() {
    const token = localStorage.getItem('token');
    // const refreshToken = localStorage.getItem('refreshtoken');

    if (!token ) {
        return false;
    } 

    var data = jwt.verify(token, publicKey, { algorithm: 'RS256' }, (err, payload) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                console.log("//need to refresh token");
            }

            return false;
        }

        return true;
    });


    return data;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshtoken');
}

