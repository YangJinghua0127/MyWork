import('../scss/base.scss');
import('../scss/detals.scss');
import('../iconfont/font_1872347_bvexw1kxf7c/iconfont.css');
import { getCookiAll, setCooki, getCooki } from '../js/lib/cooki.tools';
import { MD5 } from './lib/md5.js';
import './lib/lodash';

//入口函数
$(function () {
    window.onselectstart = new Function("return false");
    $.ajax({
        url: 'http://10.41.151.69:8081/api/all',
        type: 'get'
    }).then(function (res) {
        //获取url
        var url = window.location.href.split('?')[1];
        var query = '';
        var index = -1;
        var has = res.goods.some(el => {
            index++;
            query = el.id;
            return MD5(el.id) == url;
        });
        if (has) {
            //插入店铺名称
            $('.shoplogoCon').children().eq(1).text(res.goods[index].shop[0]);
            $('.shopleadCon').children().eq(1).find('i').text(res.goods[index].shop[0]);
            //插入索引
            res.goods[index].index.forEach(el => {
                $('.shopleadCon').children().eq(0).append(`<li>${el}</li><span></span>`)
            });
            $('.shopleadCon').children().eq(0).children().last().remove();
            //插入放大镜图片
            for (var i = 0; i < res.goods[index].img; i++) {
                $('#smallArea').children().eq(0).append(`<li><img src="./images/goods_${query}_${i + 1}_1.jpg"/></li>`);
                if (i == 0) {
                    $('.boxFull').attr('src', `./images/goods_${query}_${i + 1}_2.jpg`)
                    $('#bigImg').attr('src', `./images/goods_${query}_${i + 1}_2.jpg`)
                }
            }
            //插入商品编号
            $('.goodsid').children().eq(0).find('i').text(query);
            //导入商品数据
            $('.mid').find('h2').text(res.goods[index].goodssection);
            $('.mid').children().eq(1).find('span').eq(0).text(`￥${res.goods[index].price}`);
            $('.mid').children().eq(2).children().eq(2).find('span').eq(1).text(res.goods[index].shop[0]);
            res.goods[index].color.forEach((el, index) => {
                $('.mid').children().eq(2).children().eq(3).append(`<div class="${index == 0 ? 'select' : ' '}"><img src="./images/goods_${query}_1_1.jpg" alt=""><p>${el}</p><span></span></div>`);
            })
            res.goods[index].version.forEach((el, index) => {
                $('.mid').children().eq(2).children().eq(4).append(`<div class="${index == 0 ? 'select' : ' '}"><p>${el}</p><span></span></div>`);
            })
            $('.shop').children().eq(0).find('i').text(res.goods[index].shop[0]);
            $('.detals').find('li').eq(0).find('i').text(res.goods[index].goodsname);
            $('.detals').find('li').eq(1).find('i').text(res.goods[index].shop[0]);
            $('.detals').find('li').eq(2).find('i').text(res.goods[index].section.copyright);
            $('.detals').find('li').eq(3).find('i').text(res.goods[index].section.package);
            $('.detals').find('li').eq(4).find('i').text(res.goods[index].section.date);
            $('.detals').find('li').eq(5).find('i').text(res.goods[index].section.storage);
            //调用事件函数
            addEvt(query);
        }
        else {
            $('body').html(JSON.stringify({ msg: "参数错误！" }));
        }
    })
})

