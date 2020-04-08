'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.request)
    ctx.body = '新闻页面';
  }

  async content() {
    const { ctx } = this;

    let query = ctx.query;
    console.log(query);
    ctx.body = '新闻详情'
  }

  async list() {
      const { ctx } = this;
      let params = ctx.params;
      console.log('访问')
      console.log(params)
      ctx.body = '新闻列表';
  }
}

module.exports = NewsController;
