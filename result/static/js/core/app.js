/**
 * Created by Administrator on 2017/12/7.
 */
var App = (function (){
    return {
        /**
         * DOM锁定加载状态
         */
        LOK: false,
        LOD: false,
        /**
         * DATA验证正则
         */
        RULES: {
            'required': /./,
            'intg'    : /^[1-9]\d*$/,
            'id'      : /^[1-9][0-9]{4,11}$/,
            'card'    : /^[0-9]{9,9}$/,
            'pwd'     : /^[0-9a-zA-Z.?!@#$%^&*_+-=]{5,17}$/,
            'phone'   : /^1[3|4|5|7|8]\d{9}$/,
            'name'    : /^[A-Za-z \u4e00-\u9fa5]+$/,
            'zip'     : /^[0-9]{6}$/,
            'code'		  : /^\d{4}$/
        },
        dateFormat: function(date, format) {
            if(date.toString().length == 10) {date = date * 1000;}
            date = new Date(date * 1);
            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //日
                "h": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdhmsqS])+/g, function(all, t){
                var v = map[t];
                if(v !== undefined){
                    if(all.length > 1){
                        v = '00' + v;
                        v = v.substr(v.length - all.length);
                    }
                    return v;
                }
                else if(t === 'y'){
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        },
        /**
         *  //n=1:显示2011-05-23, n=2显示2011-05-23 15:54:26
         *
         */
        time_to_str : function(timestamp,n){
            if(timestamp == undefined) return "&nbsp;";
            update = new Date(timestamp*1000);//时间戳要乘1000
            year   = update.getFullYear();
            month  = (update.getMonth()+1<10)?('0'+(update.getMonth()+1)):(update.getMonth()+1);
            day    = (update.getDate()<10)?('0'+update.getDate()):(update.getDate());
            hour   = (update.getHours()<10)?('0'+update.getHours()):(update.getHours());
            minute = (update.getMinutes()<10)?('0'+update.getMinutes()):(update.getMinutes());
            second = (update.getSeconds()<10)?('0'+update.getSeconds()):(update.getSeconds());
            if(n==1){
                return (year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second);
            }else if(n==2){
                return (year+'-'+month+'-'+day);
            }else{
                return 0;
            }
        },
        //生成随机数
        getRandom : function(s,n){
            return s + Math.floor(Math.random()*n+1)
        },
        /**
         * AJAX请求
         * @param string service 服务器
         * @param string method  方法
         * @param object $data   JSON数据
         * @param string type    JSON数据请求方法
         * @param fun    cbk     成功回调
         * @param fun    err     错误回调
         * @param fun    cmp     完成回调
         */
        ajax: function (service, method, $data, type, cbk, err, cmp)
        {
            $.ajax({
                url     : '/' + service + '/' + method,
                dataType: 'json',
                data    : $data,
                type    : type,
                cache   : false,
                success : function (r)
                {
                    if (r.err_code)
                    {
                        if (typeof err == 'function') err(r);
                    }
                    else{
                        if (typeof cbk == 'function') cbk(r);
                    };

                },
                complete : function ()
                {
                    if (typeof cmp == 'function') cmp();
                }
            });
        },

        /**
         * 字符串转译
         * @param string s 字符串
         */
        charset: function (s)
        {
            if (!s) return '';

            s = s.toString();
            if (s.length == 0) return '';

            s = s.replace(/&/g, '&amp;');
            s = s.replace(/</g, '&lt;');
            s = s.replace(/>/g, '&gt;');
            s = s.replace(/"/g, '&quot;');
            s = s.replace(/'/g, '&#039;');
            return s;
        },
        /**
         * 数字转金额
         * @param number num 数字
         * @param int    bit 小数点位数
         */
        format: function (num, bit)
        {
            if (!num) num = 0;
            else num = Number(num) > 0 ? Number(num) : 0;
            if (!bit) bit = 2;
            else parseInt(bit) > 0 ? parseInt(bit) : 0;

            var str = num.toString();
            if (str.indexOf('.') == -1)
            {
                if (bit > 0)
                {
                    str += '.';
                    for (var i = 0; i < bit; i ++) str += '0';
                    num = str;
                };
            }
            else
            {
                var arr = str.split('.');
                if (arr[1].length > bit)
                {
                    if (bit == 0) str = arr[0];
                    else str = str.substr(0, (str.length - (arr[1].length - bit)));
                }
                else for (var i = 0; i < (bit - arr[1].length); i ++) str += '0';
                num = str;
            };
            return num;
        },
        system_m: function(msg, type){
            var fun = "page_mess_ok";
            if(type == 1) fun = "page_mess_error";
            if(type == 2) fun = "page_mess_except";
            App.messageTip_m(msg, fun);
            return true;
        },
        messageTip_m: function(msg,className){
            var _this = this;
            var timer='';
            clearTimeout(timer);
            // var html ='<div id="page_mess" class="'+ className + '"><i></i><span>'+msg +'</span><a onclick="$(\'#page_mess\').hide();"></a></div>';
            // var html ='<div id="page_mess" class="'+ className + '"><i></i><span>'+msg +'</span></div>';
            var html = $('<div class="antuan_msg_m">' +
                '<div class="antuan_msg_modal_m"></div>' +
                '<div class="antuan_msg_dialog_m ' + (className || '') + '">' +
                '<a class="close-btn">' + '</a>' +
                '<div class="con_m">' +
                '<div class="con_w_m">' +
                '<p>' + '<i class="icon">' + '</i>' + msg + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            if($(".antuan_msg_m").length > 0){
                $(".antuan_msg_m").remove();
            }
            html.find('.close-btn').on('click', function() {
                clearTimeout(_this.timer);
                $(".antuan_msg_dialog_m").slideUp("fast", function() {
                    $('.antuan_msg_m').hide();
                });
            });
            $("body").append(html);
            timer = setTimeout(function(){
                $(".antuan_msg_m").hide();
            },2000)
        },

        system: function(msg, type) {
            var fun = "antuan_msg-ok";
            if(type == 1) fun = "antuan_msg-error";

            App.messageTip(msg, fun);
            return true;
        },

        messageTip: function(msg, className) {
            var _this = this;
            clearTimeout(this.timer);
            var $html = $('<div class="antuan_msg">' +
                '<div class="antuan_msg_modal"></div>' +
                '<div class="antuan_msg_dialog ' + (className || '') + '">' +
                '<i class="del"></i>' +
                '<div class="con">' +
                '<div class="con_w">' +
                '<i class="icon"></i>' +
                // msg +
                '<p>' + msg + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');

            if ($(".antuan_msg").length > 0) {
                $(".antuan_msg").remove();
            }

            $html.find('.del').on('click', function() {
                clearTimeout(_this.timer);
                $(".antuan_msg_dialog").slideUp("fast", function() {
                    $('.antuan_msg').hide();
                });
            });

            $("body").append($html);

            this.timer = setTimeout(function(){
                $(".antuan_msg_dialog").slideUp("fast", function() {
                    $('.antuan_msg').hide();
                });
            }, 2000);
        },
        /**
         * 微信弹窗
         */
        wxDialog: function(href,url) {
            href = href || window.location.href;

            if (!$('#qrcode').length) {
                $('body').append('<div id="qrcode"></div>');
            }
            var html = '<div class="erw-code">' +
                '<p class="wechat">分享至微信朋友圈</p>' +
                '<div class="img-wrap">' +
                '<div class="phoneCode">' +
                '<img src="/idqrcode/api?bg=ffffff&fg=000000&gc=ffffff&logo=&el=L&text='+ url +'" width="160" height="160" alt="安团家博会" />' +
                '</div>' +
                '<img class="img-help" src="/static/images/effect/wechat_help.jpg" />' +
                '</div>' +
                '<p class="help">' +
                '<a href="javascript:;">使用帮助</a>' +
                '</p>' +
                '</div>';

            $.appdialog.open({
                width   : 627,
                height  : 357,
                title   : '提示',
                content : html
            }, 'qrcode');

            $('.erw-code .help a').hover(function() {
                $('.erw-code .phoneCode').hide();
                $('.erw-code .img-help').css('display', 'block');
            }, function() {
                $('.erw-code .phoneCode').show();
                $('.erw-code .img-help').hide();
            });
        },
        qrcode: function(options, target) {
            options = options || {};
            target = target || 'phoneCode';

            var defaults = {
                render: 'canvas',//默认canvas，可选择table；
                width: 160,//设置二维码宽度；
                height: 160,//设置二维码高度；
                correctLevel: 0,//纠错等级；
                text: window.location.href//二维码链接；
            };
            options = $.extend({}, defaults, options);
            $('.' + target).qrcode(options);
        },
        /**
         * 表单验证
         * @param string form  表单
         * @param object $data JSON数据
         * @param fun    cbk   成功回调
         */
        form: function (form, $data, cbk) {
            var _this = this;
            form = form || 'vali';
            $('.' + form).submit(function () {
                try {
                    var rt = _this.form_check($data);
                    if (rt) {
                        if (typeof cbk == 'function') cbk.call();
                    }

                    return false;
                } catch(e) {
                    return false;
                }
            });
        },
        /**
         * 表单验证返回结果
         * @param object $data JSON数据
         */
        form_check: function ($data) {
            var _this = this;
            var result = true;
            var rules = $data.rules;
            var msg = $data.msg;

            $.each(rules, function(k, v) {
                var key  = '';
                var rule = '';

                $.each(v, function(kk, vv) {
                    var rt = _this.form_status(vv, kk, $('.' + k).val());

                    if (!rt) {
                        key  = k;
                        rule = kk;
                        return false;
                    }
                });

                if (key) {
                    result = false;
                    $('.' + k).parent()
                        .css('position','relative')
                        .find('.vali_err')
                        .html(msg[key][rule])
                        .show();
                } else {
                    $('.' + k).parent()
                        .find('.vali_err')
                        .hide();
                }
            });
            return result;
        },
        /**
         * 表单验证匹配正则
         * @param boolean match 是否需要匹配
         * @param string  rule  正则名
         * @param string  value 匹配值
         */
        form_status: function(match, rule, value) {
            var _this = this;
            var r = true;

            if (!match) return r;

            var arr = rule.split('/');
            $.each(arr, function(k, v) {
                r = _this.RULES[v].test(value);
            });

            return r;
        },
        /**
         * 验证码倒计时
         * @param string obj 点击按钮
         * @param string  countdown  倒计时长
         * @param string  color  倒计时结束颜色值
         */
        setTime: function(obj, countdown, color) {
            var _this = this;
            if (countdown == 0) {
                obj.attr("disabled", false);
                obj.css({
                    'background': color || '#18b4ed',
                    'border-color': color || '#18b4ed'
                });
                if(obj.get(0).tagName.toLowerCase()== 'input'){
                    obj.val("获取验证码");
                }else{
                    obj.html("获取验证码");
                }
                countdown = 60;
                return;
            } else {
                obj.attr("disabled", true);
                obj.css({
                    'background': '#cacaca',
                    'border-color':'#cacaca'
                });
                if(obj.get(0).tagName.toLowerCase()== 'input'){
                    obj.val("重新发送" + countdown + "");
                }else{
                    obj.html("重新发送" + countdown + "");
                }
                countdown --;
            }

            setTimeout(function() {
                    _this.setTime(obj, countdown, color) }
                ,1000)
        },
        /**
         * 获取倒计时时间格式
         */
        getCountDown: function(time, cbk, islocation) {
            var dur = 0;//毫秒数
            var pms = [
                {type: 'milli',scale: 1000},
                {type: 'sec',scale: 60},
                {type: 'mini',scale: 60},
                {type: 'hour',scale: 24},
                {type: 'day',scale: 30},
                {type: 'month',scale: 12},
                {type: 'year',scale: ''}
            ];
            var result = {milli: '00',sec: '00',mini: '00',hour: '00',day: '00',month: '00',year: '00'};
            var func = {
                formatZero: function(n, l) {
                    if (typeof n == 'undefined') {
                        return;
                    }
                    var n = parseInt(n, 10);
                    var l = l || 2;

                    n =n.toString().split('');

                    while(n.length < l) {
                        n.unshift('0');
                    }
                    n = n.slice(0, 2);
                    return n.join('');
                }
            };
            time = time.toString();
            if (time.split('-').length == 1) {
                dur = parseInt(time, 10);
            } else {
                time = time.split('-');

                time[3] = time[3] || 0;
                time[4] = time[4] || 0;
                var date = Date.UTC(+time[0], time[1] - 1, time[2], time[3], time[4]);
                var future = new Date(date);
                var now = new Date();
                now = now.getTime();

                if (typeof TIMES != 'undefined' && !islocation) {
                    now = TIMES * 1000;
                }

                dur = Math.round((future.getTime() - now)) + future.getTimezoneOffset() * 60 * 1000;
            }
            $.each(pms, function(k, v) {
                if (dur <= 0) {
                    return false;
                }
                var scale = -1;
                var temp = dur;

                if (v.type != 'year') {
                    scale = parseInt(v.scale, 10);
                    temp = dur % scale;
                }
                result[v.type] = func.formatZero(temp);

                if (v.type == 'year') {
                    return false;
                }

                dur = Math.floor(dur / scale);
            });

            if (typeof cbk == 'function') {
                cbk(result);
            }
            return result;
        },
        // 仿PHP $_GET
        $_GET : (function() {
            var url = window.document.location.href.toString();
            var arru = url.split('?');
            var get = {};

            if (typeof(arru[1]) == 'string') {
                arru = arru[1].split('&');

                var i, j;
                for (i in arru) {
                    j = arru[i].split('=');
                    get[j[0]] = j[1];
                }
            } else {}

            return get;
        })()
    };
})();