/*
 * @Author: yhy
 * @Date: 2018-11-01 15:50:18
 * @Last Modified by: yhy
 * @Last Modified time: 2019-03-06 10:20:51
 */

export default {
  httpUrl() {
    if (this.http.port != 80) {
      return `${this.http.prot}://${this.http.host}:${this.http.port}`;
    } else {
      return `${this.http.prot}://${this.http.host}`;
    }
  }
}