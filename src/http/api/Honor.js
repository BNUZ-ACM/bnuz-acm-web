import { formGet } from '../base/baseHttp'

export const getHonorList = () => {
    const data = {}
    return formGet('/api/award/list', data)
}