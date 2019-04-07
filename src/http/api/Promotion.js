import { formGet, formPost } from '../base/baseHttp'

class Promotion {
    getPromotionList(contestId) {
        const data = {
            contestId
        }
        return formGet('/api/promotion/getPromotionList', data)
    }
}

export default new Promotion()