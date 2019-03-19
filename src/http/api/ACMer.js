import { formPost, formGet } from '../base/baseHttp'

class ACMer {
    getACMerInfo() {
        const data = {};
        return formGet('/api/acmer/detail')
    }
}