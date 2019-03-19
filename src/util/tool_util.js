function timeFilter(time) {
    if (time != null && time != "") {
        let d = new Date(time);
        let year = d.getFullYear();
        let month = completionZero(d.getMonth() + 1);
        let day = completionZero(d.getDate());
        let hour = completionZero(d.getHours());
        let minutes = completionZero(d.getMinutes());
        let seconds = completionZero(d.getSeconds());
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    } else {
        return "";
    }
}

function completionZero(val) {
    return val < 10 ? '0' + val : val;
}

export default {
    timeFilter: timeFilter
}