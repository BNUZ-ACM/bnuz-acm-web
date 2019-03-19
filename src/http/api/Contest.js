import { formPost, formGet } from '../base/baseHttp'

class Contest {
    getContestList() {
        return formGet('api/contest/list')
    }
    getContestDetail(contestId) {
        const data = {
            contestId
        }
        return formGet('api/contest/detail', data)
    }
}

export default new Contest()