import { formPost, formGet, jsonPost } from '../base/baseHttp'

class Team {
    getTeamInfo(teamId) {
        const data = {
            teamId
        }
        return formGet('/api/team/detail', data)
    }
    getTeamList(contestId) {
        const data = {
            contestId
        }
        return formGet("/api/team/list", data)
    }
    createTeam(team) {
        return jsonPost('/api/team/create', team)
    }
    updateTeam(team) {
        return jsonPost('/api/team/update', team)
    }
    deleteTeam(teamId) {
        const data = {
            teamId
        }
        return formGet('/api/team/delete', data)
    }
}

export default new Team()