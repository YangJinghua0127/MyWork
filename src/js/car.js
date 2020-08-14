import('../scss/base.scss');
import('../scss/car.scss');
import('../iconfont/font_1872347_bvexw1kxf7c/iconfont.css');
import { delCooki, getCookiAll, setCooki, getCooki } from '../js/lib/cooki.tools';
import './lib/lodash';
const layui = require('layui-layer');



//入口函数
$(function () {
    $.ajax({
        url: 'http://10.41.151.69:8081/api/all',
        type: 'get'
    }).then(function (res) {
        window.onselectstart = new Function("return false");
        //调用事件函数
        addEvt(res);
    })
})

//事件函数
function addEvt(res) {
    /////////广告删除事件
    $('.advCon').children().eq(1).on('click', function () {
        $(this).parent().parent().remove();
    })
    /////////查找cookie 设置用户信息
    if (getCooki('user')) {
        var cooki = JSON.parse(getCooki('user'))
        $('.topCon').children().eq(0).children().eq(0).html(cooki.name + `<span>${'VIP'}</span>`)
        $('.topCon').children().eq(0).children().eq(1).css('display', 'none')
        $('.topCon').children().eq(0).children().eq(2).css('display', 'none')
        $('.topCon').children().eq(0).children().eq(3).css('display', 'block')
        //绑定推出按钮事件
        $('.topCon').children().eq(0).children().eq(3).on('click', function () {
            setCooki('user', '', -1);
            window.open('./car.html', '_self');
        })
        $('.empty').children().eq(0).css('display', 'block')
    } else {
        $('.unlogin').css('display', 'block')
    }
    //购物车事件
    car(res);
}
function car(res) {
    if (getCooki('car') && getCooki('car') != '[]') {
        $('.empty').css('display', 'none');
        $('.buy').css('display', 'block');
        $('.count').css('display', 'block');
        var date = JSON.parse(getCooki('car'));
        //遍历cookie数据
        date.forEach((item, index) => {
            var goodssection = '';
            var shop = '';
            var price = '';
            var limit = '';
            //key 为商品id value为[[数量,颜色,种类]]
            for (var [key, value] of Object.entries(item)) {
                res.goods.forEach(el => {
                    if (el.id == key) {
                        goodssection = el.goodssection;
                        shop = el.shop[0];
                        price = el.price;
                        limit = el.limit;
                    }
                })
                $('.buy').find('dl').append(`<dd><div><p><input type="checkbox" name="selectShop" class="shopbox" id="${key}" checked><label for="${key}">${shop}</label></p><p><em class="icon iconfont icon-kefu"></em><i>在线客服</i></p></div></dd>`);
                //遍历value
                value.forEach((el, index) => {
                    $('.buy').find('dl').eq(0).find('dd').last().append(`<div style="background-color:#fffaf4">
                    <input type="checkbox" name="selectGoods" class="goodsbox ${key}" checked>
                    <img src="./images/goods_${key}_1_1.jpg" alt="">
                    <p>${goodssection}</p>
                    <ul>
                        <li>颜色：${el[1]}</li>
                        <li>版本：${el[2]}</li>
                        <li><i>修改</i><em class="iconfont icon-xiajiantou"></em></li>
                    </ul>
                    <p>${price}</p>
                    <ul>
                        <li><span>-</span><span>${el[0]}</span><span>+</span></li>
                        <li>限购${limit}件</li>
                    </ul>
                    <i>￥${Math.round((price * parseInt(el[0])) * 100) / 100}</i>
                    <ul>
                        <li>删除</li>
                        <li>移入收藏夹</li>
                    </ul>
                </div>`);
                    //绑定删除事件
                    $('.buy').find('dl').eq(0).find('dd').last().find('div').last().find('ul').eq(2).children().eq(0).on('click', function (e) {
                        alert(function () {
                            var id = $(e.currentTarget).parents('dd').children('div:first').children('p:first').children('input').attr('id');
                            var color = $(e.currentTarget).parents('div').eq(0).find('ul').eq(0).children().eq(0).text().split('：')[1];
                            var version = $(e.currentTarget).parents('div').eq(0).find('ul').eq(0).children().eq(1).text().split('：')[1];
                            var cooki = JSON.parse(getCooki('car'));
                            cooki.forEach((item, key) => {
                                if (item[id]) {
                                    item[id].forEach((el, index) => {
                                        if (el[1] == color && el[2] == version) {
                                            item[id].splice(index, 1);
                                            if (item[id].length == 0) {
                                                cooki.splice(key, 1);
                                                if (cooki.length == 0) {
                                                    $('.empty').css('display', 'block');
                                                    $('.buy').css('display', 'none');
                                                    $('.count').css('display', 'none');
                                                    delCooki('car');
                                                    return;
                                                }
                                                $(e.currentTarget).parents('dd').eq(0).remove();
                                            }
                                            $(e.currentTarget).parents('div').eq(0).remove();
                                        }
                                    })
                                }
                            })
                            cooki = JSON.stringify(cooki);
                            setCooki('car', cooki, 1);
                            countall();
                        });
                    })
                    //绑定加减事件
                    $('.buy').find('dl').eq(0).find('dd').last().find('div').last().find('ul').eq(1).children().eq(0).children().on('click', function (e) {
                        var id = $(e.currentTarget).parents('dd').children('div:first').children('p:first').children('input').attr('id');
                        var count = 1;
                        var color = $(e.currentTarget).parents('div').eq(0).find('ul').eq(0).children().eq(0).text().split('：')[1];
                        var version = $(e.currentTarget).parents('div').eq(0).find('ul').eq(0).children().eq(1).text().split('：')[1];
                        var cooki = JSON.parse(getCooki('car'));
                        var price = $(e.currentTarget).parents('ul').eq(0).prev().text();
                        if ($(e.currentTarget).index() == 0) {
                            $(e.currentTarget).next().text(Number($(e.currentTarget).next().text()) - 1);
                            if ($(e.currentTarget).next().text() < 1) {
                                $(e.currentTarget).next().text(1);
                                layui.msg('商品数量不能小于1');
                            } else { layui.msg('减少成功'); }
                            count = $(e.currentTarget).next().text();
                            cooki.forEach((item, index) => {
                                if (item[id]) {
                                    item[id].forEach((el, index) => {
                                        if (el[1] == color && el[2] == version) {
                                            el[0] = count;
                                            $(e.currentTarget).parents('ul').eq(0).next().text(`￥${Math.round((price * count) * 100) / 100}`);
                                        }
                                    })
                                }
                            })
                        } else if ($(e.currentTarget).index() == 2) {
                            $(e.currentTarget).prev().text(Number($(e.currentTarget).prev().text()) + 1);
                            layui.msg('添加成功');
                            count = $(e.currentTarget).prev().text();
                            cooki.forEach((item, index) => {
                                if (item[id]) {
                                    item[id].forEach((el, index) => {
                                        if (el[1] == color && el[2] == version) {
                                            el[0] = count;
                                            $(e.currentTarget).parents('ul').eq(0).next().text(`￥${Math.round((price * count) * 100) / 100}`);
                                        }
                                    })
                                }
                            })
                        }
                        cooki = JSON.stringify(cooki);
                        setCooki('car', cooki, 1);
                        countall();
                    })
                })
            }
        });
        countall();
        select();
    }
    else {
        $('.empty').css('display', 'block');
        $('.buy').css('display', 'none');
        $('.count').css('display', 'none');
    }
}
//计算数值
function countall() {
    var count = 0;
    var cash = 0;
    [...$('.goodsbox')].forEach((el) => {
        if ($(el).prop('checked')) {
            count += Number($(el).parent().find('ul').eq(1).children().eq(0).children().eq(1).text());
            cash += Number($(el).parent().find('i').eq(1).text().slice(1));
        }
    });
    $('.countCon').find('ul').eq(0).find('span').eq(0).text(count);
    $('.countCon').find('ul').eq(0).find('span').eq(1).text(`￥${Math.round(cash * 100) / 100}`);
}
//改变颜色
function color() {
    [...$('.goodsbox')].forEach(el => {
        if ($(el).prop('checked')) {
            $(el).parents('div').eq(0).css('backgroundColor', '#fffaf4');
        } else {
            $(el).parents('div').eq(0).css('backgroundColor', 'white');
        }
    })
}
//勾选函数
function select() {
    $('#selectAllt').on('click', function () {
        if ($(this).prop('checked')) {
            $('.shopbox').prop('checked', true);
            $('.goodsbox').prop('checked', true);
            $('#selectAllb').prop('checked', true);
        } else {
            $('.shopbox').prop('checked', false);
            $('.goodsbox').prop('checked', false);
            $('#selectAllb').prop('checked', false);
        }
        countall();
        color();
    })
    $('#selectAllb').on('click', function () {
        if ($(this).prop('checked')) {
            $('.shopbox').prop('checked', true);
            $('.goodsbox').prop('checked', true);
            $('#selectAllt').prop('checked', true);
        } else {
            $('.shopbox').prop('checked', false);
            $('.goodsbox').prop('checked', false);
            $('#selectAllt').prop('checked', false);
        }
        countall();
        color();
    })
    $('.shopbox').on('click', function () {
        if ($(this).prop('checked')) {
            $(this).parents('dd').find('input.goodsbox').prop('checked', true);
            if ([...$('.shopbox')].every(el => $(el).prop('checked'))) {
                $('#selectAllt').prop('checked', true);
                $('#selectAllb').prop('checked', true);
            }
        } else {
            $(this).parents('dd').find('input.goodsbox').prop('checked', false);
            $('#selectAllt').prop('checked', false);
            $('#selectAllb').prop('checked', false);
        }
        countall();
        color();
    })
    $('.goodsbox').on('click', function () {
        if ($(this).prop('checked')) {
            [...$(this).parents('dd').find('input.goodsbox')].every(el => $(el).prop('checked')) ? $(this).parents('dd').find('input.shopbox').prop('checked', true) : '';
            [...$('.shopbox')].every(el => $(el).prop('checked')) ? ($('#selectAllt').prop('checked', true) && $('#selectAllb').prop('checked', true)) : '';
        }
        else {
            $(this).parents('dd').find('input.shopbox').prop('checked', false);
            $('#selectAllt').prop('checked', false);
            $('#selectAllb').prop('checked', false);
        }
        countall();
        color();
    })
}
//提示函数
function alert(callback) {
    $('.alert').css('display', 'block').stop().animate({ opacity: 1 });
    $('.alertCon').children('span').on('click', function () {
        $('.alert').stop().animate({ opacity: 0 }, function () {
            $('.alert').stop().css('display', 'none');
        });
        $('.alertCon').children('span').off('click');
    })
    $('.alertCon').children('ul').children().eq(2).children().eq(0).on('click', function () {
        callback();
        $('.alert').stop().animate({ opacity: 0 }, function () {
            $('.alert').stop().css('display', 'none');
        });
        $('.alertCon').children('ul').children().eq(2).children().eq(0).off('click');
    })
}