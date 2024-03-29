import APIService from "../utils/api-service"

export function signUpUser(data) {
  const options = {
    method: "POST",
    url: "user/signup",
    data: data,
  }
  return APIService(options)
}

export function authenticateUser(data) {
  const options = {
    method: "POST",
    url: "user/login",
    data: data,
  }
  return APIService(options)
}
