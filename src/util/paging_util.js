/*
 * @Author: yhy
 * @Date: 2018-09-28 16:10:08
 * @Last Modified by: yhy
 * @Last Modified time: 2018-09-28 17:24:23
 */

class elePaging {
  constructor(props) {
    this.page = 1;
    this.pageSize = 20;
    this.updateWay = null;
    this.pageSizes = [20, 50, 100, 9999];
    return this.set(props);
  }

  pageChange = (page) => {
    this.page = page;
    this.getPage();
  }

  pageSizeChange = (pageSize) => {
    this.page = 1;
    this.pageSize = pageSize;
    this.getPage();
  }

  prePage = () => {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getPage();
    }
  }

  getPage = async () => {
    if (this.updateWay && typeof this.updateWay == 'function') {
      this.updateWay(this.page, this.pageSize);
    }
  }

  set(props) {
    Object.assign(this, props);
    return this;
  }
}

export default elePaging;