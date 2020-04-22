'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  async addMenu(uId, menu) {
    const pic = menu.pics[0]; // 这里只取第一张图片
    const picPath = this.ctx.helper.getBaseUrl() + this.ctx.helper.dataURLtoFile(pic, `public/${uId}`, 'jpg');
    const result = await this.app.mysql.insert('menu', { name: menu.name, desc: menu.desc, price: menu.price, pic: picPath, uId: uId });

    return result.affectedRows === 1;
  }
  async getMenuList(uId) {
      const result = await this.app.mysql.select('menu', { where:{ uId:uId }});
      return result;
  }
}

module.exports = MenuService;
