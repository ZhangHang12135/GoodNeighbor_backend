'use strict';

const Service = require('egg').Service;

class OpenIdService extends Service {
  async setOpenId(code) {
    const openid = await this.ctx.helper.getCustomOpenId(code);
    const ifOpenId = await this.app.mysql.get('openid', { open_id: openid });
    let result;
    if(ifOpenId){
        result = await this.app.mysql.update('openid', { code:code }, { where: { open_id: openid }})
    }else{
        result = await this.app.mysql.insert('openid', { open_id: openid, code: code });
    }
    return result.affectedRows === 1;
  }
  async getOpenId(code) {
      const result = await this.app.mysql.get('openid', { code: code });
      return result.open_id;
  }
}

module.exports = OpenIdService;
