import ('../scss/base.scss');
import ('../scss/register.scss');
import $ from "jquery";
$(function(){
    $('.buttom').children().eq(1).on('click',function(){
        $('.ruler').css('display','none')
    })
})