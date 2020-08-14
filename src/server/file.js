//获取fs模块
const fs = require('fs');
fs.readdir('./', function (err, files) {
    //判断文件夹是否存在
    var path = files.some((item, index) => {
        return item == 'user';
    })
    //存在返回
    if (path) { console.log('文件夹已存在'); return; }
    //不存在创建文件夹
    fs.mkdir('user', function () {
        console.log('文件夹创建成功')
    })
})
//判断文件是否存在
fs.readdir('./user',function(err,files){
    var path = files.some((item,index)=>{
        return item == 'user.json';
    })
    if(path){console.log('文件已存在'); return;}
    fs.writeFile('./user/user.json','[{"uname":"123"}]',function(){})
})
fs.appendFile('./user/user.json','[{"uname":"123"}]',function(err){
    if(!err){
        console.log('文件写入成功')
    }
})
fs.readFile('./user/user.json',function(err,str){
    console.log(str.toString())
})