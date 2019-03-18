import { formGet } from '../base/baseHttp'

class User {
    getInfo() {
        const data = {}
        return formGet('/api/user/detail', data)
    }
}

export default new User();