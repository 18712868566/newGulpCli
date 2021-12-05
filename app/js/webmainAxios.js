/*
 * @Author: lixuefeng
 * @Date:   2019-07-15 11:27:25
 * @Last Modified by:   A
 * @Last Modified time: 2021-06-03 13:53:28
 * @File_path:  E:\0_job_progect\20200101_huaer\gulpfile_xiaochu\app\js\webmain$Axios.js
 */
/*===========加载静态资源==========*/
var mainfest = [{}];
let length = mainfest.length;
let images = new Array(); // 定义一个数组容器，用来存储预加载完成的图片
let loadEl = document.querySelector('.loading');

function preloadImg() {
    let count = 0; // 计算器，计算加载了多少图片
    for (let i = 0; i < length; i++) {
        images[i] = new Image();
        images[i].src = `${mainfest[i].src}`;
        // 谷歌浏览器高版本支持大部分ES6，所以这里就不用字符串拼接了。
        images[i].onload = function() {
            count++;
            if (count === length) {
                console.log('加载完成');
                // shuangjie.$pageLoad.addClass('hide').next().removeClass('hide')
                $('.loadingbox').hide();
                AOS.init({
                    easing: 'ease-out-back',
                    duration: 1000
                });

                // 获取预约人数
                setTimeout(function() {
                    Projet_Global_Parameter.getBindPerson();
                }, 1000)
            } else {
                $(".percent").text(`${Math.round(count / length * 100)}`);
            }
        }
    }
}
// preloadImg();
/*==============资源加载完毕===========*/


