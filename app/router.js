module.exports = app => {
    const { router, controller, middleware } = app;
    
    // user
    router.post('/api/login', controller.user.login);
    router.post('/api/register', controller.user.register);
    router.post('/api/updatePassword', controller.user.updatePassword);
    // 验证码
    router.get('/api/sendVelidata', controller.verify.sendVelidata);
    router.post('/api/verify', controller.verify.verify)
    // 订单
    router.get('/api/getOrderNow', controller.order.getOrderNow);
    router.get('/api/getOrderList', controller.order.getOrderList);
    // 菜单
    router.post('/api/addMenu', controller.menu.addMenu);
    router.get('/api/getMenuList', controller.menu.getMenuList);
    
}