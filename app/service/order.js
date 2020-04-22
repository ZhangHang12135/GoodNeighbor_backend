'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async getOrderNow(uId) {
    const result = await this.app.mysql.select('order', { where:{ uId:uId, order_state: 0 }})
    return result;
  }

  async getOrderList(uId) {
      const result = await this.app.mysql.select('order', { where:{ uId: uId, order_state: 1}})
      return result;
  }
}

module.exports = OrderService;
