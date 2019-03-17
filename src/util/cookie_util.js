function get(key) {
  let reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  let ret = document.cookie.match(reg);
  if (ret) {
    return ret[2];
  } else {
    return null;
  }
}

function set(key, value, expire = 0) {
  if (expire === 0) {
    document.cookie = `${key}=${value};expires=0`;
  } else {

  }
}

export default {
  get: get,
  set: set
}