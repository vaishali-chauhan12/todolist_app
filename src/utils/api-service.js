import axios from "axios"
import { API_BASE_PATH } from "../constants"

export default async function APIService(config) {
  config.url = `${API_BASE_PATH}/${config.url}`
  return axios(config)
    .then(function (_response) {
      return new Promise((resolve) => resolve(_response.data))
    })
    .catch((error) => {
      return new Promise((resolve, reject) => {
        if (
          error &&
          error.response?.status >= 400 &&
          error.response?.status < 500
        ) {
          return reject(error.response.data)
        }
        return reject(error)
      })
    })
}
