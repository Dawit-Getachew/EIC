import Axios from "axios"
import endPoints from "src/constants/endPoints"
import {
  fetchUsersBody, fetchUsersSimpleTag,
  LogoutBody, LogoutBodyTag
} from "./query"

// fetch users
export const fetchAllUsersSimple = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, fetchUsersBody())
    .then(res => {
      console.log("data", res.data.data[fetchUsersSimpleTag])
      callback(null, res.data.data[fetchUsersSimpleTag])
    })
    .catch(err => console.log("Error", err))
}

export const FetchAllUsers = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, fetchUsersBody())
    .then(res => {
      console.log("data", res.data.data[fetchUsersSimpleTag])
      callback(null, res.data.data[fetchUsersSimpleTag])
    })
    .catch(err => console.log("Error", err))
}

export const LogoutUser = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, LogoutBody())
    .then(res => {
      callback(null, res.data.data[LogoutBodyTag])
    })
    .catch(err => console.log("Error", err))
}