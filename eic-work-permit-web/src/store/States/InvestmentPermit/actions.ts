import Axios, { AxiosRequestConfig } from "axios"
import endPoints from "src/constants/endPoints"
import FormData from 'form-data'

export const uploadFile = async (file: any) => {
  const formdata = new FormData()
  formdata.append("item", file)
  return Axios.post(endPoints.uploadURL, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(function (response) {
    if (response.data.uri) {
      if (response.data.uri.length > 0) {
        return response.data.uri[0]
      } else {
        return null
      }
      return null
    }
  })
  .catch(error => null)
}