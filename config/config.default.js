
module.exports = appInfo => {
    const config = exports = {};

    config.keys = '497617';
    config.cors = {
        origin: '*',
        credentials: true,
        allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS'
    }
    // config.middleware = ['forbidip'];

    return {
        ...config
    }
}