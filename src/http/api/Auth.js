import { formPost } from '../base/baseHttp'

export const login = (username, password) => {
  const data = {
    username,
    password
  }
  return formPost('/login', data)
}
