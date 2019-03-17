/*
 * @Author: yhy
 * @Date: 2018-10-27 20:40:22
 * @Last Modified by: yhy
 * @Last Modified time: 2018-12-01 22:04:18
 */

function removeBlank(str) {
  if (typeof str == 'string') {
    return str.replace(/^\s+|\s+$/g,'');
  } else {
    return str;
  }
}

export default {
  isNull(param, label = null) {
    param = removeBlank(param);
    if ((param === null || param === '') && param !== 0) {
      if (label) {
        throw label + '不能为空';
      } else {
        throw '参数不齐全';
      }
    }
  },
  validPhone(phone) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (!reg.test(phone)) {
      throw '手机号格式错误';
    }
  },
  less(small, big, samll_label = null, big_label = null) {
    if (parseInt(big) < parseInt(small)) {
      if (samll_label && big_label) {
        throw `${big_label}不能小于${samll_label}`
      } else {
        throw '参数不合法';
      }
    }
  },
  shouldBeNumber(param, label) {
    if (typeof param != 'number') {
      throw `${label}不是数字`;
    } 
  }
}