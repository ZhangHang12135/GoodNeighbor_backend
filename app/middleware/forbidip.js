module.exports = (options, app) => {
    return async function forbidip(ctx, next) {
        let ip = '192.168.0.107';

        if(ctx.request.ip == ip) {
            ctx.status = 403;
            ctx.body = '被屏蔽';
        } else {
            await next();
        }
    }
}