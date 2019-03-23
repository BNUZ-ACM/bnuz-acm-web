import { formGet } from '../base/baseHttp'

class User {
    getInfo() {
        return formGet('/api/user/detail')
    }
}

export default new User();