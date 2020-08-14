//1加载核心模块
var http = require('http');
var date = require('./data/index.json');
//返回server实例
var server = http.createServer();
server.on('request',function(request,response){
    //请求结束
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Content-Type','application/json;charset=utf-8');
    if(request.url=='/'){
        response.write(JSON.stringify(date));
        response.end();
    }
    
})

server.listen(8070,function(){
    console.log('服务器启动成功');
})