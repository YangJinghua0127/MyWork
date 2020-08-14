const http = require('http');
const url = require('url');

var server = http.createServer((require, response) => {
    response.setHeader('Content-Type', 'application/json;charset=utf-8');
    var urls = url.parse(require.url);
    if (urls.pathname == '/login') {
        var que = urls.query.split('&');
        var user = {};
        for (var i = 0; i < que.length; i++) {
            var que2 = que[i].split('=')
            user[que2[0]] = que2[1];
        }
        if (user.uname == '123' && user.upwd == '123') {
            response.write(JSON.stringify({ 'msg': '登陆成功' }));
        }
        else {
            response.write(JSON.stringify({ 'msg': '用户名或密码错误' }));
        }
    }
    else if (urls.pathname == '/register') {
        var que = urls.query.split('&');
        var user = {};
        for (var i = 0; i < que.length; i++) {
            var que2 = que[i].split('=')
            user[que2[0]] = que2[1];
        }
        response.write(JSON.stringify({ 'msg': '注册成功', user }))
    }
    response.end();
})

server.listen(8081, function () {
    console.log('服务器启动成功')
})