/*========================Axios====================*/
//当创建实例的时候配置默认配置
var instance = axios.create({
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    //transformRequest是你在data传输前进行数据处理，如果不处理你的数据会显示object.object
    transformRequest: [function(data) {
        // 对 data 进行任意转换处理
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        };
        return ret;
    }]
});

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    var index = layer.load(2, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    layer.closeAll();
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
/* ======================= $axios end ======================= **/


var Projet_Global_Parameter = {
    // 重复点击开关
    bOff: true, // 自定义开关 布尔值
    bEmail: null, // 是否是一个邮箱 布尔值
    upData: null, // url中返回的携带的参数
    aUrlData: [], // 存储url中返回的参数数组
    user_from_uid: '', // 分享参数
    // 补0操作 如果数字为3，则输出0003，不够位数就在之前补足0，
    PrefixInteger: function(num, length) {
        return ("0000000000000000" + num).substr(-length);
    },
    // 获取返回链接的参数对象
    getUrlData: function() {
        url = window.location.href; //获取当前页面的url
        // console.log(url)
        if (url.indexOf('?from_uid') == -1) {
            arr = url;
            // console.log('没找到');
        } else {
            arr = url.split("?")[1].split("&");
            // console.log('找到了');
            var enUrl = decodeURI(url); //解码
            var len = enUrl.length; //获取url的长度值
            var a = enUrl.indexOf("?"); //获取第一次出现？的位置下标
            var b = enUrl.substr(a + 1, len); //截取问号之后的内容
            var c = b.split("&"); //从指定的地方将字符串分割成字符串数组
            var arr = new Array(); //新建一个数组
            for (var i = 0; i < c.length; i++) {
                var d = c[i].split("=")[1]; //从=处将字符串分割成字符串数组,并选择第2个元素
                arr.push(d); //将获取的元素存入到数组中
            }

            return arr;
        }
    },
    resGetUrlData: function() {
        // 浏览器参数,返回数组
        Projet_Global_Parameter.aUrlData = Projet_Global_Parameter.getUrlData();
        if (Projet_Global_Parameter.aUrlData) {
            if (Projet_Global_Parameter.aUrlData[0]) {
                if (typeof(Projet_Global_Parameter.aUrlData[0]) == undefined) {
                    // console.log('没有参数啥也不干');
                    Projet_Global_Parameter.upData = '';
                } else {
                    Projet_Global_Parameter.upData = Projet_Global_Parameter.aUrlData[0];
                    // console.log('看见参数了' + Projet_Global_Parameter.upData)
                }
            }
        };
    },
    // 复制粘贴功能
    tapCopy: function($id) {
        Projet_Global_Parameter.selectText($id);
        document.execCommand('copy');
    },
    //选中文本
    selectText: function(element) {
        var text = document.getElementById(element);
        //做下兼容
        if (document.body.createTextRange) { //如果支持
            var range = document.body.createTextRange(); //获取range
            range.moveToElementText(text); //光标移上去
            range.select(); //选择
        } else if (window.getSelection) {
            var selection = window.getSelection(); //获取selection
            var range = document.createRange(); //创建range
            range.selectNodeContents(text); //选择节点内容
            selection.removeAllRanges(); //移除所有range
            selection.addRange(range); //添加range
            /*if(selection.setBaseAndExtent){
             selection.setBaseAndExtent(text, 0, text, 1);
             }*/
        } else {
            layer.msg('请稍后再试');
        }
    },
    //解决资源换存储问题
    reomvePageCache: function() {
        // 创建一个时间戳
        var timestamp = new Date().getTime();
        // 获取所有img 的 src
        var imgLen = $('img').length;
        // console.log(imgLen)
        for (var i = 0; i < imgLen; i++) {
            var iSrc = $('img').eq(i).attr('src');
            $('img').eq(i).attr({
                src: iSrc + '?timertamp=' + timestamp,
            });
        }

        var jsLen = $('script').length;
        for (var j = 0; j < jsLen; j++) {
            var iJsSrc = $('script').eq(j).attr('src');
            $('script').eq(j).attr({
                src: iJsSrc + '?timertamp=' + timestamp,
            });
        }


        // var cssLen = $('link').length;
        // for (var k = 0; k < cssLen; k++) {
        //     var iCssSrc = $('link').eq(k).attr('href');
        //     $('link').eq(k).attr({
        //         href: iCssSrc + '?timertamp=' + timestamp,
        //     });
        // }
    },
    // 创建动画预约人数
    createPersonNum: function(num) {
        var debugging = num; //自定义数字备用
        var digit;
        var digitHtml = digit = `<div class="digit">
                        <ul>
                            <li>0</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                            <li>0</li>
                        </ul>
                    </div>`;
        // console.log(debugging.length)
        for (let j = 0; j < debugging.length - 1; j++) {
            digit += digitHtml;
        }
        $('.panel').html(digit);

        setInterval(() => {
            var stamp = debugging ? debugging : Date.parse(new Date()) / 1000 | 0;
            stamp = stamp.toString();
            if (stamp.length < debugging.length) {
                stamp = "0".repeat(debugging.length - stamp.length) + stamp;
            }
            for (let i = 0; i < debugging.length; i++) {
                $(".panel .digit:nth-child(" + (i + 1) + ") ul").css('margin-top', "-" + (Number(stamp.charAt(i)) * 75 / 100) + "rem");
            }
        }, 10);
    },
    // 获取文章分类
    getList: async function() {
        var res = await instance.post('/api/common/get-list.html', {
            id: 323,
            pageSize: 9999,
            page: 1
        });
        // console.log(res);
        videoArr = res.data.data.data;

        var newArr = [];
        var len = videoArr.length;

        for (var j = 0; j < len; j++) {
            var index = Math.floor(Math.random() * videoArr.length); //随机下标
            newArr.push(videoArr[index]); //将随机出的元素，存放新数组newArr中去
            videoArr.splice(index, 1); //    将随机出的元素在arr中删除
        }
        //arr中删除随机出的元素,arr.length-1,同时i++,导致循环不会10次,会是5次.最后得到newArr中只有一半的随机数字,arr中剩下另一半. 将其合并到一起,得到res
        newRes = [...newArr, ...videoArr];

        // console.log(newRes)

        for (var i = 0; i < 6; i++) {
            videoHtml += `<div class="v_pic_show" data-num="${newRes[i].id}">
                            <p class="pic_fm"><img class="imgcove" src="${newRes[i].summary}" alt="">
                            <a class="btn_palyvideo btn_show_play" data-url="${newRes[i].contentMessage}"></a></p>

                            <dl>
                                <dt>${newRes[i].title}</dt>
                                <dd>作者:<span>${newRes[i].sub_title}</span></dd>
                            </dl>
                        </div>`;
        };

        $('.user_show').html(videoHtml)
    },
    // 换一换
    getListChange: function(x) {
        var changeArr = [];
        changeArr = newRes.slice(x * 6);
        // console.log(changeArr)
        var newvideoHtml = '';
        var newLen = '';

        if (changeArr.length > 6) {
            newLen = 6;
        } else {
            newLen = changeArr.length;
        }

        for (var j = 0; j < newLen; j++) {
            newvideoHtml += `<div class="v_pic_show">
                            <p class="pic_fm"><img class="imgcove" src="${changeArr[j].summary}" alt="">
                            <a class="btn_palyvideo btn_show_play" data-url="${changeArr[j].contentMessage}"></a></p>

                            <dl>
                                <dt>${changeArr[j].title}</dt>
                                <dd>作者:<span>${changeArr[j].sub_title}</span></dd>
                            </dl>
                        </div>`;
        };

        $('.user_show').html(newvideoHtml);
        maxLan = Math.ceil(newRes.length / 6);
        // console.log('maxLan=='+maxLan)
        new_x = ++x;
        // console.log(new_x)
        if (maxLan > x) {
            $('.updata_show').attr('data-change', new_x);
        } else {
            $('.updata_show').attr('data-change', 0);
        }
    },
    // 校验邮箱
    isEmail: function(strEmail) {
        if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
            return true;
        } else {
            return false;
        }
    },
    // 检查用户信息
    getCheckRoleId: async function(gameId) {
        var res = await instance.get('/first-year/check-role-id', {
            params: {
                user_id: gameId
            }
        });
        console.log(res.data)
    },
    // 获取用户信息
    getUserInfo: async function() {
        var res = await instance.post('/first-year/get-user-info');
        console.log(res.data)
        var data = res.data.data;
        if (res.data.code == 0) {
            // 登陆状态
            sessionStorage.setItem('sess-isLogin', JSON.stringify(true));
            // 分享状态
            sessionStorage.setItem('sess-isShare', JSON.stringify(data.user_info.is_share));
            // 当前积分
            sessionStorage.setItem('sess-left_points', JSON.stringify(data.user_info.left_points));
            // 任务1
            sessionStorage.setItem('sess-today_task_1', JSON.stringify(data.user_info.today_task_1));
            // 任务2
            sessionStorage.setItem('sess-today_task_2', JSON.stringify(data.user_info.today_task_2));
            // 任务3
            sessionStorage.setItem('sess-today_task_3', JSON.stringify(data.user_info.today_task_2));
        }
    },
    // 观看回调
    watchPlay: async function() {
        var res = await instance.post('/first-year/watch');
        console.log(res.data)
        if (res.data.code == 0) {
            console.log('观看回调 - ok')
        }
    },
    // 发奖回调
    presentLott: async function() {
        var res = await instance.post('/first-year/present');
        console.log(res.data)
        if (res.data.code == 0) {
            console.log('发奖回调 - ok')
        }
    },
    // 领积分
    lottFn: async function(type) {
        var res = await instance.post('/first-year/draw', {
            draw_type: type
        });
        console.log(res.data)
        if (res.data.code == 0) {
            if (type == '1') {
                $('.btn_lingqu_fb').removeClass('.btn_lingqu_yes_o').addClass('btn_lingqu_over');
                // 积分+100动画
            }
            if (type == '2') {
                $('.btn_lingqu_share').removeClass('.btn_lingqu_yes_g').addClass('btn_lingqu_over');
                // 积分+200动画

            }
            if (type == '3') {
                $('.btn_lingqu_game').removeClass('.btn_lingqu_yes_o').addClass('btn_lingqu_over');
                // 积分+200动画

            }

            // Projet_Global_Parameter.getUserInfo();  // 更新奖励和进度条
        }



    },
    // 积分兑换
    exchangeFn: async function(id) {
        var res = await instance.post('/first-year/exchange', {
            gift_id: id
        });
        console.log(res.data)
        if (res.data.code == 0) {}

    },
}



