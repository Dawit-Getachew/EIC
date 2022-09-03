import Axios from "axios"
import endPoints from "src/constants/endPoints"
import {
  FetchUsersBody, FetchUsersBodyTag, FetchUserInfoBySessionBody, FetchUserInfoBySessionBodyTag,
  FetchFullNameUserBody, FetchFullNameUserBodyTag
} from "./query"

// fetch users
export const FetchAllUsers = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchUsersBody())
    .then(res => {
      callback(null, res.data.data[FetchUsersBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const FetchUserInfoBySession = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchUserInfoBySessionBody())
    .then(res => {
      console.log("data", res.data.data[FetchUserInfoBySessionBodyTag])
      callback(null, res.data.data[FetchUserInfoBySessionBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const FetchFullNameUser = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchFullNameUserBody(_id))
    .then(res => {
      console.log("data", res.data.data[FetchFullNameUserBodyTag])
      callback(null, res.data.data[FetchFullNameUserBodyTag])
    })
    .catch(err => console.log("Error", err))
}