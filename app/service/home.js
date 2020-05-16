'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
    async getSales(uId) {
        const orders = await this.app.mysql.select('order', { where:{ uId: uId }}); // 所有订单

        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth()+1;
        const day = time.getDate();

        const monthOrders = orders.filter((item)=>{
            return item.order_date.startsWith(`${year}-${month}`);
        })
        const dayOrders = orders.filter((item)=>{
            return item.order_date.startsWith(`${year}-${month}-${day}`);
        })

        // 总销售额
        const allSales = orders.reduce((sum,item)=>{
            return sum + item.order_price;
        },0);
        // 本月销售额
        const monthSales = monthOrders.reduce((sum,item)=>{
            return sum + item.order_price;
        },0);
        // 本日销售额
        const daySales = dayOrders.reduce((sum,item)=>{
            return sum + item.order_price;
        },0);
        // 菜品数
        const menus = await this.app.mysql.select('menu', {where:{uId: uId}});
        const sales = [allSales, monthSales, daySales, menus.length];

        // 获取所有菜品，并初始数据格式
        const menuDataObj = {};
        menus.forEach((item) => {
            menuDataObj[item.name] = 0;
        })
        const menuSales = orders.map(item => item.order_menu).join(' ').split(' ');
        // 组合实际数据
        menuSales.forEach((item) => {
            let menuItem = item.split('x');
            menuDataObj[menuItem[0]] += parseInt(menuItem[1]);
        })
        // 数据转化为数组格式
        const menuData = [];
        for (const key in menuDataObj) {
            if (menuDataObj.hasOwnProperty(key)) {
                const element = menuDataObj[key];
                let obj = { value: element, name: key };
                menuData.push(obj);
            }
        }
        //获取近七日日期
        const sevenDays = this.ctx.helper.getSevenDays(year, month, day);
        // 完整数据
        const SevenDaysSales = [];
        sevenDays.forEach(today => {
            let daySales = orders.filter((item)=>{
                return item.order_date.startsWith(`${year}-${today}`);
            }).reduce((sum,item)=>{
                return sum + item.order_price;
            },0);
            SevenDaysSales.push({ date: today, value: daySales })
        })
        return { sales, menuData, SevenDaysSales }
    }
}

module.exports = HomeService;