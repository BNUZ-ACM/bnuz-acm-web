class TeamEntity {
    constructor(props) {
        this.contestId = "";
        this.teamName = "";
        this.hasPsw = 0;
        this.password = "";
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