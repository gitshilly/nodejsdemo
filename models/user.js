var  client = require('../database');
var  uid = require('../utils/uuid');//用于生成id
function  User(user) {
    this.name = user.name;
    this.password = user.password;
}
var tableName = "user";
mysql = client.getDbCon();
module.exports = User;
//新增用户
User.prototype.save = function  save(callback) {
    // 用户对象
    var  user = {
        name: this.name,
        password: this.password
    };
    uuid = uid.v4();
    //插入数据库
    var sql ="insert into user (id,name,password) values(?,?,?)";

    mysql.query(sql,[uuid,user.name,user.password],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, uuid, fields);
        }
    });
};
//获取用户
User.get =  function  get(username, callback) {

        // 读取 users 集合
        var sql = "select c.id,c.name,c.password from user c where c.name='"+username+"'";
        console.log(sql);
        mysql.query(sql,function(err,results,fields){
            if(err){
                throw err;
            }else{
                console.log(results[0]);
                callback(err,results[0],fields);
            }
        })

};