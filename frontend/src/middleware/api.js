// inspired by https://leanpub.com/redux-book
import axios from "axios";
import { API } from "../actions/types";
import { accessDenied, apiError, apiStart, apiEnd, refreshTokenFunction, logout } from "../actions/api";
import { BASE_URL } from '../constants';
import { authenticationService } from '../service/authentication.service';

const apiMiddleware = ({ dispatch }) => next => action => {
  if (!action) return;
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers
  } = action.payload;
  const dataOrParams = ["GET"].includes(method) ? "params" : "data";

  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  let jwtValue = localStorage.getItem('token');
  let refreshToken = localStorage.getItem('refreshtoken');

  if (accessToken != null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtValue}`;

  if (label) {
    dispatch(apiStart(label));
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      dispatch(onSuccess(data));
    })
    .catch(error => {
      dispatch(apiError(error, label));
      onFailure();

      if (error.response.status === 401 && error.response.data && error.response.data.message === 'Expired JWT Token') {
        axios.post("/auth/refresh", {
           'refresh_token': refreshToken,
        }).then(function (refreshResponse) {
          if (refreshResponse.data && refreshResponse.data.token) {
            authenticationService.storeTokens(refreshResponse.data);
            dispatch(refreshTokenFunction(refreshResponse.data));
          }           
        }).catch(error => {
          authenticationService.logout();
          dispatch(logout);
        })
      }
      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
