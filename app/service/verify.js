'use strict';

const Service = require('egg').Service;

class VerifyService extends Service {
  async setVelidata(phone, velidata) {
    const ifVelidata = await this.app.mysql.get('velify', { phone: phone});
    let reslut;
    if(ifVelidata){
        reslut = await this.app.mysql.update('velify', {velidata: velidata}, {where:{ phone: phone}})
    }else{
        result = await this.app.mysql.insert('velify', {phone: phone, velidata: velidata});
    }
    
    return result.affectedRows === 1;
  }
  async getVelidata(phone) {
      const velidata = await this.app.mysql.get('velify', { phone: phone})
      return velidata.velidata;
  }
}

module.exports = VerifyService;
