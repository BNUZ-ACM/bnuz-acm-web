import { formGet } from '../base/baseHttp'

export const getDalaoList = () => {
    const data = {}
    return formGet('/api/job/list', data)
}