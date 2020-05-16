'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async getOrderNow(uId) {
    const result = await this.app.mysql.select('order', { where:{ uId:uId, order_state: [0,1,2] }})
    return result;
  }

  async getOrderList(uId) {
      const result = await this.app.mysql.select('order', { where:{ uId: uId, order_state: 3}})
      return result;
  }
  
  async updateOrder(order_id, order_state) {
    const result = await this.app.mysql.update('order',{ order_state: order_state },{ where:{ order_id:order_id } })
    return result.affectedRows === 1;
  }

  async addOrder(order) {
    const result = await this.app.mysql.insert('order', order)
    return result.affectedRows === 1
  }
}

module.exports = OrderService;
