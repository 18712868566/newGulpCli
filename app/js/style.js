/*
 * @Author: A
 * @Date:   2021-06-30 14:08:32
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-11-We 02:10:51
 */

import * as Clipper from './clipper.js';
import {
    GetIMGPath,
    roleName,
    description1,
    description2,
    description3,
    getPath,
    imgLoad,
} from './material.js';

const ISpriteType = {
    role: 0, // 角色
    samllPartA: 1, // 小物件a
    samllPartB: 2, // 小物件b
    captionBg: 3, // 背景
    captionBorder: 4, // 边框
};

console.log(GetIMGPath("__mz__Role", 24, ISpriteType.role), );

Clipper.draw()


const p = new Promise((resolve, reject)=>{
    resolve('xxxx');
})
console.log(p);
$(function() {

    //关闭
    $(document).on("click", "#alertInfo .close,.close,.confirm,.pop-comm .pop_close,.pop_close_maskLayer,.pop_sjz", dialog.closeDiv);

    // 弹出视频
    $(document).on('click', '.btn_play', function(event) {
        event.preventDefault();
        var _thisUrl = $(this).attr('data-url');

        dialog.alertVideo(_thisUrl);
    });

    // 录像机
    setInterval(function() {
        $(".rec-time").html(updataTime())
    }, 1e3);


    // --------------- 侧边栏
    $('#menu_trigger').change(function() {
        if ($(this).prop('checked')) {
            $('#left_menu').addClass('open');
        } else {
            $('#left_menu').removeClass('open');
        }
    });

    // 整体结构
    var swiper_global = new Swiper('#global.swiper-container', {
        direction: 'vertical',
        noSwiping: true,
        keyboard: true, // 设置开启键盘来控制Swiper切换。
        followFinger: false, //跟随手指。如设置为false，手指滑动时slide不会动，当你释放时slide才会切换。
        speed: 800,
        slidesPerView: "auto",
        resizeObserver: true, // 来监测swiper的container大小变化。
        initialSlide: 3,
        mousewheel: true, // 开启鼠标滚轮
        observer: true, // 监听 发生变化时 初始化
        observeParents: true, // 监听 发生变化时 初始化
        observeSlideChildren: true, // 子slide更新时，swiper是否更新。
        on: {
            resize: function() {
                this.update(); //窗口变化时，更新Swiper的一些属性，如宽高等
            }
        }
    });


    // 英雄切换
    argumentsTabs('.hero_list a', '.hero_pic .show', 0);

    // 轮播切换
    argumentsTabs('.lb_piclist .navItem', '.lb_tab_boxc .show', 0);



    // 轮播图
    $('#roundabout_tab1 ul').roundabout({
        easing: "swing",
        btnPrev: ".in1 .ban_r_btn", // 右按钮
        btnNext: ".in1 .ban_l_btn", // 左按钮
        duration: 600, // 运动速度
        minScale: 0.6,
        maxScale: 1,
        autoplay: false, // 自动播放
        autoplayDuration: 5000000, // 自动播放的时间
        minOpacity: 0.4, //最小的透明度
        maxOpacity: 1, //最大的透明度
        reflect: false, // 为true时是从左向右移动，为false从右向左移动
        startingChild: 0, // 默认的显示第几张图片
        autoplayInitialDelay: 50000000, // 从第几秒时，开始自动播放（默认毫秒）开始的第一次管用
        autoplayPauseOnHover: true, // 鼠标移入元素内是否自动播放，为true不播放，false还自动播放
        enableDrag: false // 在移动端可以拖拽播放
    });

    $('#roundabout_tab2 ul').roundabout({
        easing: "swing",
        btnPrev: ".in2 .ban_r_btn", // 右按钮
        btnNext: ".in2 .ban_l_btn", // 左按钮
        duration: 600, // 运动速度
        minScale: 0.6,
        autoplay: false, // 自动播放
        autoplayDuration: 5000000, // 自动播放的时间
        minOpacity: 0.4, //最小的透明度
        maxOpacity: 1, //最大的透明度
        reflect: false, // 为true时是从左向右移动，为false从右向左移动
        startingChild: 0, // 默认的显示第几张图片
        autoplayInitialDelay: 50000000, // 从第几秒时，开始自动播放（默认毫秒）开始的第一次管用
        autoplayPauseOnHover: true, // 鼠标移入元素内是否自动播放，为true不播放，false还自动播放
        enableDrag: false // 在移动端可以拖拽播放
    });


    var moveForce = 50; // max popup movement in pixels
    var rotateForce = 18; // max popup rotation in deg

    $(".page3,.page4").mousemove(function(e) {
        var docX = $(document).width();
        var docY = $(document).height();

        var moveX = (e.pageX - docX / 2) / (docX / 2) * -moveForce;
        var moveY = (e.pageY - docY / 2) / (docY / 2) * -moveForce;

        var rotateY = (e.pageX / docX * rotateForce * 2) - rotateForce;
        var rotateX = -((e.pageY / docY * rotateForce * 2) - rotateForce);

        $('.popup')
            .css('left', moveX / 100 + 'rem')
            .css('top', moveY / 100 + 'rem')
            .css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');

        $('.hero_box h2,.hero_box h3')
            .css('left', moveX / 100 + 'rem')
            .css('top', (moveY + 80) / 100 + 'rem')
            .css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)')
            .css("transition", "transform 0.2s");


        $('.exhibition_hall')
            .css('left', moveX / 100 + 'rem')
            .css('top', moveY / 100 + 'rem')
            .css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');

        $('.lb_piclist .navItem')
            .css('left', moveX / 100 + 'rem')
            .css('top', moveY / 100 + 'rem')
            .css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');

        $('.lb_piclist .after')
            .css('left', moveX / 100 + 'rem')
            .css('top', (moveY+120) / 100 + 'rem')
            .css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');

        $('.popup,.popup_before')
            .css('left', (moveX+700) / 100 + 'rem')
            .css('top', (moveY+500) / 100 + 'rem')
            .css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
    });

});

