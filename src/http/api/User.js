import { formGet } from '../base/baseHttp'

export const getInfo = () => {
    const data = {}
    return formGet('/api/user/detail', data)
}