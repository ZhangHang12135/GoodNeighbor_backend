'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getNewsList() {
    // 获取数据
    let list = ['11','22','33'];
    const { config } = this;
    console.log(this.config.api)
    return list;
  }
}

module.exports = NewsService;
