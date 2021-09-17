import { FETCH_USERS, SET_USERS } from "./types";
import { apiAction } from './api';
import { BASE_URL } from '../constants';

export function fetchUsers() {
  const url = BASE_URL + 'api/user';

    return apiAction({
        url: url,
        onSuccess: setUsers,
        onFailure: () => console.log("Error occured fetching users"),
        label: FETCH_USERS
    });
}

function setUsers(data){
    return {
        type: SET_USERS,
        payload: data
    };
}