//事件函数
function addEvt(query) {
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
            window.open('./index.html', '_self');
        })
    }
    //商品选择及数量切换
    $('.mid').children().eq(2).children().eq(3).find('div').on('click', (e) => {
        $(e.currentTarget).parent().children().removeClass('select');
        $(e.currentTarget).addClass('select');
    })
    $('.mid').children().eq(2).children().eq(4).find('div').on('click', (e) => {
        $(e.currentTarget).parent().children().removeClass('select');
        $(e.currentTarget).addClass('select');
    })
    $('.addcar').children().eq(0).children().on('click', function (e) {
        if ($(e.currentTarget).index() == 1) {
            $(e.currentTarget).prev().text(parseInt($(e.currentTarget).prev().text()) + 1);
            $(e.currentTarget).next().removeClass('disable');
        } else if ($(e.currentTarget).index() == 2) {
            $(e.currentTarget).prev().prev().text((parseInt($(e.currentTarget).prev().prev().text()) - 1) > 1 ? parseInt($(e.currentTarget).prev().prev().text()) - 1 : 1);
            if ($(e.currentTarget).prev().prev().text() == 1) {
                $(e.currentTarget).addClass("disable");
            }
        }
    })
    //点击购买事件
    buy(query);
    //调用放大镜
    tobig(query);
    //类似商品
    likegoods();
    //商品详情切换
    section();
    //购物车刷新
    car();
    alert();
}
//alert事件
function alert() {
    $('.alertCon').find('ul').find('span').on('click', function (e) {
        if ($(e.currentTarget).index() == 0) {
            $('.alert').stop().animate({
                opacity:0
            },function(){$(this).css('display','none')})
        }
        if ($(e.currentTarget).index() == 1) {
            $('.alert').stop().animate({
                opacity:0
            },function(){$(this).css('display','none')})
            window.open('./car.html');
        }
    })
    $('.alertCon').children().eq(2).on('click',function(){
        $('.alert').stop().animate({
            opacity:0
        },function(){$(this).css('display','none')})
    })
}
//购物车刷新
function car() {
    var car = getCooki('car');
    car = JSON.parse(car != undefined ? car : '[]');
    if (car[0] == undefined) { return; }
    $('.car').children().eq(0).text(car.length);
}
//点击购买事件
function buy(res) {
    //绑定点击事件
    $('.addcar').children().eq(1).on('click', function () {
        var goods = getCooki('car');
        goods = JSON.parse(goods != undefined ? goods : '[]');
        var query = res;
        var count = parseInt($('.addcar').children().eq(0).children().eq(0).text());
        var color = $('.mid').find('ul').children().eq(3).find('div.select').find('p').text();
        var version = $('.mid').find('ul').children().eq(4).find('div.select').find('p').text();
        var newdate = {};
        var fix = 0;
        //判断是否存在cooki
        if (goods[0] == undefined) {
            newdate[query] = [[count, color, version]];
            goods.push(newdate);
            //判断视口存在相同id商品]
        } else if (!goods.some((el, index) => { fix = index; return el[query]; })) {
            newdate[query] = [[count, color, version]];
            goods.push(newdate);
            // 判断是否存在相同类型商品
        } else if (!goods[fix][query].some(el => el[1] == color && el[2] == version)) {
            newdate = [count, color, version];
            goods[fix][query].push(newdate);
        } else {
            //相同id和类型商品
            goods[fix][query].forEach((el) => {
                if (el[1] == color && el[2] == version) {
                    el[0] += count;
                }
            })
        }
        goods = JSON.stringify(goods);
        setCooki('car', goods, 1);
        car();
        $('.alert').css('display', 'block').stop().animate({opacity:1});
    })
}
//商品详情
function section() {
    $('.tabCon').children().eq(1).children().eq(0).children().on('click', function (e) {
        $('.tabCon').children().eq(1).children().eq(0).children().removeClass('select');
        $('.tabCon').children().eq(1).children().eq(0).children().eq($(e.currentTarget).index()).addClass('select');
        $('.tabCon').children().eq(1).children().removeClass('select');
        $('.tabCon').children().eq(1).children().eq($(e.currentTarget).index() + 1).addClass('select');
    })
}
//类似商品
function likegoods() {
    let fix = 0;
    function move() {
        fix++;
        if (fix > 2) {
            fix = 0;
        }
        if (fix < 0) {
            fix = 2
        }
        $('.advs').find('ul').children().removeClass('select');
        $('.advs').find('ul').children().eq(fix).addClass('select');
    }
    $('.advs').find('em').on('click', function (e) {
        if ($(e.currentTarget).index() == 2) {
            fix -= 2;
            move();
        }
        else {
            move();
        }
    })
}
//放大镜函数
function tobig(query) {
    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[attr];
        }
        return obj.currentStyle[attr];
    }
    var middleBox = document.querySelector("#middleArea");
    var middleImg = document.querySelector("#middleImg");
    var bigBox = document.querySelector("#bigArea");
    var bigImg = document.querySelector("#bigImg");
    //核心公式  小区域/大区域=小图/大图
    middleImg.onmouseenter = function (evt) {
        var mainBox = document.querySelector(".tobig")
        var e = evt || event;
        var postX = e.pageX - mainBox.offsetLeft - middleImg.offsetLeft - parseInt(getStyle(middleBox, 'width')) / 2;
        var postY = e.pageY - mainBox.offsetTop - middleImg.offsetTop - parseInt(getStyle(middleBox, 'height')) / 2;
        middleBox.style.left = postX + 'px';
        middleBox.style.top = postY + 'px';
        middleBox.style.display = 'block';
        var bet = parseInt(getStyle(bigBox, 'width')) / middleBox.offsetWidth;
        var bigPostX = bet * middleBox.offsetLeft * -1;
        var bigPostY = bet * middleBox.offsetTop * -1;
        bigImg.style.left = bigPostX + 'px';
        bigImg.style.top = bigPostY + 'px';
        bigBox.style.display = 'block';
        document.onmousemove = function (evt) {
            var e = evt || event;
            var postX = e.pageX - mainBox.offsetLeft - middleImg.offsetLeft - parseInt(getStyle(middleBox, 'width')) / 2;
            var postY = e.pageY - mainBox.offsetTop - middleImg.offsetTop - parseInt(getStyle(middleBox, 'height')) / 2;
            if (postX < 0) {
                postX = 0;
            }
            if (postY < 0) {
                postY = 0;
            }
            if (postX >= middleImg.offsetWidth - middleBox.offsetWidth) {
                postX = middleImg.offsetWidth - middleBox.offsetWidth;
            }
            if (postY >= middleImg.offsetHeight - middleBox.offsetHeight) {
                postY = middleImg.offsetHeight - middleBox.offsetHeight
            }
            middleBox.style.left = postX + 'px';
            middleBox.style.top = postY + 'px';
            bigPostX = bet * middleBox.offsetLeft * -1;
            bigPostY = bet * middleBox.offsetTop * -1;
            bigImg.style.left = bigPostX + 'px';
            bigImg.style.top = bigPostY + 'px';
        }
        middleImg.onmouseleave = function () {
            middleImg.onmouseout = document.onmousemove = null;
            middleBox.style.display = 'none';
            bigBox.style.display = 'none';
        }
    }
    $('#smallArea').find('ul').children().on('click', function (e) {
        console.log(e)
        $('#middleImg').find('img').attr('src', `./images/goods_${query}_${$(e.currentTarget).index() + 1}_2.jpg`)
        $('#bigImg').attr('src', `./images/goods_${query}_${$(e.currentTarget).index() + 1}_2.jpg`)
    })
    $('#smallArea').find('em').on('click', function (e) {
        var count = $('#smallArea').find('ul').children().length
        var index = 0;
        if ($(e.currentTarget).index() == 1 && count > 4) {
            index--;
            if (Math.abs > count - 3) {
                index++;
            }
        } else if ($('#smallArea').find('ul').css('left') < 0) {
            index++;
            if (Math.abs > count - 3 && index > 0 && count > 3) {
                index--;
            }
        }
        $('#smallArea').find('ul').stop().animate({ left: 80 * index + 33 });
    })
}