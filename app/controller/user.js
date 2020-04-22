'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async login() {
    const { ctx, service } = this;
    const { phone, password } = ctx.request.body;
    const user = await service.user.findUser(phone);
    if(user && password === user.password){
        ctx.body = {
            uId: user.uId,
            name: user.name,
            phone: user.phone,
            address: user.address,
            rider: user.rider,
            riderPhone: user.riderPhone
        }
    }else{
        ctx.body = 'password Error';
        ctx.status = 401;
    }
  }
  // 注册
  async register() {
    const { ctx, service } = this;
    let { name, phone, address, rider, riderPhone, password }= ctx.request.body;
    const creatUser = await service.user.registerUser({ name, phone, address, rider, riderPhone, password })

    // 图片存储，暂时不用
    // ctx.helper.dataURLtoFile(userInfo.pics[1], 'app/static/user/'+userInfo.phone, 'jpg');

    if(creatUser){
        ctx.body = 'register success';
    }else{
        ctx.body = 'register wrong';
        ctx.status = 401;
    }
  }
  // 更新密码
  async updatePassword() {
    const { ctx, service } = this;
    const updateUser = await service.user.updatePassword(ctx.request.body);
    if(updateUser){
      ctx.body = '密码重置成功';
    }else{
        ctx.body = '密码重置失败';
        ctx.status = 401;
    }
  }
}

module.exports = UserController;
