import Axios from "axios"
import endPoints from "src/constants/endPoints"
import {
  FetchMyInvestmentPermitsBody, FetchMyInvestmentPermitsBodyTag,
  CapitalRegistrationUpdateBody, CapitalRegistrationUpdateBodyTag, CapitalRegistrationUpdateBodyProps,
  UpdateNotirizedMinutesBody, UpdateNotirizedMinutesBodyTag
} from "./query"

export const API = {
  FetchMyInvestmentPermits: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchMyInvestmentPermitsBody(_id))
      .then(response => {
        if (response.data.data[FetchMyInvestmentPermitsBodyTag]) {
          callback(null, response.data.data[FetchMyInvestmentPermitsBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  CapitalRegistrationUpdate: (input: CapitalRegistrationUpdateBodyProps,callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CapitalRegistrationUpdateBody(input))
      .then(response => {
        if (response.data.data[CapitalRegistrationUpdateBodyTag]) {
          callback(null, response.data.data[CapitalRegistrationUpdateBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateNotirizedMinutes: (_id: string, draft_minutes: string,callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateNotirizedMinutesBody(_id, draft_minutes))
      .then(response => {
        if (response.data.data[UpdateNotirizedMinutesBodyTag]) {
          callback(null, response.data.data[UpdateNotirizedMinutesBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
}