import('../scss/base.scss');
import('../scss/register.scss');
import '../js/lib/lodash';
import './lib/gVerify';
import { ajax, type, data } from 'jquery';
const layui = require('layui-layer');
//生成验证码
const verifyCode = new GVerify("check");
$(function () {
    //协议事件
    $('.buttom').children().eq(1).on('click', function () {
        $(this).parent().parent().parent().remove();
    })
    var test = new Test();
    test.listen();
})

//表单验证对象
class Test {
    test(item) {
        switch ($(item).attr('id')) {
            case 'regname':
                var reg = /.+/;
                if (!reg.test($('#regname').val())) {
                    $('#regname').prev().text('请输入昵称');
                }
                break;
            case 'reguname':
                var reg = /\w{6,}/;
                if (!reg.test($('#reguname').val())) {
                    $('#reguname').prev().text('用户名只能为数字字母下划线!');
                }
                break;
            case 'regupwd':
                var reg = /^.{8,16}$/;
                if (!reg.test($('#regupwd').val())) {
                    $('#regupwd').prev().text('密码为8~16位!');
                }
                break;
            case 'regrupwd':
                if ($('#regrupwd').val() != $('#regupwd').val()) {
                    $('#regrupwd').prev().text('两次输入密码不一致!');
                }
                break;
            case 'regphone':
                var reg = /^\d{11}$/;
                if (!reg.test($('#regphone').val())) {
                    $('#regphone').prev().text('手机号不合法!');
                }
                break;
            case 'regtest':
                if (!verifyCode.validate($('#regtest').val())) {
                    $('#regtest').prev().text('验证码错误!');
                    verifyCode.refresh();
                }
                break;
            default:
                var reg = /.+/;
                if (!reg.test($('#regname').val())) {
                    $('#regname').prev().text('请输入昵称');
                    $('#regname')[0].fix = false;
                }
                else {
                    $('#regname')[0].fix = true;
                }
                reg = /\w{6,}/;
                if (!reg.test($('#reguname').val())) {
                    $('#reguname').prev().text('用户名只能为数字字母下划线!');
                    $('#reguname')[0].fix = false;
                } else {
                    $('#reguname')[0].fix = true;
                }
                reg = /^.{8,16}$/;
                if (!reg.test($('#regupwd').val())) {
                    $('#regupwd').prev().text('密码为8~16位!');
                    $('#regupwd')[0].fix = false;
                } else {
                    $('#regupwd')[0].fix = true;
                }
                if ($('#regrupwd').val() != $('#regupwd').val()) {
                    $('#regrupwd').prev().text('两次输入密码不一致!');
                    $('#regrupwd')[0].fix = false;
                } else {
                    $('#regrupwd')[0].fix = true;
                }
                reg = /^\d{11}$/;
                if (!reg.test($('#regphone').val())) {
                    $('#regphone').prev().text('手机号不合法!');
                    $('#regphone')[0].fix = false;
                } else {
                    $('#regphone')[0].fix = true;
                }
                if (!verifyCode.validate($('#regtest').val())) {
                    $('#regtest').prev().text('验证码错误!');
                    verifyCode.refresh();
                    $('#regtest')[0].fix = false;
                } else {
                    $('#regtest')[0].fix = true;
                }
                break;
        }
    }
    listen() {
        $('.userdata').on('focus',function(e){
            $(e.currentTarget).prev().text(' ')
            $('#sub').prev().text(' ');
        })
        $('.userdata').on('blur',function(e){
            this.test(e.currentTarget);
        }.bind(this))
        $('#fof').on('submit',function(){
            this.test();
            if([...$('.userdata')].every(el=>el.fix == true)){
                $.ajax({
                    url:'http://smardove.xyz/serve/register.php',
                    type:'post',
                    data:{
                        uname: $('#reguname').val(),
                        upwd:$('#regupwd').val(),
                        name:$('#regname').val(),
                        uphone: $('#regphone').val()
                    }
                }).then(function(e){
                    console.log(e)
                    if(e.status == '002'){
                        layui.msg('用户名已注册!');
                    }
                    else{
                        layui.msg('注册成功');
                        setTimeout(function(){window.open('./login.html','_self');},1000)
                    }
                })
            }
            else{
                console.log('注册失败');
                verifyCode.refresh();
            }
            return false;
        }.bind(this))
    }
}