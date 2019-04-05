class TeamEntity {
    constructor(props) {
        this.contestId = null;
        this.teamName = null;
        this.hasPsw = 0;
        this.password = null;
        this.maxNum = null;
        this.memberNum = null;
    }
    set(props) {
        Object.assign(this, props);
        return this;
    }
}

class TeamFactory {
    get(props = {}) {
        return new TeamEntity(props);
    }
}

export default new TeamFactory()