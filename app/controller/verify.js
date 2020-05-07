'use strict';

const Controller = require('egg').Controller;

class VerifyController extends Controller {
  // 发送验证码
  async sendVelidata() {
    const { ctx, service } = this;
    const { phone } = ctx.query
    const velidata = await service.phone.index(phone);
    // 存入数据库（实际这里应该用redis缓存数据库）
    await service.verify.setVelidata(phone, velidata);
    ctx.body = '验证码发送成功'
  }
  // 确认验证码
  async verify() {
    const { ctx, service } = this;
    const { phone, velidata } = ctx.request.body;
    const localVelidata = await service.verify.getVelidata(phone);
    if( localVelidata === velidata){
        ctx.body= '验证成功';
    }else{
        ctx.body= '验证码不正确';
        ctx.status = 401;
    }
  }
}

module.exports = VerifyController;
