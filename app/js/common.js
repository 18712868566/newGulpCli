/*wlo:Cflower*/
var logg = null;
var dialog;
if (!dialog) dialog = {};
var flagPC = true;
dialog = {
    //关闭  document.location.reload()
    closeDiv: function() {
        $("body").css("position", "relative");
        $("#alertInfo").stop(true, true).animate({
            "top": "-100%",
            "opacity": "0"
        }, "fast", function() {
            $("#maskLayer,#alertInfo").remove().hide();
            $('.wrap').removeClass('row');
            $('.yqh').hide();

            setTimeout(function() {
                // 获得奖励弹框
                istureZunj = 0;
            }, 500);
        });
    },
    //
    maskLayer: function() {
        $("#maskLayer,#alertInfo").remove();
        var maskLayer = "<div id='maskLayer'></div>";
        var alertInfo = "<div id='alertInfo'><span class='close'>关闭</span></div>";
        $("body").append(maskLayer, alertInfo);
        $('.wrap').addClass('row');
        $("#maskLayer").height('100%').show();
    },
    //显示提示信息框
    showInfo: function(alertHtml) {
        dialog.maskLayer();
        // $("body").css({'position':'fixed','width':'100%'});
        var _winH = $(window).height(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
        var _scrollTop = $(document).scrollTop(); //　　　　　　　　　　　      ├→
        $("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
        var _thisDomWidth = $("#alertInfo").outerWidth();
        var _thisDomHeight = $("#alertInfo").outerHeight();
        var topD = parseInt(_scrollTop + (_winH - _thisDomHeight) / 2);
        var mL = parseInt(_thisDomWidth / 2);
        if (_thisDomHeight >= _winH) {
            topD = _scrollTop;
            if (_scrollTop + _thisDomHeight >= $(document).height()) {
                topD = $(document).height() - _thisDomHeight;
            };
            $("#alertInfo").css("position", "absolute");
        } else {
            topD = (_winH - _thisDomHeight) / 2;
            $("#alertInfo").css("position", "fixed");
        };
        $("#alertInfo").css({
            "margin-left": "-" + mL + "px"
        }).stop(true, true).animate({
            "top": topD + "px",
            "margin-left": "-" + mL + "px",
            "opacity": "1"
        }, "fast");
    },
    //改变窗口大小时改变弹出层的位置
    alertInfoPo: function() {
        var _winHResize = $(window).height();
        var _scrollTopResize = $(document).scrollTop();
        var _thisDomWidthResize = $("#alertInfo").outerWidth();
        var _thisDomHeightResize = $("#alertInfo").outerHeight();
        var topResize = parseInt(_scrollTopResize + (_winHResize - _thisDomHeightResize) / 2);
        if (topResize >= $("body").height() - _thisDomHeightResize) {
            _scrollTopResize = $("body").height() - _thisDomHeightResize;
            topResize = _scrollTopResize - (_winHResize - _thisDomHeightResize) / 2;
        };
        if (_thisDomHeightResize >= _winHResize) {
            topResize = _scrollTopResize;
            if (_scrollTopResize + _thisDomHeightResize >= $(document).height()) {
                topResize = $(document).height() - _thisDomHeightResize;
            };
            $("#alertInfo").css("position", "absolute");
        } else {
            topResize = (_winHResize - _thisDomHeightResize) / 2;
            $("#alertInfo").css("position", "fixed");
        };
        $("html,body").stop(true, true).animate({
            scrollTop: _scrollTopResize
        });
        $("#alertInfo").stop(true, true).animate({
            "top": topResize + "px",
            "margin-left": "-" + (_thisDomWidthResize / 2) + "px"
        })
        $("#maskLayer").height($("body").height());
    },
    //视频弹窗
    alertVideo: function(videoUrl) {
        dialog.showInfo(
            "<div class='pop_warp popVideo'>" +
            "<div class='before dialog-iframe'>"
            // +"<embed src='"+videoUrl+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' wmode='opaque'>"
            +"<iframe border='0' marginwidth='0' framespacing='0' marginheight='0' src='" + videoUrl + "' frameborder='0' noresize='scrolling='no' width='100%' height='100%' vspale='0' id='iframe' name='iframe' allowfullscreen></iframe>" +
            // + '<video src="' + videoUrl + '" autoplay="autoplay" playsinline="" webkit-playsinline="" x5-playsinline="" controls="controls"></video>' +
            "</div>" +
            "</div>")
    },
    // 获得奖励弹框
    alertPopGameLott(imgUrl,code,lottname) {
        var lottHtml = `
        <div class="pop_yuliu_wrap">
            <div class="lott_code">
                <dl>
                    <dd>
                        <span>恭喜您獲得</span>
                        <b><img class="imgcove" src="${imgUrl}" alt=""></b>
                        <em>${lottname}</em>
                    </dd>
                </dl>
                <p class="tips">請複製下列虛寶碼進入遊戲兌換獎勵！</p>
                <p id="send_code">${code}</p>  <i class='copyele'>COPY</i>
            </div>
            <a href="https://crisisaction.onelink.me/8GFM?pid=CA-5th-website" target="_blank" class="btn btn_end_lingqu">现在领取</a>
        </div>
         `;

        dialog.showInfo(`<div class="pop lingjiang">
            <div class="borbox">
                ${lottHtml}
            </div>
        </div>`)
    },
    alertPopGameLottTow(imgUrl,lottName) {
        var lottHtml = `
        <div class="pop_shiwu">
            <div class="lott_code">
                <h1>恭喜您獲得</h1>
                <b><img class="imgcove" src="${imgUrl}" alt=""></b>
                <p class="sw_name">${lottName}</p>
                <h3>請聯繫客服郵箱：<a href="mailto:crisisaction@herogame.com.tw">crisisaction@herogame.com.tw</a> 幫您核實獎勵郵寄派發</h3>
            </div>
        </div>
         `;

        dialog.showInfo(`<div class="pop lingjiangTwo">
            <div class="borbox">
                ${lottHtml}
            </div>
        </div>`)
    },
    // 我的兑换码
    alertPopGameDhm(lottDataHtml) {
        /*var lottHtml = `
            <dl class='dl_lists'>
                <dd> <span> 2020-10-9 02:22:54 <br/><i>Holy Knighttime</i></span> <span id='dum1'>XDF3FXCV</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
            <dl class='dl_lists'>
                <dd> <span> 2020-10-9 02:22:54 <br/><i>Holy Knighttime</i></span> <span id='dum1'>XDF3FXCV</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
            <dl class='dl_lists'>
                <dd> <span> 2020-10-9 02:22:54 <br/><i>Holy Knighttime</i></span> <span id='dum1'>XDF3FXCV</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
            <dl class='dl_lists'>
                <dd> <span> 2020-10-9 02:22:54 <br/><i>Holy Knighttime</i></span> <span id='dum1'>XDF3FXCV</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
            <dl class='dl_lists'>
                <dd> <span> 2020-10-9 02:22:54 <br/><i>Holy Knighttime</i></span> <span id='dum1'>XDF3FXCV</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
            <dl class='dl_lists'>
                <dd> <span> 2020-10-9 02:22:54 <br/><i>Holy Knighttime</i></span> <span id='dum1'>XDF3FXCV</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
            <dl class='dl_lists'>
                <dd> <span> 2020-10-9 02:22:54 <br/><i>Holy Knighttime</i></span> <span id='dum1'>XDF3FXCV</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
            <dl class='dl_lists'>
                <dd> <span> 2020-10-9 02:22:54 <br/><i>Holy Knighttime</i></span> <span id='dum1'>XDF3FXCV</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
         `;*/

        var lottHtml = '';
        var lottDdHtml = '';
        for (var i = 0; i < lottDataHtml.length; i++) {
            var getTime =  timestampToTime(lottDataHtml[i].created_at);
            var prizeName;
            if (lottDataHtml[i].gift_id == '836') {
                prizeName = '鑽石*66';
            }

            if (lottDataHtml[i].gift_id == '837') {
                prizeName = '鑽石*88';
            }

            if (lottDataHtml[i].gift_id == '838') {
                prizeName = '鑽石*166';
            }

            if (lottDataHtml[i].gift_id == '839') {
                prizeName = '鑽石*666';
            }

            if (lottDataHtml[i].gift_id == '840') {
                prizeName = '鑽石*1666';
            }

            if (lottDataHtml[i].gift_id == '841') {
                prizeName = '電競滑鼠';
            }

            if (lottDataHtml[i].gift_id == '842') {
                prizeName = '電競鍵盤';
            }

            if (lottDataHtml[i].gift_id == '843') {
                prizeName = '藍牙耳麥';
            }

            lottDdHtml +=`<dl class='dl_lists'><dd><span>${getTime}</span><span>${prizeName}</span> <p class="copy_target" id='dum${i+1}'>${lottDataHtml[i].gift_code}</p></dd>
                        <i class='copyele' data-arrtId="dum${i+1}">COPY</i></dl>`;


            if (lottDataHtml[i].gift_id == '841' || lottDataHtml[i].gift_id == '842' || lottDataHtml[i].gift_id == '843') {
                lottDdHtml +=`<dl class='dl_lists'><dd><span>${getTime}</span><span>${prizeName}</span> </dd>
                            <a href="mailto:crisisaction@herogame.com.tw" class='line_kefu'>联系客服</a></dl>`;
            }
        };

        dialog.showInfo(`<div class="pop ">
            <div class="borbox popYqh_bg">
                <h2>獎勵列表</h2>
                <p class="logs_tit"> <span>獎勵</span> <span>虛寶碼</span> <span>操作</span> </p>
                <div class="dhm">
                    ${lottDdHtml}
                </div>
            </div>
        </div>`);

        $(".dhm").mCustomScrollbar();
    },
    // facebook登陆
    alertPopFbLogin() {
        var fbLoginHtml = `<h2>溫馨提示</h2><h3>抽獎的話，需要先登錄Facebook喲！</h3><a href="https://ca.herogames.com.tw/six-years/auth.html?authclient=facebook" class="btn btn_login"></a> `;

        dialog.showInfo(`<div class="pop pop_fblogin">
            <div class="borbox">
                ${fbLoginHtml}
            </div>
        </div>`)
    },
    // 活动规则
    alertPopHDGZ:function(){
        var lottHtml = `
        <div class="pop_hdgz">
            <div class="pop_hdgz_cc">
                <h2>活動規則</h2>

                <p>1、指揮官填寫正確的手機號碼並選擇想要通訊的構造體，確認資訊無誤後可透過「預約通訊」按鈕完成預約。</p>
                <p>2、完成預約的指揮官將有機會在8/28通訊時間內收到指定構造體的電話通訊。</p>

                <h2>預約時間</h2>
                <p>7/16(五)12:00 - 8/16(一)23:59</p>

                <h2>通訊時間</h2>
                <p>8/28(六)17:00 - 21:59</p>

                <h2>注意事項</h2>
                <p>1、活動期間，每個FB帳號僅能預約一次，一旦完成預約將無法修改或撤回。請指揮官仔細核對資訊，確保無誤後再提交預約。</p>
                <p>2、8/28通訊時間內，請指揮官保持手機暢通，以免錯過構造體來電。</p>
                <p>3、若對活動有任何疑問，歡迎指揮官私訊粉絲團詢問。</p>

                <h2>構造體CV</h2>
                <p>露西亞（CV：小N）</p>
                <p>α（CV：小N）</p>
                <p>比安卡（CV：云鹤追）</p>
                <p>麗芙（CV：多多poi）</p>
                <p>七實（CV：赵爽）</p>
                <p>里（CV：夏侯落枫）</p>
                <p>卡列尼娜（CV：花玲）</p>
                <p>神威（CV：DK）</p>
                <p>羅塞塔（CV：贺文潇）</p>
                <p>曲（CV：叶知秋）</p>
                <p>卡穆（CV：DK）</p>
                <p>常羽（CV：KINSEN）</p>
                <p>薇拉（CV：江月）</p>
                <p>庫洛姆（CV：大白）</p>
                <p>蘇菲亞（CV：蔡娜）</p>
                <p>渡邊（CV：森中人）</p>
                <p>艾拉（CV：巩大方）</p>
                <p>露娜（CV：皛四白）</p>
            </div>
        </div>
         `;
        dialog.showInfo(`<div class="pop">
            <div class="borbox">
                ${lottHtml}
            </div>
        </div>`)


        $(".pop_hdgz_cc").mCustomScrollbar();
    },
    // 活动规则2
    alertPopHDGZ_yh:function(){
        var lottHtml = `
            <div class="pop_hdgz_yh">
                <div class="pop_hdgz_cc">
                    <h2>活動規則</h2>

                    <p>1、指揮官填寫正確的手機號碼並選擇想要通訊的構造體，確認資訊無誤後可透過「預約通訊」按鈕完成預約。</p>
                    <p>2、完成預約的指揮官將有機會在8/28通訊時間內收到指定構造體的電話通訊。</p>

                    <h2>活動時間</h2>
                    <p>7/16(五)12:00 - 8/16(一)23:59</p>

                    <h2>注意事項</h2>
                    <p>1、活動期間，每個FB帳號僅能預約一次，一旦完成預約將無法修改或撤回。請指揮官仔細核對資訊，確保無誤後再提交預約。</p>
                    <p>2、8/28通訊時間內，請指揮官保持手機暢通，以免錯過構造體來電。</p>
                    <p>3、若對活動有任何疑問，歡迎指揮官私訊粉絲團詢問。</p>

                </div>
            </div>
         `;
        dialog.showInfo(`<div class="pop">
            <div class="borbox">
                ${lottHtml}
            </div>
        </div>`)


        $(".pop_hdgz_cc").mCustomScrollbar();
    },
}

function timestampToTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s
}


// 兑换码列表
// dialog.alertPopGameDhm();

// code
// dialog.alertPopGameLott('','CA6YEARS2021');

// 实物
// dialog.alertPopGameLottTow();