import { API_START, API_END, ACCESS_DENIED, API_ERROR, API, REFRESH_TOKEN, LOGOUT } from "../actions/types";

export const apiStart = label => ({
  type: API_START,
  payload: label
});

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = (error, label) => ({
  type: API_ERROR,
  payload: label,
  error
});

export const refreshTokenFunction = jwtData => ({
  type: REFRESH_TOKEN,
  payload: jwtData
});

export const logout = ({
  type: LOGOUT
});


export function apiAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => { },
  onFailure = () => { },
  label = "",
  headersOverride = null
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}