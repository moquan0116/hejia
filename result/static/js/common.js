/**
 * Created by Administrator on 2017/12/7.
 */
;(function() {
    var Model = {
        data: {
            cart: []
        }
    };

    var View = {
        init: function() {
            var _this = this;
            View.bindEvent();
        },
        bindEvent: function() {
            var _this = this;
            var countdown=60;
            //搜索按钮为空
            $(document).on('click','.search_box .search_btn',function(){
                var i = $('.search_box .search_input').val();
                if($.trim(i) == ""){
                    return false;
                }
            });

            //回车请求


            //头部登录
            App.ajax('service/login', 'check_login', null, 'GET', function(r) {
                if(r.data.l_state == 1) {
                    var nickname = r.data.nickname,
                        head_url = r.data.head_url;
                    $('.user_name').addClass('js_user_name').html(
                        '<span class="my_name">' + '<a href="/user_home/admin" target="_blank">' + nickname + '</a>' + '<i class="irrow down"></i></span>' +
                        '<ul>' +
                        '<li><a href="/user_home/admin" target="_blank">个人中心</a></li>' +
                        '<li><a href="/user_home/setting" target="_blank">帐号设置</a></li>' +
                        '<li class="js_login_out">退出</li>' +
                        '</ul>'
                    );
                }else {
                    $('.user_name').html(
                        '<span class="null_name">' +
                        '<a href="javascript:;" class="js_login">请登录</a>' +
                        '<a href="/loginv2/register" class="js_zhuce">免费注册</a> ' +
                        '</span>'
                    );
                }
            }, function(r) {

            });

            //登录弹窗
            $(document).on('click', '.js_login', function() {
                var html = template('user_login_tmpl')();
                layer.open({
                    type:1,
                    skin: 'user_home_login',
                    title: false,
                    area: ['892px', '575px'],
                    shadeClose: false, //点击遮罩关闭
                    content: html
                });

                // 刷新图形验证码
                $(document).on('click', '.js_rush_code', function() {
                    $('.user_home_login #imgcode').click();
                });

                var obj = new WxLogin({
                    id:"login_container",
                    appid: "wx52849f7e1dda0ffa",
                    scope: "snsapi_login",
                    redirect_uri: "http://www.hejiacom/callback/index?type=1",
                    state: "123",
                    style: "white",
                    href: "https://www.hejiacom/static/css/user_home/wx_chat_bd.css"
                });
            });

            //登录方式选项卡
            $(document).on('click','.login_navs li', function() {
                var $this = $(this),
                    item = $('.login_navs li'),
                    objChangeValue = item.index($this);
                item.removeClass('active');
                $this.addClass('active');
                $('.cut_div').hide();
                $('.cut_div').eq(objChangeValue).show();
            });

            //点击跳转关闭弹窗
            $(document).on('click', '.ja_cash_btn', function() {
                $(this).parent('.cash_box').remove();
                $('.city-mark').hide();
            });

            // 刷新图形验证码
            $(document).on('click', '.js_rush_code', function() {
                $('#imgcode').click();
            });

            //手机登录验证码
            $(document).on('click', '.user_login .js_getCode', function() {
                var $this = $(this);
                var number = $('.input_phone .phone_number').val();
                var pic_code = $('.user_home_login #pic_code').val();
                var myreg 	= /^1[3|4|5|7|8]\d{9}$/;
                var data = {
                    number: number,
                    pic_code: pic_code
                };
                if(! myreg.test(number)){
                    App.system('手机号不正确！',1);
                    $('.input_phone .phone_number').focus();
                    return false;
                }
                //$('#get_code .load-img').css('display', 'inline');
                //获取验证码
                App.ajax('loginv2', 'get_phone_code_ajax', data, 'POST', function(r) {
                    //$('.login .load-img').hide();
                    //验证码倒计时
                    App.setTime($this,countdown);
                    //$("#time").val(r.data.time);
                },function(r){
                    $('#imgcode').click();
                    //$('#get_code .load-img').hide();
                    App.system(r.msg,1);
                    return false;
                });
            });
            //手机登录
            $(document).on('click', '.js_login_in button', function() {
                var $this = $(this);
                //var jump_url = $('#jump_url').val();
                var number   = $('.input_phone .phone_number').val(),
                    code     = $('.input_wrap .code_number').val();
                var data =  {
                    number:number,
                    code:code
                };
                var codereg = /^\d{4}$/;
                if (number == '') {
                    App.system('请输入手机号！',1);
                    $('.input_phone .phone_number').focus();
                    return false;
                }
                if(! codereg.test(code)){
                    App.system('请输入正确的验证码！',1);
                    $('.input_wrap .code_number').focus();
                    return false;
                }
                $this.attr('disabled','disabled');
                $this.css('background', '#ccc');
                //$('.js_login .load-img').css('display', 'inline');
                App.ajax('loginv2', 'check_login', data, 'POST', function() {
                    location.href = '/';
                },function(r){
                    App.system(r.msg,1);
                    $this.attr('disabled',false);
                    $this.css({
                        'background':'#bf153d',
                        'border-color':'#bf153d'
                    });
                });
            });

            //账号登录
            $(document).on('click', '.js_loginIn button', function() {
                var $this = $(this);
                var number = $('.login_account .account_number').val(),
                    pw     = $('.login_account .account_psd').val();
                var myreg 	= /^1[3|4|5|7|8]\d{9}$/;
                var data =  {
                    number:number,
                    pw:pw
                };
                if(! myreg.test(number)){
                    App.system('手机号不正确！',1);
                    $('.login_account .account_number').focus();
                    return false;
                }
                if (pw.length < 6) {
                    App.system('密码不少于六位！',1);
                    $('.login_account .account_psd').focus();
                    return false;
                }
                $this.attr('disabled','disabled');
                $this.css('background', '#ccc');
                App.ajax('loginv2', 'phone_login', data, 'POST', function() {
                    location.href = '/';
                },function(r){
                    App.system(r.msg,1);
                    $this.attr('disabled',false);
                    $this.css({
                        'background':'#bf153d',
                        'border-color':'#bf153d'
                    });
                });
            });

            //账号退出
            $(document).on('click', '.js_login_out', function() {
                App.ajax('service/login', 'quit', null, 'POST', function() {
                    setTimeout(function(){
                        location.href = '/';
                    },300);
                },function(){

                });
            });

        },
        renderCart: function() {

        }
    };
    // 启动
    $(function(){
        View.init();
    });
})();