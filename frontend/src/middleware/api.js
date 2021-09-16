// inspired by https://leanpub.com/redux-book
import axios from "axios";
import { API } from "../actions/types";
import { accessDenied, apiError, apiStart, apiEnd } from "../actions/api";

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

  // axios default configs
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  let jwtValue = localStorage.getItem('token');
  
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
      dispatch(apiError(error));
      onFailure();

      if (error.response && error.response.status === 401) {
        dispatch(accessDenied(window.location.pathname));
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
