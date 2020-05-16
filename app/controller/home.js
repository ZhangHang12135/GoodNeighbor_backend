'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getHome() {
    const { ctx, service } = this;
    const uId = ctx.query.uId;
    const homeData = await service.home.getSales(uId);
    ctx.body = homeData;

  }
}

module.exports = HomeController;