import('../scss/base.scss');
import('../scss/login.scss');
import {setCooki,getCooki} from '../js/lib/cooki.tools';
import('../iconfont/font_1872347_bvexw1kxf7c/iconfont.css');
const layui = require('layui-layer');

$(function () {
    //加载事件
    if(getCooki('user'))
    {
        var cooki = JSON.parse(getCooki('user'))
        $('#uname')[0].value = cooki.uname;
        $('#upwd')[0].value = cooki.upwd;
        $('#autolog').prop('checked','true');
        $('.loginTop').children().removeClass('select');
        $('.loginMark').css('display', 'none');
        $('.loginPwd').css('display', 'none');
        $('.loginTop').children().eq(1).addClass('select')
        $('.loginPwd').css('display', 'block');
    }
    //tab切换
    $('.loginTop').children().on('click', function () {
        $('.loginTop').children().removeClass('select');
        $('.loginMark').css('display', 'none');
        $('.loginPwd').css('display', 'none');
        var str = '.' + $(this).attr('data-fix');
        $(this).addClass('select')
        $(str).css('display', 'block');
    })
    //输入事件
    $('input').on('focus', function () {
        $('form').children().eq(0).text('');
    })
    //表单提交事件
    $('form').on('submit', function () {
        var uname = $('#uname')[0].value
        var upwd = $('#upwd')[0].value
        if (uname == '' || upwd == '') {
            $('form').children().eq(0).text('用户名或密码不能为空！');
            return false;
        }
        $.ajax({
            url: 'http://smardove.xyz/serve/login.php',
            type: 'post',
            data: {
                uname,
                upwd
            }
        }).then(function (res) {
            console.log(res)
            if (res.status == '001') {
                $('form').children().eq(0).text(res.res);
                return false;
            }
            else {
                if ($('#autolog').prop('checked') == true) {
                    setCooki('user', JSON.stringify({ uname, upwd,name:res.name }), 10)
                }
                else {
                    setCooki('user', '',-1)
                    setCooki('user', JSON.stringify({ uname, upwd,name:res.name  }))
                }
                layui.msg('登录成功');
                setTimeout(function(){window.open('./index.html','_self')},1000);
            }
        })
        return false;
    })
})