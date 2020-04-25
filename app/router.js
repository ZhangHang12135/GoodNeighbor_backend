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

    /**
     * 客户端路由
     */
    router.get('/api/v2/getMenu', controller.menu.getMenu);
    router.get('/api/v2/setOpenId', controller.openId.setOpenId)
    // 地址
    router.get('/api/v2/getAddress', controller.custom.getCustomAddress);
    router.post('/api/v2/addAddress', controller.custom.addCustomAddress);
    router.post('/api/v2/editAddress', controller.custom.editCustomAddress);
    // 订单
    router.post('/api/v2/creatOrder', controller.order.creatOrder);
    
}