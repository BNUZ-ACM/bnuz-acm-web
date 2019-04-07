import { formPost, formGet, jsonPost } from '../base/baseHttp'

class Competitor {
    signUpPersonal(competitor) {
        return jsonPost('/api/competitor/signUpPersonal', competitor)
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
    getListPersonal(contestId) {
        const data = {
            contestId
        }
        return formGet('/api/competitor/listPersonal', data)
    }
    getUserCompetitorInfo(contestId) {
        const data = {
            contestId
        }
        return formGet('/api/competitor/getUserCompetitorInfo', data)
    }
    updatePersonal(competitor) {
        return jsonPost('/api/competitor/updatePersonal', competitor)
    }
}

export default new Competitor()