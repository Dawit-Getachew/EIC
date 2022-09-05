/* eslint-disable*/

import axios, { AxiosResponse } from "axios";
import * as actions from "../api";
import endPoints from "../../constants/endPoints"
import { CookieJar } from "tough-cookie"
const token = "";
axios.defaults.baseURL = endPoints.baseURL;
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// axios.defaults.headers["Access-Control-Allow-Origin"] = `http://localhost:3000`;
axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
// axios.defaults.headers['Cookie'] = 'nodejs_session:=s%3AlduJX3Mj8svSfXkPgEBynsC0haMgnzev.SM%2FxCUQJYPn0Ff2KnzzbOepkEWmhs11kv3AXfcUA52g; Path=/; Expires=Sun, 13 Feb 2022 12:32:33 GMT; HttpOnly; SameSite=Strict'
axios.defaults.withCredentials = true
// axios.defaults.crossDomain = true;
// axios.defaults.headers.common['Accept'] = '*/*'

const cookiejar = new CookieJar()
// axios.interceptors.request.use(function (config) {
//   cookiejar.getCookies(config.url, function(err, cookies) {
//     config.headers.cookie = cookies.join('; ');
//   });
//   return config;
// });

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

const api = ({ dispatch, getState }: any) => (next: any) => async (action: any) => {
  try {
    if (
      action.payload.config.hasCustomAct &&
      action.type === actions.apiCallBegan.type
    ) {
      const { customActMapper } = action.payload.config;
      return customActMapper(dispatch, action);
    }
  } catch (err) { }

  if (action.special) {
    return dispatch(action)
  }

  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    onStart,
    onSuccess,
    onError,
    isMock,
    config,
  } = action.payload;
  if (isMock) {
    axios.defaults.baseURL = url;
  }
  if (onStart) dispatch({ type: onStart, payload: { data, url } });
  next(action);
  try {
    const response = await axios.request({
      url: endPoints.baseURL,
      method: "post",
      data,
    });
    //General
    // dispatch(actions.apiCallSuccess(response.data))
    //Specific
    if (Boolean(action.payload.isMock)) {
      dispatch({
        type: onSuccess,
        payload: { data: response.data, isMock, config },
      });
    } else if (onSuccess)
      dispatch({ type: onSuccess, payload: response.data, config });
  } catch (error) {
    //General
    // dispatch(actions.apiCallFailed(error.message));
    //Specific
    // if (onError) {
    //   try {
    //     if (
    //       (error.response &&
    //         (error.response.status === 400 ||
    //           error.response.status === 403 ||
    //           error.response.status === 401)) ||
    //       error.response.status === 405 ||
    //       error.response.status === 404
    //     ) {
    //       if (error.response.data && error.response.data.errors) {
    //         const errorObject = error.response.data.errors;
    //         const errorMessage =
    //           typeof errorObject[Object.keys(errorObject)[0]] === "string"
    //             ? errorObject[Object.keys(errorObject)[0]]
    //             : errorObject[Object.keys(errorObject)[0]][0];
    //         dispatch({ type: "error", payload: { message: errorMessage } });
    //       }
    //       dispatch({ type: onError, payload: error.response.data });
    //     } else dispatch({ type: onError, payload: error.message });
    //   } catch (error) {
    //     console.log(error);
    //     dispatch({ type: onError, payload: error });
    //   }
    // }
  }
};

export default api;
