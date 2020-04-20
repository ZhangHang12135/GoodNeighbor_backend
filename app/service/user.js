'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findUser(phone) {
    const user = await this.app.mysql.get('user', { phone: phone});
    return user;
  }
  async registerUser(user) {
    const result = await this.app.mysql.insert('user', user);
    return result.affectedRows === 1;
  }
  async updatePassword({phone, password}) {
    const result = await this.app.mysql.update('user', { password }, {where:{ phone }} )
    return result.affectedRows === 1;
  }
}

module.exports = UserService;
