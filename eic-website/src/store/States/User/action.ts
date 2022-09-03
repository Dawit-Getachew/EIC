import Axios from "axios"
import endPoints from "src/constants/endPoints"
import {
  fetchUsersBody, fetchUsersSimpleTag,
  LogoutBody, LogoutBodyTag,
  ChangeProfilePictureBody, ChangeProfilePictureBodyTag,
  ChangeUserBasicProfileBody, ChangeUserBasicProfileBodyTag,
  ChangeUserEmailBody, ChangeUserEmailBodyTag,
  ChangeUserPhoneNumberBody, ChangeUserPhoneNumberBodyTag,
  ChangeUserPasswordBody, ChangeUserPasswordBodyTag
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

export const ChangeProfilePicture = (input: {
  _id: string; profile_picture: string;
}, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, ChangeProfilePictureBody(input))
    .then(res => {
      callback(null, res.data.data[ChangeProfilePictureBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const ChangeUserBasicProfile = (input: {
  _id: string; first_name: string; last_name: string;
  gender: string; city: string; country: string;
}, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, ChangeUserBasicProfileBody(input))
    .then(res => {
      callback(null, res.data.data[ChangeUserBasicProfileBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const ChangeUserEmail = (input: {
  _id: string; email: string; password: string;
}, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, ChangeUserEmailBody(input))
    .then(res => {
      callback(null, res.data.data[ChangeUserEmailBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const ChangeUserPhoneNumber = (input: {
  _id: string; phone_number: string; password: string;
}, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, ChangeUserPhoneNumberBody(input))
    .then(res => {
      callback(null, res.data.data[ChangeUserPhoneNumberBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const ChangeUserPassword = (input: {
  _id: string; old_password: string; new_password: string;
}, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, ChangeUserPasswordBody(input))
    .then(res => {
      callback(null, res.data.data[ChangeUserPasswordBodyTag])
    })
    .catch(err => console.log("Error", err))
}