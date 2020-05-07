'use strict';

const Controller = require('egg').Controller;

class OpenIdController extends Controller {
    async setOpenId(){
        const { ctx, service } = this;
        const code = ctx.query.code; 
        const result = await service.openId.setOpenId(code);
        if(result) ctx.body = '建立成功';
        else {
            ctx.body = 'error';
            ctx.status = 400;
        }
    }
    async getOpenId() {
        const { ctx, service } = this;
        const code = ctx.query.code; 
        const result = await service.openId.getOpenId(code);
        ctx.body = result;
      }
}

module.exports = OpenIdController;
