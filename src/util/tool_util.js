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

function illegalChar(str){
    let pattern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    if (pattern.test(str)) { 
        return false
    }
    pattern = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (pattern.test(str)) {
        return false
    }
    return true
}

// type为1则为队伍，否则为个人
function checkName(name, type) {
    let str = ""
    if (type == 1) {
        str = "队伍"
    }
    if (name.length >= 15) {
        return str + "昵称长度不能超过15"
    }
    if (name.length <= 0) {
        return str + "昵称长度不能为空"
    }
    if (!illegalChar(name)) {
        return str + "昵称包含了很奇怪的字符"
    }
    return ''
}

function checkStr(str, strName = "", limitLen = 20, canNull = false, errMessage = null, reg = null) {
    if (!canNull && str.length <= 0) {
        return strName + "不能为空"
    }
    if ((str != null || typeof(str) != "undefined") && str.length > limitLen) {
        return strName + "长度不能超过" + limitLen + "个字符"
    }
    if (reg != null) {
        if (!reg.test(str)) {
            if (errMessage != null) {
                return errMessage
            } else {
                return '输入不合法'
            }
        }
    }
    return ''
}

export default {
    timeFilter: timeFilter,
    checkName: checkName,
    checkStr: checkStr
}