/*
 * 接口问题： 
 * 1-获取用户信息少，分享状态 
 * 2-领取奖励状态 0 - 1 - 2
 * 3-加一个奖励列表的接口 或 背包接口
 * 4-晚安电话少个一个提交按钮 和 二次确认弹框 和成功弹框
 */


$(function() {
    // 检查
    Projet_Global_Parameter.getCheckRoleId();
    // 获取用户信息
    Projet_Global_Parameter.getUserInfo();
    // 观看回调
    Projet_Global_Parameter.watchPlay();


    // 领积分1
    $(document).on('click', '.btn_lingqu_fb.btn_lingqu_yes_o', function() {
        Projet_Global_Parameter.lottFn('1')
    })

    // 领积分2
    $(document).on('click', '.btn_lingqu_share.btn_lingqu_yes_g', function() {
        Projet_Global_Parameter.lottFn('2')
    })

    // 领积分3
    $(document).on('click', '.btn_lingqu_game.btn_lingqu_yes_o', function() {
        Projet_Global_Parameter.lottFn('3')
    })


    // 领奖励
    $('.lott-pic.light').on('click', function() {
        var dataImg = $(this).attr('data-img');
        // 领奖动画 == 加入购物车效果

        // 访问领奖接口
        Projet_Global_Parameter.exchangeFn($(this).attr('data-gift-id'));
        // Projet_Global_Parameter.getUserInfo();

    })






})