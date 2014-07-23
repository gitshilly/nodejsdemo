var  client = require('../database');
var  uid = require('../utils/uuid');//用于生成id
function  Post(username, post, time) {
    this.user = username;
    this.post = post;
    if (time) {
        this.time = time;
    } else {
        this.time =  new Date ();
        console.log(this.time);
    }
}
var tableName = "post";
mysql = client.getDbCon();
module.exports = Post;

Post.prototype.save = function  save(callback) {
    var  post = {
        user: this.user,
        post: this.post,
        time: this.time
    };
    uuid = uid.v4();
    var sql = "insert into post (id,user,post,time) values(?,?,?,?)";
    mysql.query(sql,[uuid,post.user,post.post,post.time],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, uuid, fields);
        }
    });
};

Post.get =  function  get(username, callback) {
    var sql ="select p.id,p.user,p.post,p.time from post p where 1=1";
    if(username){
        sql +=" and p.user='"+username+"'";
    }
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            callback(err,results,fields);
        }
    })
};