//获取调用url
const url = require('url');
//调用http
const http = require('http');
//获取服务器数据
const msg = []
//开启服务
var server = http.createServer((request, response) => {
    //设置相应头
    response.setHeader('Content-Type', 'application/json;charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin','*');
    //获取url
    var urlPath = url.parse(request.url, true);
    // 判断是注册还是登录
    if (urlPath.pathname == '/reg') {
        //    注册
        // 数据比较相同返回已注册，不同返回注册成功
        var fix = msg.some((item, imdex) => {
            return item.uname == urlPath.query.uname;
        })
        if (fix) {
            response.end(JSON.stringify({ "msg": "用户已注册！" }))
            return;
        }
        //插入新数据
        msg.push(urlPath.query);
        response.end(JSON.stringify({ "msg": "注册成功！" }))
    }
    else if (urlPath.pathname == '/log') {
        //    登录
        //获取后台数据
        //数据比较相同返回登录成功，不同返回登陆失败
        var fix = msg.some((item, imdex) => {
            return item.uname == urlPath.query.uname && item.upwd == urlPath.query.upwd;
        })
        if (fix) {
            response.end(JSON.stringify({ "msg": "登录成功！" }))
            return;
        }
        response.end(JSON.stringify({ "msg": "用户名或密码错误！" }))
    }
    response.end();
})

//设置监听
server.listen(8081, function () {
    console.log('服务器启动成功！');
})