import { formPost } from '../base/baseHttp'

export const login = (userId, password) => {
    const data = {
        userId,
        password
    }
    return formPost('/api/user/login', data)
}