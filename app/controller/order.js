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
  async updateOrder() {
    const { ctx, service } = this;
    const { order_id, order_state } = ctx.request.body;
    const result = await service.order.updateOrder(order_id, order_state);
    if(result){
      ctx.body = '更新成功';
    }else{
      ctx.body = '更新失败';
      ctx.status = 500;
    }
  }

  async creatOrder() {
    const { ctx, service } = this;
    const { cartList, code } = ctx.request.body;
    const addressArray = await service.custom.getCustomAddress(code);
    let address, orderArr = {};
    for (const key in addressArray) {
      if (addressArray.hasOwnProperty(key)) {
        const element = addressArray[key];
        if(element.default == 1){
          address = element
        }
      }
    }
    cartList.forEach((item)=>{
      let { name, count, price, uId } = item;
      if(orderArr[uId]){
        orderArr[uId].push({ name, count, price });
      }else{
        orderArr[uId] = [];
        orderArr[uId].push({ name, count, price });
      }
    })
    let time = new Date();
    let orderDate = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
    for (const key in orderArr) {
      let arr = orderArr[key];
      let order = {
        order_menu: '',
        order_date: orderDate,
        order_price: 0,
        order_state: 0,
        custom_name: address.name,
        custom_phone: address.phone,
        custom_address: address.address+' '+address.area,
        uId: parseInt(key)
      }
      arr.forEach(item=>{
        order.order_menu += `${item.name}x${item.count} `;
        order.order_price += item.count * item.price;
      })
      await service.order.addOrder(order);
    }
    ctx.body = '支付成功'
  }
}

module.exports = OrderController;
