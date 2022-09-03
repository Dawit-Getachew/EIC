import Axios from "axios"
import endPoints from "../../../constants/endPoints"
import {
  LoginAccountBody, SignupUserBody, SignupUserBodyTag, LoginTag, SignOutTag, ILoginAccountInput,
  IUserDoc, SignOutBody, ILoginUserInput, LoginUserBody, LoginUserBodyTag,
  FetchUserInfoBySessionBody, FetchUserInfoBySessionBodyTag,
} from "./Queries"
import { CookieJar } from "tough-cookie"
import { wrapper } from "axios-cookiejar-support"
import { IUserInput } from "./user.types"

export type { IUserDoc }

const jar = new CookieJar()
export const client = wrapper(Axios.create({
  jar, withCredentials: true, maxRedirects: 0, headers: {
    "Access-Control-Allow-Credentials": true
  },
  validateStatus: function (status) {
    console.log("stat", status)
    return status <= 302; // Reject only if the status code is greater than 302
  },
}))

export const LoginAccount = async ({ email, password }: ILoginAccountInput, callback = (err: any, data: any, headers) => null) => {
  try {
    const response: any = await client.post(endPoints.baseURL, LoginAccountBody({ email, password }))
    callback(null, response.data.data[LoginTag], response)
  } catch (error) { console.log("err", error) }
}

export const LoginUser = async (input: ILoginUserInput, callback = (err: any, data: any, headers) => null) => {
  try {
    const response: any = await client.post(endPoints.baseURL, LoginUserBody(input))
    callback(null, response.data.data[LoginUserBodyTag], response)
  } catch (error) { console.log("err", error) }
}

export const SignupUser = async (input: IUserInput, callback = (err: any, data: any, headers) => null) => {
  try {
    const response: any = await client.post(endPoints.baseURL, SignupUserBody(input))
    callback(null, response.data.data[SignupUserBodyTag], response)
  } catch (error) { console.log("err", error) }
}

export const FetchUserInfoBySession = async (input: any, callback = (err: any, data: any, headers) => null) => {
  try {
    const response: any = await client.post(endPoints.baseURL, FetchUserInfoBySessionBody())
    callback(null, response.data.data[FetchUserInfoBySessionBodyTag], response)
  } catch (error) { console.log("err", error) }
}

export const _LoginUser = ({ email, password }: ILoginAccountInput, callback = (err: any, data: any, headers) => null) => {
  fetch(endPoints.baseURL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': "true",
      'crossDomain': "http://localhost:3000"
    },
    credentials: "same-origin",
    method: "POST",
    body: JSON.stringify(LoginAccountBody({ email, password }))
  })
    .then(res => {
      for (var pair of res.headers.entries()) { // accessing the entries
        if (pair[0] == 'set-session') { // key I'm looking for in this instance
          console.log("working")
        }
      }
      return res.json()
    })
    .then(response => {
      if (response.data.data[LoginTag].error) {
        callback(response.data.data[LoginTag].error, null, null)
      } else {
        console.log(response)
        callback(null, response.data.data[LoginTag], response)
      }
    })
}

export const signOut = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, SignOutBody())
    .then(res => {
      callback(null, res.data.data[SignOutTag])
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    })
    .catch(err => console.log("Error", err))

}

function delete_cookie( name, path, domain ) {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function get_cookie(name){
  return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
  });
}