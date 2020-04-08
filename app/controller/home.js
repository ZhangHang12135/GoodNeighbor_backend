'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx} = this;
    // await this.service.phone.index();
    // console.log(config.api)
    console.log(ctx.request.ip)
    ctx.body = '发送短信';
  }
}

module.exports = HomeController;
