import('../scss/base.scss');
import('../scss/index.scss');
import('../iconfont/font_1872347_bvexw1kxf7c/iconfont.css');
import { getCookiAll, setCooki, getCooki } from '../js/lib/cooki.tools';
import './lib/lodash';
import { MD5 } from './lib/md5.js';

$(function () {
    //阿贾克斯请求数据
    $.ajax({
        url: 'http://10.41.151.69:8081/api/all',
        type: 'get'
    }).then(function (res) {
        loadin(res);
        addEvt();
        search(res);
        //开启所有轮播图
        scrollMesage();
        car();
        var banner = new ScrollPage();
        banner.init($('.bannerImg').children().eq(0), $('.bannerImg').children().eq(1), $('.bannerImg > em'), [$('.banner'), res.color]).clicks().run();
        var banner2 = new ScrollPage();
        banner2.init($('.mid').eq(0).children().eq(0), $('.mid').eq(0).children().eq(1), $('.mid').eq(0).find("em")).clicks().run();
        var banner3 = new ScrollPage();
        banner3.init($('.mid').eq(1).children().eq(0), $('.mid').eq(1).children().eq(1), $('.mid').eq(1).find("em")).clicks().run();
        var banner4 = new ScrollPage();
        banner4.init($('.mid').eq(2).children().eq(0), $('.mid').eq(2).children().eq(1), $('.mid').eq(2).find("em")).clicks().run();
        var banner5 = new ScrollPage();
        banner5.init($('.mid').eq(3).children().eq(0), $('.mid').eq(3).children().eq(1), $('.mid').eq(3).find("em")).clicks().run();
        var banner6 = new ScrollPage();
        banner6.init($('.mid').eq(4).children().eq(0), $('.mid').eq(4).children().eq(1), $('.mid').eq(4).find("em")).clicks().run();
        var banner7 = new ScrollPage();
        banner7.init($('.mid').eq(5).children().eq(0), $('.mid').eq(5).children().eq(1), $('.mid').eq(5).find("em")).clicks().run();
        var banner8 = new ScrollPage();
        banner8.init($('.mid').eq(6).children().eq(0), $('.mid').eq(6).children().eq(1), $('.mid').eq(6).find("em")).clicks().run();
        var change1 = new Change();
        change1.init($('.leadF1').find('h2').find('ul'), $('.leadF1').children().eq(2)).listen();
        var change2 = new Change();
        change2.init($('.leadF2').find('h2').find('ul'), $('.leadF2').children().eq(2)).listen();
        var change3 = new Change();
        change3.init($('.leadF3').find('h2').find('ul'), $('.leadF3').children().eq(2)).listen();
        var change4 = new Change();
        change4.init($('.leadF4').find('h2').find('ul'), $('.leadF4').children().eq(2)).listen();
        var change5 = new Change();
        change5.init($('.leadF5').find('h2').find('ul'), $('.leadF5').children().eq(2)).listen();
        var change6 = new Change();
        change6.init($('.leadF6').find('h2').find('ul'), $('.leadF6').children().eq(2)).listen();
        var change7 = new Change();
        change7.init($('.leadF7').find('h2').find('ul'), $('.leadF7').children().eq(2)).listen();
        $('body').css('opacity', '1');
    })
})
//数据导入函数
function loadin(res) {
    //广告如片导入
    $('.adv').html(`<div class="advCon con" draggable="false"><img src="./images/${res.pageindex.adv}" alt=""><span>X</span></div>`)
    //top区域
    $('.topCon').html(`<p>
    <a href="javascript:void(0)">${res.pageindex.top[0]}<em class="icon iconfont icon-sanjiaoxia"></em></a>
    <a href="./login.html">${res.pageindex.top[1]}</a>
    <a href="./register.html">${res.pageindex.top[2]}</a>
    <a href="javascript:void(0)">${res.pageindex.top[3]}</a>
    </p>
    <ul>
    <li><a href="javascript:void(0)">${res.pageindex.top[4]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.top[5]}<em class="icon iconfont icon-sanjiaoxia"></em></a></li>
    <li>
        <a href="javascript:void(0)">${res.pageindex.top[6]}<em class="icon iconfont icon-sanjiaoxia"></em></a>
        <div class="lev2">
            <img src="./images/${res.pageindex.top[7]}" alt="">
        </div>
    </li>
    <li><a href="javascript:void(0)">${res.pageindex.top[8]}<em class="icon iconfont icon-sanjiaoxia"></em></a></li>
    <li><a href="javascript:void(0)">${res.pageindex.top[9]}<em class="icon iconfont icon-sanjiaoxia"></em></a></li>
    <li><a href="javascript:void(0)">${res.pageindex.top[10]}<em class="icon iconfont icon-sanjiaoxia"></em></a></li>
    </ul>`)
    //固定导航栏
    $('.fixleadCon').html(` <div>${res.pageindex.fixlead[0]}<em class="iconfont icon-changyongicon-"></em>
    <ul class="bannerNavfix">
    </ul>
    </div>
    <p><span>${res.pageindex.fixlead[1]}<em class="icon iconfont icon-xiangxia"></em></span><input type="text"><i>${res.pageindex.fixlead[2]}</i></p>`);
    //logo区域
    $('.logoCon').html(`<h1><img src="./images/${res.pageindex.logo[0]}" alt=""></h1>
    <div class="search">
        <p><span>${res.pageindex.logo[1]}<em class="icon iconfont icon-xiangxia"></em></span><input type="text" id="search"><i>${res.pageindex.logo[2]}</i></p>
        <ul>
            <li><a href="javascript:void(0)">${res.pageindex.logo[3]}</a></li>
            <li><a href="javascript:void(0)">${res.pageindex.logo[4]}</a></li>
            <li><a href="javascript:void(0)">${res.pageindex.logo[5]}</a></li>
            <li><a href="javascript:void(0)">${res.pageindex.logo[6]}</a></li>
            <li><a href="javascript:void(0)">${res.pageindex.logo[7]}</a></li>
            <li><a href="javascript:void(0)">${res.pageindex.logo[8]}</a></li>
            <li><a href="javascript:void(0)">${res.pageindex.logo[9]}</a></li>
            <li><a href="javascript:void(0)">${res.pageindex.logo[10]}</a></li>
        </ul>
        <div class="searchBox">
            <ul>
            </ul>
            <p><span>${res.pageindex.logo[11]}</span></p>
        </div>
    </div>
    <a href="./car.html" class="car">
        <span>0</span>
        <em class="icon iconfont icon-gouwuche"></em>
        <i>${res.pageindex.logo[12]}</i>
        <em class="icon iconfont icon-sanjiaoxia"></em>
    </a>`);
    //nav区域
    $('.navCon').html(`<ul>
    <li><a href="javascript:void(0)">${res.pageindex.nav[0]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[1]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[2]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[3]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[4]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[5]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[6]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[7]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[8]}</a></li>
    <li><a href="javascript:void(0)">${res.pageindex.nav[9]}</a></li>
    </ul>
    <div class="section">
    <ul class="navScro">
        <li><a href="javascript:void(0)">${res.pageindex.nav[10]}</a></li>
        <li><a href="javascript:void(0)">${res.pageindex.nav[11]}</a></li>
    </ul>
    <ol>
        <li><em class="icon iconfont icon-shangjiantou"></em></li>
        <li><em class="icon iconfont icon-xiajiantou"></em></li>
    </ol>
    </div>`);
    //banner区域 二级导航！
    res.pageindex.bannerNav.forEach((el, index) => {
        $('.bannerNav').append('<li></li>');
        el.lev1.forEach(el => { $('.bannerNav').find('> li').last().append(`<a href="javascript:void(0)">${el}</a>`) });
        $('.bannerNav').find('> li').last().append(`
        <div class="navoli navoli-${index + 1}">
        <div class="left fl">
            <ul class="leftTop clearBoth"></ul>
            <div class="leftBtn"></div>
        </div>
        <div class="right fr"><ul class="rightTop clearBoth"></ul></div>
        </div>`);
        el.lev2.leftTop.forEach(el => {
            $(`.navoli-${index + 1}`).find('ul.leftTop').append(`<li><a href="javascript:void(0)"><span>${el}</span><em class="iconfont icon-changyongicon-1"></em></a></li>`);
        });
        for (var [indexin, item] of Object.entries(el.lev2.leftBtn)) {
            $(`.navoli-${index + 1}`).find('div.leftBtn').append(` <ul class="clearBoth"><span>${indexin}</span></ul>`);
            item.forEach(el => { $(`.navoli-${index + 1}`).find('div.leftBtn').find('ul').last().append(`<li><a href="javascript:void(0)">${el}</a></li>`) });
        };
        el.lev2.right.rightTop.forEach(el => { $(`.navoli-${index + 1}`).find('ul.rightTop').append(`<li><a href="javascript:void(0)"><img src="./images/${el}" alt=""></a></li>`) });
        $(`.navoli-${index + 1}`).find('div.right').append(`<img src="./images/${el.lev2.right.rightBtn[0]}" alt="">`)
    })
    //拷贝二级导航栏
    $('.bannerNavfix').append($('.bannerNav').children().clone());
    //固定导航栏
    for (var [index, item] of Object.entries(res.pageindex.lead)) {
        $('.lead').html(`<h2>${index}</h2><ul></ul>`);
        for (var [indexin, item] of Object.entries(item)) {
            $('.lead').find('ul').append(`<li class="focus" id="leadF${indexin[0]}"><p>${indexin}</p><p>${item}</p><span></span></li>`);
        };
    };
    $('.lead').find('ul').append(`<li id="toTop"><em class="iconfont icon-shangjiantou"></em></li><li id="toBtn"><em class="iconfont icon-xiajiantou"></em></li>`);
    //banner图插入
    res.pageindex.bannerImg.forEach((el, index) => {
        if (!index) {
            $('.bannerImg').find('ul').append(`<li class="select"><img src="./images/${el}" alt=""></li>`);
            $('.bannerImg').find('ol').append(`<li class="select"></li>`);
        } else {
            $('.bannerImg').find('ul').append(`<li ><img src="./images/${el}" alt=""></li>`);
            $('.bannerImg').find('ol').append(`<li ></li>`);
        }
    })
    //news区域
    res.pageindex.news.forEach((el, index) => {
        if (index == 0) {
            $('.news').find('p').append(`${el[0]}<span>${el[1]}<em class="icon iconfont icon-changyongicon-1"></em></span>`);
        }
        if (index == 1) {
            el.ul.forEach((el, index) => {
                var dt = el.split('|');
                $('.news').find('ul').eq(0).append(`<li><span>${dt[0]}</span><a href="javascript:void(0)">${dt[1]}</a></li>`);
            })
        }
        if (index == 2) {
            for (var [indexin, item] of Object.entries(el)) {
                $('.news').find('ul').eq(1).append(`<li><a href="javascript:void(0)"><img src="./images/${indexin}" alt=""><span>${item}</span></a></li>`);
            }
        }
        if (index == 3) {
            $('.news_btn').append(`<h2>${el.div[1]}</h2>`)
            $('.news_btn').append(`<h3>${el.div[2]}</h3>`)
            $('.news_btn').append(`<img src="./images/${el.div[0]}" alt="">`)
        }
    })
    //buy区域
    for (var [index, item] of Object.entries(res.pageindex.buy)) {
        item.forEach((el, indexin) => {
            if (index == 'buyBrabox') {
                indexin < 2 ? $('.buyBrabox').find('.left').append(`<a href="javascript:void(0)"><img src="./images/${el}" alt=""></a>`) : $('.buyBrabox').find('.right').append(`<a href="javascript:void(0)"><img src="./images/${el}" alt=""></a>`);
            } else {
                $(`.${index}`).append(`<a href="javascript:void(0)"><img src="./images/${el}" alt=""></a>`)
            }
        })
    }
    //tic区域
    $('.tick').append(`<a href="javascript:void(0)"><img src="./images/${res.pageindex.tic[0]}" alt=""></a>`)
    //maylike区域
    $('.mayLike').append(`<h2></h2><ul></ul>`);
    for (var [index, item] of Object.entries(res.pageindex.mayLike)) {
        if (index == 'title') {
            $('.mayLike').find('h2').html(`${item[0]} <span>${item[1]}</span><em class="iconfont icon-changyongicon-1"></em><em class="iconfont icon-changyongicon-2"></em>`);
        } else {
            if(index == 1){$('.mayLike').find('ul').append('<li class="select"></li>');}
            else{$('.mayLike').find('ul').append('<li></li>');}
            item.forEach((el, indexin) => {
                $('.mayLike').find('ul').find('li').last().append(`<a href="javascript:void(0)"><img src="./images/index_youlike_${index}_${indexin + 1}.jpg" alt=""><p>${el.split('|')[0]}</p><i>${el.split('|')[1]}</i></a>`);
            })
        }
    }
}
//搜索事件
function search(res) {
    $('#search').on('focus', function () {
        $('.searchBox').css('display', 'block');
    })
    $('.searchBox').find('p').children().on('click', function () {
        $('.searchBox').css('display', 'none');
    })
    $('#search').on('input', _.debounce(function () {
        var key = $('#search').val()
        $('.searchBox').find('ul').html(' ');
        res.goods.forEach((el, index) => {
            if (el.goodsname.indexOf(key) != -1 && key != '') {
                $('.searchBox').find('ul').append(`<li class="${el.id}"><i>${el.goodsname}</i><span>${el.shop[0]}</span></li>`)
                $('.searchBox').find('ul').find('li').last().on('click', function (e) {
                    $('.searchBox').css('display', 'none');
                    window.open(`./detals.html?${MD5($(e.currentTarget).attr('class'))}`)
                })
            }
        });
    }, 400))
}
//购物车刷新
function car() {
    var car = getCooki('car');
    car = JSON.parse(car != undefined ? car : '[]');
    if (car[0] == undefined) { return; }
    $('.car').children().eq(0).text(car.length);
}
//政务信息速递轮播图
function scrollMesage() {
    $('.navScro').children().eq(0).clone().appendTo($('.navScro'));
    var fix = -1;
    let timer = setInterval(move, 2000);
    function move() {
        fix++;
        if (fix == 3) {
            fix = 1;
            $('.navScro').css('top', 0)
        }
        else if (fix < 0) {
            fix = 1;
            $('.navScro').css('top', -80)
        }
        $('.navScro').stop().animate({ top: -fix * 40 }, 600)
    }
    //鼠标点击事件
    $('.section').find('ol').children().on('click', function (e) {
        clearInterval(timer);
        fix += $(e.currentTarget).index() == 0 ? -2 : 0;
        move();
        timer = setInterval(move, 2000);
    })
}
//banner轮播图
class ScrollPage {
    constructor() {
        this.item = null
        this.page = 0;
        this.dot = null;
        this.fixed = -1;
        this.background = null;
    }
    init(bigImg, dot, click, back) {
        this.item = bigImg;
        this.page = bigImg.children().length;
        this.dot = dot;
        this.click = click;
        this.background = back;
        return this;
    }
    backc() {
        if (this.background == null) {
            return;
        }
        this.background[0].css('backgroundColor', '#' + this.background[1][this.fixed])
    }
    clicks() {
        this.click.eq(0).on('click', function () {
            clearInterval(this.item.timer);
            this.fixed -= 2
            this.move();
            this.item.timer = setInterval(this.move.bind(this), 3000);
        }.bind(this))
        this.click.eq(1).on('click', function () {
            clearInterval(this.item.timer);
            this.move();
            this.item.timer = setInterval(this.move.bind(this), 3000);
        }.bind(this))
        this.dot.children().hover(function (e) {
            clearInterval(this.item.timer);
            this.dot.children().removeClass('select');
            $(e.currentTarget).addClass('select');
            this.fixed = $(e.currentTarget).index() - 1;
            this.move();
            this.item.timer = setInterval(this.move.bind(this), 3000);
        }.bind(this))
        return this;
    }
    run() {
        clearInterval(this.item.timer);
        this.item.timer = setInterval(this.move.bind(this), 3000);
    }
    move() {
        this.fixed++;
        if (this.fixed == this.page) {
            this.fixed = 0;
        }
        else if (this.fixed < 0) {
            this.fixed = this.page - 1;
        }
        //排他
        $(this.item).children().removeClass('select').css('zIndex', 0);
        $(this.dot).children().removeClass('select');
        $(this.item).children().eq(this.fixed).addClass('select').css('zIndex', 1);
        $(this.dot).children().eq(this.fixed).addClass('select');
        this.backc();
    }
}
//tab栏切换
class Change {
    constructor() {
        this.tabTop = null;
        this.tabBtn = null;
        this.dot = null;
        this.index = 0;
    }
    init(tabTop, tabBtn, dot) {
        this.tabTop = tabTop;
        this.tabBtn = tabBtn;
        this.dot = dot;
        return this;
    }
    listen() {
        this.tabTop.children().hover(function (e) {
            this.tabTop.children().removeClass('select');
            $(e.currentTarget).addClass('select');
            this.index = $(e.currentTarget).index();
            this.tabBtn.children().removeClass('select');
            this.tabBtn.children().eq(this.index + 1).addClass('select');
        }.bind(this))
        this.tabBtn.children().eq(0).on('click', function () {
            this.index++;
            if (this.index == this.tabTop.children().length) {
                this.index = 0;
            }
            this.tabTop.children().removeClass('select');
            this.tabTop.children().eq(this.index).addClass('select');
            this.tabBtn.children().removeClass('select');
            this.tabBtn.children().eq(this.index + 1).addClass('select');
        }.bind(this))
    }
}
//事件函数
function addEvt() {
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
    //////////侧边栏定位
    $('.lead').css('left', $('.bannerNav').offset().left + 110);
    $(window).resize(function () {
        $('.lead').css('left', $('.topCon').offset().left - 80);
    })
    //侧边栏事件绑定
    $('.lead').children().eq(1).children().on('click', function (e) {
        //滚动到最上部
        if ($(e.currentTarget).attr('id') == 'toTop') {
            $('html').animate({ scrollTop: 0 }, 700)
        }
        //滚动到最下部
        else if ($(e.currentTarget).attr('id') == 'toBtn') {
            $('html').animate({ scrollTop: $(document).height() - $(window).height() }, 700)
        }
        //滚动到对应楼层
        $('html').animate({ scrollTop: $('.' + $(e.currentTarget).attr('id')).offset().top - 50 }, 700)
    })
    //滚动条事件
    $(window).scroll(_.throttle(function () {
        $('.lead').css('left', $('.topCon').offset().left - 80);
        if ($(window).scrollTop() > 1000 && $(window).scrollTop() < $(document).height() - 1200) {
            $('.lead').css('display', 'block')
        }
        else {
            $('.lead').css('display', 'none')
        }
        if ($(window).scrollTop() > 1000) {
            $('.fixlead').css('display', 'block')
        }
        else {
            $('.fixlead').css('display', 'none')
        }
        $('.lead').children().eq(1).children().removeClass('focus');
        if (($('.leadF1').offset().top - $(window).scrollTop()) < 400 && ($('.leadF1').offset().top - $(window).scrollTop()) > -150) {
            $('.lead').children().eq(1).children().eq(0).addClass('focus');
        }
        else if (($('.leadF2').offset().top - $(window).scrollTop()) < 400 && ($('.leadF2').offset().top - $(window).scrollTop()) > -150) {
            $('.lead').children().eq(1).children().eq(1).addClass('focus');
        }
        else if (($('.leadF3').offset().top - $(window).scrollTop()) < 400 && ($('.leadF3').offset().top - $(window).scrollTop()) > -150) {
            $('.lead').children().eq(1).children().eq(2).addClass('focus');
        }
        else if (($('.leadF4').offset().top - $(window).scrollTop()) < 400 && ($('.leadF4').offset().top - $(window).scrollTop()) > -150) {
            $('.lead').children().eq(1).children().eq(3).addClass('focus');
        }
        else if (($('.leadF5').offset().top - $(window).scrollTop()) < 400 && ($('.leadF5').offset().top - $(window).scrollTop()) > -150) {
            $('.lead').children().eq(1).children().eq(4).addClass('focus');
        }
        else if (($('.leadF6').offset().top - $(window).scrollTop()) < 400 && ($('.leadF6').offset().top - $(window).scrollTop()) > -150) {
            $('.lead').children().eq(1).children().eq(5).addClass('focus');
        }
        else if (($('.leadF7').offset().top - $(window).scrollTop()) < 400 && ($('.leadF7').offset().top - $(window).scrollTop()) > -150) {
            $('.lead').children().eq(1).children().eq(6).addClass('focus');
        }
    }, 200))
    //youlike模块事件
    $('.mayLike').children().eq(0).find('em').on('click', function () {
        $('.mayLike').find('ul').children().toggleClass('select');
    })
}