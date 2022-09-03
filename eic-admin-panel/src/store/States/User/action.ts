import Axios from "axios"
import endPoints from "src/constants/endPoints"
import {
  FetchUsersBody, FetchUsersBodyTag, FetchUserInfoBySessionBody, FetchUserInfoBySessionBodyTag,
  FetchAccountsBody, FetchAccountsBodyTag, PostAccountBody, PostAccountBodyTag, IPostAccountInput,
  EditAccountBody, EditAccountBodyTag, IEditAccountInput,
  FetchEmailByServiceIDBody, FetchEmailByServiceIDBodyTag,
  IEmailInput, SendEmailBody, SendEmailBodyTag
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

export const FetchAccounts = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchAccountsBody())
    .then(res => {
      callback(null, res.data.data[FetchAccountsBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const PostAccount = (input: IPostAccountInput,callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, PostAccountBody(input))
    .then(res => {
      callback(null, res.data.data[PostAccountBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const EditAccount = (input: IEditAccountInput,callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, EditAccountBody(input))
    .then(res => {
      callback(null, res.data.data[EditAccountBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const FetchEmailByServiceID = (_id: string,callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchEmailByServiceIDBody(_id))
    .then(res => {
      callback(null, res.data.data[FetchEmailByServiceIDBodyTag])
    })
    .catch(err => console.log("Error", err))
}

export const SendEmail = (input: IEmailInput, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, SendEmailBody(input))
    .then(res => {
      callback(null, res.data.data[SendEmailBodyTag])
    })
    .catch(err => console.log("Error", err))
}