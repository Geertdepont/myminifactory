import { CREATE_USER } from "./types";
import { apiAction } from './api';
import { BASE_URL } from '../constants';

export function createUser(user, successCallback) {
  const url = BASE_URL + `auth/register`;

  return apiAction({
    data: user,
    url: url,
    method: 'POST',
    headersOverride: 'Access-Control-Allow-Origin',
    onSuccess: successCallback,
    onFailure: () => console.log("Error occured creating user"),
    label: CREATE_USER
  });
}