'use strict';

const Controller = require('egg').Controller;

class CustomController extends Controller {
  async getCustomAddress() {
    const { ctx, service } = this;
    const code = ctx.query.code;
    const result = await service.custom.getCustomAddress(code);
    ctx.body = result;
  }
  async addCustomAddress() {
      const { ctx, service } = this;
      const code = ctx.query.code;
      const result = await service.custom.addCustomAddress(code, ctx.request.body);
      if(result){
          ctx.body = '添加成功';
      }else{
          ctx.body = '添加失败';
          ctx.status = 400;
      }
  }
  async editCustomAddress() {
      const { ctx, service } = this;
      const id = ctx.query.id;
      const result = await service.custom.editCustomAddress(id, ctx.request.body);
      if(result){
        ctx.body = '修改成功';
    }else{
        ctx.body = '修改失败';
        ctx.status = 400;
    }
  }
}

module.exports = CustomController;
