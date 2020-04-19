
module.exports = appInfo => {
    const config = exports = {};

    config.keys = '497617';
    config.cors = {
        origin: '*',
        credentials: true,
        allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS'
    }
    config.security = {
        csrf: {
          enable: false
        }
    }
    // config.middleware = ['forbidip'];
    config.mysql = {
        // 单数据库信息配置
        client: {
          // host
          host: 'localhost',
          // 端口号
          port: '3306',
          // 用户名
          user: 'root',
          // 密码
          password: 'password',
          // 数据库名
          database: 'GN',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
      };
    return {
        ...config
    }
}