(function() {
    var settings;

    settings = {
        db: {
            host: 'localhost',     //本地数据库
            port: '3306',
            user: 'emdsa',          //数据库用户名
            password: 'emdsa',          //数据库密码
            database: 'test'  //数据库名称
        }
    };

    module.exports = settings;

}).call(this);