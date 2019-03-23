import { formPost, formGet, jsonPost, jsonGet } from '../base/baseHattp'

class Team {
    getTeamInfo() {
        return formGet('/api/team/detail')
    }
    getTeamList() {
        return formGet("/api/team/detail")
    }
    createTeam(team) {
        const data = {
            team
        }
        return jsonPost('/api/team/create', data)
    }
    updateTeam(team) {
        const data = {
            team
        }
        return jsonPost('/api/team/update', data)
    }
    deleteTeam(team) {
        const data = {
            team
        }
        return jsonPost('/api/team/update', team)
    }
}

export default new Team()