'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async getOrderNow() {
    const { ctx, service } = this;
    const result = await service.order.getOrderNow(ctx.query.uId) ;
    ctx.body = result;
  }
  async getOrderList() {
    const { ctx, service } = this;
    const result = await service.order.getOrderList(ctx.query.uId);
    ctx.body = result;
  }
}

module.exports = OrderController;
