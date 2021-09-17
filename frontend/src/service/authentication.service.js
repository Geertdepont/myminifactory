export const authenticationService = {
    logout,
    storeTokens,
    isAuthenticated
};


function storeTokens(jwtData) {
    if (jwtData.token) {
        localStorage.setItem('token', jwtData.token);        
    }

    if (jwtData.refresh_token) {
        localStorage.setItem('refreshtoken', jwtData.refresh_token);       
    }
}

function isAuthenticated() {
    const token = localStorage.getItem('token');

    if (!token ) {
        return false;
    } 

    return true;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshtoken');
}

