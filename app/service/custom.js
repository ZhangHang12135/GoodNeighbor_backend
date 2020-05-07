'use strict';

const Service = require('egg').Service;


class CustomService extends Service {
  async getCustomAddress(code) {
    const open_id = await this.service.openId.getOpenId(code);
    let address = await this.app.mysql.select('addresses',{where:{ open_id: open_id }});
    return address;
  }
  async addCustomAddress(code, address) {
    const open_id = await this.service.openId.getOpenId(code);
    const result = await this.app.mysql.insert('addresses', {
        open_id: open_id,
        name: address.name,
        phone: address.phone,
        addressName: address.addressName,
        address: address.address,
        area: address.area,
        default: Number(address.default)
    })
    return result.affectedRows === 1;
  }
  async editCustomAddress(id, address) {
      const result = await this.app.mysql.update('addresses', {
        name: address.name,
        phone: address.phone,
        addressName: address.addressName,
        address: address.address,
        area: address.area,
        default: Number(address.default)
      }, { where: { id: id }});

      return result.affectedRows === 1;
  }
}

module.exports = CustomService;