// 时钟
function check(val) {
    if (val < 10) {
        return ("0" + val);
    } else {
        return (val);
    }
}

function updataTime() {
    let date = new Date();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();

    timestr = check(hour) + ":" + check(minutes) + ":" + check(second);

    $('.rec-time').html(timestr)
}

// let hhmmss = updataTime();
// console.log(hhmmss)


// 滚动时添加
$(window).scroll(function() {
    var scrollT = $(window).scrollTop()
    scrollT = parseInt(scrollT);

    // console.log(scrollT);
    if ($('.topbg')) {
        $('.topbg').stop().animate({
            top: -scrollT
        }, 30);
    }
});


function argumentsTabs(tabList, tabbox, index = 0) {
    // $(tabList + ":first-child").removeClass('curr').addClass('curr')
    console.log('index==' + index)
    var $div_li = $(tabList);
    $div_li.click(function() {
        $(this).addClass('curr').siblings().removeClass('curr');
        // var index = $div_li.index(this);
        var index = $div_li.index(this);
        // console.log('a')
        console.log('index-===' + index)
        $(tabbox).eq(index).addClass("curr").show().siblings().removeClass("curr").hide();
        // $(tabbox).eq(index).addClass("curr").stop().animate({opacity:1},"360").siblings().removeClass("curr").stop().animate({opacity:0},"360");
        //var h =$(tabbox).eq(index).offset().top;
        //$( "html,body").animate({ "scrollTop" : h },300);  //滚动到指定位置
        // 跟随横条
        // var $height = $('.flList .flListText').outerHeight(true);
        // $(this).siblings('.curr_triangle').stop().animate({'top': (index*$height)},"88");
    }).eq(index).click();
};