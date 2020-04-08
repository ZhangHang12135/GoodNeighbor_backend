module.exports = app => {
    const { router, controller, middleware } = app;
    
    router.get('/', controller.home.index);

    router.get('/api/verify', controller.news.index);

    router.get('/news/content', middleware.forbidip(), controller.news.content);

    router.post('/api/register', controller.news.list);
}