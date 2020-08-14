//引入http
const http = require('http');
//引入qs
const qs = require('querystring');
//引入 fs
const fs = require('fs');

//开启服务器
var server = http.createServer((request, response) => {
    //设置响应头
    response.setHeader('Content-Type', 'application/json;charset=utf-8')
    //判断路径
    if (!(request.url == '/reg' || request.url == '/log')) {
        return;
    }
    //获取页面参数
    var parms = ''
    qs.on('data', function (str) {
        parms += str.toString();
    })
    qs.on('end', function () {
        //解析前端数据
        parms = qs.parse(parms);
        //获并解析取后台数据
        var localdate = null;
        fs.readFile('./data/user.json', function (err, str) {
            if (err) {
                response.end(JSON.stringify({ "msg": "服务器错误！" }))
                return;
            }
            localdate = JSON.parse(str);
        })
        //判断登录注册
        if (request.url == '/reg') {
            //登录
            var fix = localdate.some(el => el.uname == parms.uname && el.upwd == parms.upwd);
            if (fix) {
                response.end(JSON.stringify({ "msg": "登陆成功！" }))
                return;
            }
            response.end(JSON.stringify({ "msg": "登陆失败！" }))
        }
        else {
            //注册
            var fix = localdate.some(el => el.uname == parms.uname);
            if (fix) {
                response.end(JSON.stringify({ "msg": "用户已注册！" }))
                return;
            }
            localdate.push(parms);
            fs.writeFile('./data/user.json', localdate, function (err) {
                if (err) {
                    response.end(JSON.stringify({ "msg": "服务器错误！" }))
                    return;
                }
                response.end(JSON.stringify({ "msg": "注册成功！" }))
            })
        }
    })
})


//设置监听
server.listen(8081, function () {
    console.log('服务器启动成功！8081')
})