module.exports = app => {
    const { router, controller, middleware } = app;
    
    // user
    router.post('/api/login', controller.user.login);
    router.post('/api/register', controller.user.register);

    // 验证码
    router.get('/api/sendVelidata', controller.verify.sendVelidata);
    router.post('/api/verify', controller.verify.verify)

    
}