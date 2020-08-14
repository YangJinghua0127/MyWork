//依赖模块
    //引入express
const express = require('express');
    //引入body-parser
const bodyParser = require('body-parser');
    //引入cookie-paeser
const cookieParser = require('cookie-parser');
    //引入express-session
const expressSession = require('express-session');
    //引入uuid
const uuid = require('uuid');
    //引入mysql
const mysql = require('mysql');
    //引入ip
const ip = require('ip');
    //引入fs
const fs = require('fs');

//初始化接口
let server = express();

//中间件
server.use(bodyParser.urlencoded({extend:false}));
server.use(bodyParser.json());
server.use(cookieParser('server.net'));
server.use(expressSession({
    name:'server.net',
    genid:function(){
        return uuid.v4();
    },
    maxAge:1000*60*20
}));

//创建连接池



//接口

//端口
server.listen(8081,function(){
    console.log(`服务器启动成功！${ip.address()}:8081`)
})