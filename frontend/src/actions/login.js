import { LOGIN, REFRESH_TOKEN, SET_JWT } from "./types";
import { apiAction } from './api';
import { BASE_URL } from '../constants';
import {authenticationService} from '../service/authentication.service.js';

export function login(user, successCallback) {
  const url = BASE_URL + `auth/login`;

  return apiAction({
    data: user,
    url: url,
    method: 'POST',
    headersOverride: 'Access-Control-Allow-Origin',
    onSuccess: successCallback ,
    onFailure: () => console.log("Error logging in"),
    label: LOGIN
  });
}

export function setTokens(data){
  authenticationService.storeTokens(data);

  return {
    type: SET_JWT,
    payload: data
  }; 
}


export function refreshTokenFunction(data, successCallback) {
  const url = BASE_URL + `auth/refresh`;

  console.log(data);

  let refreshToken = {
    'refresh_token' : data
  }

  return apiAction({
    data: refreshToken,
    url: url,
    method: 'POST',
    headersOverride: 'Access-Control-Allow-Origin',
    onSuccess: successCallback ,
    onFailure: () => console.log("Error getting refresh token"),
    label: REFRESH_TOKEN
  });
}