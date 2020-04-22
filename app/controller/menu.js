'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async addMenu() {
    const { ctx, service } = this;
    const result = await service.menu.addMenu(ctx.query.uId, ctx.request.body);
    if(result){
        ctx.body = '添加成功';
    }else{
        ctx.body = '添加失败';
        ctx.status = 400;
    }
  }
  async getMenuList() {
    const { ctx, service } = this;
    const result = await service.menu.getMenuList(ctx.query.uId);
    ctx.body = result;
  }
}

module.exports = MenuController;
