import { formPost, formGet } from '../base/baseHttp'

class ACMer {
    getACMerInfo() {
        return formGet('/api/acmer/detail')
    }
    getMyACMerInfo() {
        return formGet('/api/acmer/getDetailByAcmer')
    }
}

export default new ACMer()