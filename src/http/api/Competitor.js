import { formPost, formGet } from '../base/baseHttp'

class Competitor {
    signUpPersonal(competitor) {
        const data = {
            competitor
        }
        return formPost('/api/competitor/signUpPersonal', data)
    }
    cancelPersonal(contestId) {
        const data = {
            contestId
        }
        return formPost('/api/competitor/cancelPersonal', data)
    }
    signUpTeam(teamId, password) {
        const data = {
            teamId,
            password,
        }
        return formPost('/api/competitor/signUpTeam', data)
    }
    cancelTeam(teamId) {
        const data = {
            teamId
        }
        return formPost('/api/competitor/cancelTeam', data)
    }
}

export default new Competitor()