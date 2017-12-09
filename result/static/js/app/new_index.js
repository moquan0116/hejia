/**
 * Created by Administrator on 2017/12/7.
 */
;(function() {
    var Model = {
        data: {
            width:0
        },
        // 报名表单提交
        submitAjaxForm: function($data, phone) {
            var _this = this;
            App.ajax(subscribe.project, subscribe.method, $data, 'POST', function(r){
                /*var user_token = $('#token').val();
                var ANTUAN_URL = $('#antuanurl').val();*/
                App.system(r.reason,1);
                if(r.code == 10){
                    setTimeout(function () {
                        location.reload();
                    },800);
                }

                //统计代码
                /*_paq.push(['trackEvent', 'Btn', 'wSubmit','WebIndexSubmit']);
                location.href = ANTUAN_URL + 'bm_pay?act_id=' + r.data.activity + '&bm_id=' + r.data.id + '&user_token=' + user_token + '&phone=' + phone;*/

            },function(r){
                App.system(r.reason,1);
                $("[action='submit']").html('立即免费领票');
                $("[action='submit']").removeAttr('disabled');
            })

        },
        //号码入库
        saveNumAjax:function($data,$form){
            App.ajax('bm_ajax', 'index', $data, 'POST', function(r){
                if(r.i != ''){
                    $form.find('#newid').val(r.i);
                    $form.find('#hmac').val(r.h);
                }
            })
        },
        //加载更多爆款
        moreAjaxSpecial:function($data,$obj,$str){
            App.ajax('act_info_ajax', 'tejia_ajax', $data, 'GET', function(r){
                $obj.hide();
                // $('#special_pages').val(r.data.page);
                if (r.data.list == '') {
                    App.system('没有更多了！', 1);
                    $obj.remove();
                    return false;
                }

                if(r.data.list.length < $data.rowCount){
                    $obj.remove();
                }
                var special_data = r.data.list;
                var htmlStr = $("#more_special_tmpl").tmpl({info : special_data});
                $(".speciallist>ul").append(htmlStr);
                $('.at-special .progress').each(function() {
                    var $this = $(this);
                    var stepWidth = $this.data('width')? $this.data('width') : 30;
                    if (+stepWidth >= 100) {
                        var html = '<i class="progress-full"></i>';
                        $this.append(html);
                        stepWidth = 100;
                    }
                    $this.find('.progress-bar').css('width', stepWidth + '%');
                });
                $obj.show().html($str).addClass("loadspecial");
            },function(r){
                App.system(r.msg, 2);
                $obj.remove();
                $(this).remove();
            })
        },
        moreAjaxSpecialMy:function( $data, $obj ){
            //$(".speciallist>ul").append(myTemplate);
            App.ajax(goods.project, goods.method, $data, 'GET', function(r){
                if(r.code == 200){
                    $(r.data).each(function (k,v) {
                        var tmpl = $(myTemplate).clone();

                        $(tmpl).find('img').attr("src",v.image);
                        $(tmpl).find('li').data("original",v.marketPrice);
                        $(tmpl).find('li').data("special",v.hePrice);
                        $(tmpl).find('li').data("name",v.goodsName);
                        $(tmpl).find('h3').attr("title",v.goodsName);
                        $(tmpl).find('h3').text(v.goodsName);
                        $(tmpl).find('h3').next('p').attr('title',v.caption);
                        $(tmpl).find('h3').next('p').text(v.caption);
                        $(tmpl).find('.special_dmj').html('店面价：'+v.marketPrice);
                        $(tmpl).find('.special_atj').html('和家价：<b>'+v.hePrice+'</b>');

                        $(".speciallist>ul").append(tmpl)
                    });
                }else{
                    $($obj).remove();
                }


            },function(r){
                App.system(r.msg, 2);
            })
        },
        getBrandByClassify:function($data){
            App.ajax(brand.project, brand.method, $data, 'GET', function(r){
                /*if (r.data.brand_data.length == 0) {
                    $(".at-brandlist ul").html('<li class="brand_empty"></li>');
                    return false;
                 <li data-name="富林地板" data-desc="时尚美学地板">
                 <a class="order_btn"><img src="/static/images/common/grey.gif" data-original="https://cdn.file0.antuan.com/2017/06/19/864807e8bb6b.jpg"/></a>
                 </li>
                }*/
                if (r.length == 0) {
                    $(".at-brandlist ul").html('<li class="brand_empty"></li>');
                    return false;
                }
                $(".at-brandlist ul").children('li').remove();
                $(r).each(function (k,v) {
                    var ht = "<li data-name='"+v.brandName+"' data-desc=''><a class='order_btn'><img src='"+v.image+"'></a></li>";
                    $(".at-brandlist ul").append( ht );
                });
            },function(r){
                App.system(r.msg, 2);
            })
        },
        getProductByClassify:function($data){
            App.ajax('act_info_ajax', 'tejia_ajax', $data, 'GET', function(r){

                //切换分类时  重置分页
                $('#special_pages').val(1);
                if (r.data.list == '') {
                    $(".speciallist ul").html('<li class="product_empty"></li>');
                    $(".at-special .loadmore").hide();
                    return false;
                }

                var product_data = r.data.list;
                var htmlStr = $("#productlist_tmpl").tmpl({info : product_data}).outerHTML();
                $(".speciallist").html(htmlStr);
                $('.at-special .progress').each(function() {
                    var $this = $(this);
                    var stepWidth = $this.data('width')? $this.data('width') : 30;
                    if (+stepWidth >= 100) {
                        var html = '<i class="progress-full"></i>';
                        $this.append(html);
                        stepWidth = 100;
                    }
                    $this.find('.progress-bar').css('width', stepWidth + '%');
                });

                //当前分类的爆款商品超出6个 方显示更多
                if(product_data.length > 6){
                    $(".at-special .loadmore").show();
                }

            },function(r){
                App.system(r.msg, 2);
            })
        }
    };

    var View = {
        init: function() {
            var _this = this;
            //this.addbmMemberTotal();//计数
            View.bindEvent();
            //this.renderCountDown();
            this.loadMap();
            //this.codeinputShow();
            this.upSrcoll();
        },
        bindEvent: function() {
            var _this = this;
            var ACT_ID = $('#act_id').val();
            var PATRN = /^1[3|4|5|7|8]{1}[0-9]{9}$|^18\d{9}$/;
            var COUNTDOWN = 60;
            var $bminput = $('#bmForm input[name="name"]');
            //出现验证码时  隐藏报名滚动信息
            // if($('.main-nav .verify-wrap').length){
            // 	$('.main-nav .scroll-wrap').hide();
            // }else{
            // 	_this.upSrcoll();
            // }

            //上下滚动
            $("#s-slide").jfocus({time:8000});

            //预约小区
            $("#s-slide-house").jslide();
            // $("#s-slide-house").jfocus({time:100000});

            //历史回顾
            $("#s-slide-history").jslide();


            $('.at-special .progress').each(function() {
                var $this = $(this);
                var stepWidth = $this.data('width')? $this.data('width') : 30;
                if (+stepWidth >= 100) {
                    var html = '<i class="progress-full"></i>';
                    $this.append(html);
                    stepWidth = 100;
                }
                $this.find('.progress-bar').css('width', stepWidth + '%');
            });



            //左切换分类
            $(document).on("click",".classify-scroll a.left-btn",function(){
                var $this = $(this);
                var $listScroll = $this.siblings(".classify-list-scroll");
                var liSize = $listScroll.find(".classify-list li").size();
                var flag = true;
                if(flag){
                    if(liSize > 12){
                        $listScroll.find(".classify-list").animate({'margin-left':0}, 200);
                        flag = false;
                    }
                }
            });


            //右切换分类
            $(document).on("click",".classify-scroll a.right-btn",function(){
                var $this = $(this);
                var $listScroll = $this.siblings(".classify-list-scroll");
                var liSize = $listScroll.find(".classify-list li").size();
                var liWidth = $listScroll.find(".classify-list li").width();
                var flag = true;
                if(flag){
                    if(liSize > 12){
                        var mleft = (liSize - 12) * (liWidth + 1);
                        $listScroll.find(".classify-list").animate({'margin-left': -mleft}, 200);
                        flag = false;
                    }
                }
            });

            //品牌分类
            $(document).on("click",".brand-classify li",function(){
                var $this = $(this);
                var obj = _this.switchClassify($this);
                /*var name = obj.name ;
                var id = obj.id ;
                var actid = obj.actid ;*/
                var code = obj.code;
                //$data = {"act_id":actid,"cat_id":id,"current":0,"rowCount":40};
                $data = {"code":code};
                Model.getBrandByClassify($data);
            });

            //商品分类
            $(document).on("click",".product-classify li",function(){
                var $this = $(this);
                var obj = _this.switchClassify($this);
                var name = obj.name ;
                var id = obj.id ;
                var actid = obj.actid ;
                $data = {"act_id":actid,"cat_id":id,"current":0,"rowCount":10};
                Model.getProductByClassify($data);
            });
            $(document).on("click","#dialog .orderbtn button",function(){
                var form = $(this).parents('.form');
                var data = {
                   'name':$(form).find("input[name='name']").val(),
                   'phone':$(form).find("input[name='phone']").val()
               };
                var patrn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                var regName = /^[_\-\~\!\@\#\$\%\^\&\*\(\)\|\,\，\?\？\>\<\.\/\}\{\;\；\'\》\《\。]+$/;//过滤英文字母

                if(data.name.length < 2){
                    App.system('您输入的联系人姓名无效！',1);
                    $(form).find(":input[name='name']").select();
                    return false;
                }else{
                    if(true==regName.test(data.name)){
                        App.system('您输入的联系人姓名无效！',1);
                        $(form).find(":input[name='name']").select();
                        return false;
                    }
                }
                if(! patrn.test(data.phone)){
                    App.system('手机号不正确！',1);
                    $(form).find(":input[name='phone']").select();
                    return false;
                }
                Model.submitAjaxForm(data, '');
            });


            // 表单验证码
           /* $(document).on('click', '.form .js_get_code', function() {
                var phone = $('.form input[name="phone"]').val(),
                    name = $('.form input[name="name"]').val();

                if (name.length < 2) {
                    App.system('输入正确的姓名！', 1);
                    return false;
                }

                if (!PATRN.test(phone)) {
                    App.system('输入正确的手机号！', 1);
                    return false;
                }

                var html = $('#tmpl_code').html();
                $.appdialog.open({
                    width   : 470,
                    height  : 310,
                    title   : '',
                    content : html
                });

                $('.js_change_code').click(function() {
                    $(this).parents('.code-img')
                        .find('#imgcode')
                        .attr('src', '/service/open/code?name=register&amp;srand=' + Math.random());
                });

                $('.code-wrap .js_code_submit').click(function() {
                    var $this = $(this);
                    var pic_code = $('.code-wrap #pic_code').val();

                    var data = {
                        number: phone,
                        pic_code: pic_code,
                        is_login: 1
                    };

                    $this.attr('disabled','disabled');
                    App.ajax('loginv2', 'get_phone_code_ajax', data, 'POST', function(r) {
                        $("#dialog").dialog("close");// 关闭弹窗
                        $('#token').val(r.data.user_token);
                        App.system(r.msg, 0);

                        //验证码倒计时
                        App.setTime($('.form button.get_code'), COUNTDOWN);

                    },function(r){
                        $this.removeAttr('disabled');
                        App.system(r.msg, 1);
                        $('.js_change_code').click();
                        return false;
                    });
                });
            });*/

            //更换验证码
           /* $(document).on("click",".verify-wrap .verify-img",function(){
                $(this).attr('src', '/index/code?name=register&srand='+Math.random());
            });

            //看不清，换一张
            $(document).on("click",".js_rush",function(){
                $('.verify-wrap .verify-img').trigger('click');
            });*/


            //品牌立即预约
            $(document).on("click",".order_btn",function(){
                var $obj = $(this);
                var name = $obj.closest('li').data('name');
                var desc = $obj.closest('li').data('desc');
                var data = {"name": name,"desc" : desc};
                var html = $("#brand_tmpl").tmpl(data).outerHTML();
                $.appdialog.open({
                    width   : 605,
                    height  : 400,
                    title   : '',
                    content : html
                });
                var $bdinput = $('.forminput input[name="name"]');
                _this.renderInputMessage($bdinput);
            });

            //代金券立即预约
            $(document).on("click",".at-voucher .voucherlist li",function(){
                var $obj = $(this);
                var name = $obj.data('name');
                var price = $obj.data('price');
                var desc = $obj.data('desc');
                var data = {"name":name , "price":price ,"desc":desc};
                var html = $("#voucher_tmpl").tmpl(data).outerHTML();
                $.appdialog.open({
                    width   : 605,
                    height  : 400,
                    title   : '',
                    content : html
                });

                var $bdinput = $('.forminput input[name="name"]');
                _this.renderInputMessage($bdinput);
            });

            //爆款特价立即预约
            $(document).on('click','.speciallist li',function(){
                var $obj = $(this);
                if($obj.html()== ''){
                    return false;
                }
                var src = $obj.find('.at-special-img img').attr('src');
                var name = $obj.data('name');
                var original = $obj.data('original');
                var special = $obj.data('special');
                var data = {"name":name , "original":original ,"special":special,"src":src};
                var html = $("#special_tmpl").tmpl(data).outerHTML();
                $.appdialog.open({
                    width   : 605,
                    height  : 405,
                    title   : '',
                    content : html
                });

                var $bdinput = $('.forminput input[name="name"]');
                _this.renderInputMessage($bdinput);
            });

            // 特价加载更多
            $(document).on('click', '.at-special .loadspecial', function() {
                /*var $this = $(this);
                var $obj = $('.at-special .loadmore');
                var html =  $obj.html();
                $obj.html('<i class="loading"></i><span>正在加载中</span>');
                $obj.removeClass("loadspecial");
                var page = $('#special_pages').val();
                var rowCount = $("#special_limit").val() ;
                var current = rowCount * parseInt(page);
                $('#special_pages').val(parseInt(page)+1);
                var cat_id = $(".product-classify li.active").data("id");
                cat_id = cat_id ? cat_id : 0;
                // var data = {
                // 	"page": page,
                // 	"act_id" : ACT_ID,
                // 	"cat_id" : cat_id,
                // 	"current":current,
                // 	"rowCount":rowCount
                // };
                var data = {
                    "act_id" : ACT_ID,
                    "cat_id" : cat_id,
                    "current":current,
                    "rowCount":rowCount
                };*/
                var $obj = $('.at-special .loadmore');
                var page = $('#special_pages').val();
                var rowCount = $("#special_limit").val() ;
                var current = rowCount * parseInt(page);
                $('#special_pages').val(parseInt(page)+1);
                var $data = {
                    "current":current,
                    "rowCount":rowCount
                };
                //console.log($data);
                Model.moreAjaxSpecialMy( $data, this );
            });

            //头部短信弹窗
            $(document).on('click','.main-nav a.message',function(){
                var html = $('#message_tmpl').html();
                $.appdialog.open({
                    width   : 546,
                    height  : 180,
                    title   : '',
                    content : html
                });
                var url = '';
                var timer;
                var holding = function(obj, title) {
                    obj.attr('disabled', 'disabled');
                    timer = setInterval(function() {
                            var time = parseInt(obj.attr('time'));
                            time = time - 1;
                            if (time <= 0) {
                                obj.attr('time', 60);
                                obj.html(title);
                                obj.removeAttr('disabled');
                                clearInterval(timer);
                            } else {
                                obj.html(time + 's');
                                obj.attr('time', time);
                            }
                        },
                        1000);
                }

                $(document).on('click','#glan',function(){
                    var uPhone = $("#glPhone").val();
                    var actOver = $('#actOver').val();
                    var actStart = $('#actStart').val();
                    var actAddress = $('#actAddress').val();
                    var myreg 	= /^1[3|4|5|7|8]\d{9}$/;
                    var data = {
                        uPhone: uPhone,
                        actStart: actStart,
                        actOver: actOver,
                        actAddress: actAddress,
                        act_id : ACT_ID
                    };

                    if(! myreg.test(uPhone)){
                        App.system('请输入手机号！',1);
                        $("#uPhone").focus();
                        return false;
                    }
                    $('#glan .load-img').css('display', 'inline');
                    //获取验证码
                    App.ajax('bm_ajax', 'getgonglvinfo', data, 'POST', function(r){
                        // $('.register .load-img').hide();
                        App.system(r.reason,0);
                        $('#dialog').dialog('close');
                        var $obj = $("#glan");
                        $obj.attr('time',60 - parseInt(0));
                        holding($obj, '重新发送');
                        $("#time").val(r.data.time);
                    },function(r){
                        $('#glan .load-img').hide();
                        App.system(r.reason,2);
                        return false;
                    });
                });
            });

            // 路线弹窗
            $(document).on('click', '.traffic-tophone>a', function() {
                var $this = $(this);
                var patrn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                var traffic = $('.traffic-tab>a.active').html();
                var list = {
                    traffic: traffic
                }

                // var html = template('traffic_m_tmpl', list);
                // $('.at-layer').show().find('.at-layer-content').append(html);

                var html = $('#route_message_tmpl').tmpl(list).outerHTML();
                $.appdialog.open({
                    width   : 546,
                    height  : 180,
                    title   : '',
                    content : html
                });

                var data = {
                    area: $('.at-traffic p.subtitle').html(),//活动地址
                    type: '',
                    act_id : ACT_ID // 活动ID
                };
                var text = $('.traffic-contentlist.lx').text();

                if (traffic == '公交') {
                    data.type = 1;
                    data.bus = text.replace(/\n|\s|为谨防公交路线临时有所变动，出行前请查询最新公交路线|注：为谨防公交路线临时有所变动，出行前请查询最新公交路线/g, '');
                } else if (traffic == '自驾') {
                    data.type = 4;
                    data.stop = text.replace(/\n|\s/g, '');
                } else if (traffic == '大巴车') {
                    data.type = 2;
                    data.bus_area = text.replace(/\n|\s/g, '');
                } else if (traffic == '地铁') {
                    data.type = 3;
                    data.dt = text.replace(/\n|\s/g, '').replace(/\n|\s{2,}/g, '');
                }

                $(document).off('click', '.int-wrap button.send');
                $(document).on('click','.int-wrap button.send',function(){
                    var uPhone = $(this).prev().val();
                    if(!patrn.test(uPhone)){
                        App.system('请正确输入手机号！',1);
                        return false;
                    }

                    data.phone = uPhone;
                    App.ajax('index', 'get_line_send', data, 'POST', function(r) {
                        App.system(r.reason);
                        $('.js-close-at-layer').click();
                    }, function(r) {
                        App.system(r.reason, 1);
                    });
                });
            });

            //头部短信弹窗
            // $(document).on('click','.main-nav .info-wrap a.map',function(){
            // 	var html = $('#map_tmpl').html();
            // 	$('.map-mask').show();
            // 	$('.map-dialog').html(html);
            // });
            $(document).on('click','.map-wrap a.close-map',function(){
                $('.map-mask').hide();
                $('.map-dialog').html('');
            });

            //领票弹窗
            $(document).on('click','[action="receive"]',function(){
                var html = $('#form_tmpl').html();
                $.appdialog.open({
                    width   : 516,
                    height  : 'auto',
                    title   : '',
                    content : html
                });

                var $bdinput = $('.base-input input[name="name"]');
                _this.renderInputMessage($bdinput);
            });

            //左侧悬浮
            $(document).on("click",".leftslider li.fnav",function(){
                var $obj = $(this);
                var id = $obj.attr('id');
                var floor = id.split('fl')[1];
                var offset = $("#floor" + floor).offset().top;
                $obj.addClass('active').siblings().removeClass('active');
                $('body,html').animate({
                    scrollTop: offset
                }, 500);
            });

            //跳转到相应版块
            $(document).on("click",".main_nav a,.rank-img a,.why-cheap a",function(event){
                event.stopPropagation();
                var $obj = $(this);
                var floor = $obj.attr('rel')?$obj.attr('rel'):0;
                if(floor == 0) return;
                _this.scrollNav(floor);
            });
            // $(document).on("click",".main_nav a,.lead a,.rank-img a,.why-cheap a",function(event){
            // 	event.stopPropagation();
            // 	var $obj = $(this);
            //  	var floor = $obj.attr('rel')?$obj.attr('rel'):0;
            //  	if(floor == 0) return;
            //  	_this.scrollNav(floor);
            // });

            //返回顶部
            $(document).on("click",".top",function(){
                $('body,html').animate({
                    scrollTop: 0
                }, 500);
            });

            //追加URL路径
            $(document).on("click",".inputtxt,[action='receive']",function(){
                window.location.href='#'+'bm';
            });

            //自动获取手机入库
           /* $('input[name="phone"]').keyup(function(){
                var p = $(this).val();
                var patrn = new RegExp(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/);
                var name = $('input[name="name"]').val();
                if(patrn.test(p)){
                    var form = $(this).parents('.form');
                    var i = $(form).find('#newid').val();
                    var h = $(form).find('#hmac').val();
                    var t = $(form).find('input[name="radio_type"]').val();
                    var n = $(form).find(':input[name="name"]').val();
                    var xq = $(form).find(':input[name="xqmc"]').val();
                    var gnum = $(form).find('#piaonumg').val();
                    var tnum = $(form).find(':input[name="piaonumt"]').val();
                    var act = $(form).find(':input[name="activity"]').val();
                    var data = {"phone": p, "name":name ? name : '自动获取',"hmac": h,"newid": i,"comeZd": 0};

                    //手机号码入库
                    App.ajax('index', 'refer', data, 'POST', function(r){
                    })
                }
            });*/

            //首页表单提交验证
            /*$(document).on("click","[action='submitindex']",function(){
                var form = $(this).parents('.form');
                var name = $(form).find(":input[name='name']").val();
                var telphone= $(form).find(":input[name='phone']").val().replace("-","").replace(" ","");
                var xqname=$(form).find(":input[name='xqmc']").val();
                var piaonumt=$(form).find(":input[name='piaonumt']").val();
                var radio_type_hi=$(form).find(":input[name='radio_type']").val();
                var captcha = $(form).find('input[name="code"]').val();
                var patrn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                var regName = /^[_\-\~\!\@\#\$\%\^\&\*\(\)\|\,\，\?\？\>\<\.\/\}\{\;\；\'\》\《\。]+$/;//过滤英文字母
                var user_token = $('#token').val();

                if(!patrn.test(telphone)){
                    App.system('请输入正确的手机号！',1);
                    $(form).find(":input[name='phone']").select();
                    return false;
                }
                if(name.length < 2){
                    App.system('您输入的联系人姓名无效！',1);
                    $(form).find(":input[name='name']").select();
                    return false;
                }else{
                    if(true==regName.test(name)){
                        App.system('您输入的联系人姓名无效！',1);
                        $(form).find(":input[name='username']").select();
                        return false;
                    }
                }
                if (captcha == '') {
                    App.system('请输入验证码',1);
                    return false;
                }
                if($(form).find('.verify-code').lengh>0){
                    if(!RegExp(/^[a-zA-Z0-9]$/).test($(form).find('.verify-code').val())){
                        App.system('请输入验证码',1);
                        return false;
                    }
                }
                if (user_token == '') {
                    App.system('请先获取验证码', 1);
                    return false;
                }
                $(this).html('<img class="load-img" style="display:inline;" src="/static/m/images/load.gif" width="16">'+'正在加载');
                $(this).attr("disabled", "disabled");

                var hmac = $(form).find('#hmac').val(),
                    newid = $(form).find('#newid').val(),
                    comeZd = $(form).find('#comeZd').val(),
                    deposit = $(form).find('#deposit').val(),
                    piaonumg = $(form).find('#piaonumg').val(),
                    remark = $(form).find('#remark').val(),
                    captcha = $(form).find('input[name="code"]').val(),
                    radio_type = $(form).find('#radio_type').val();

                var cdata = {
                    user_token: user_token,
                    code: captcha,
                    phone: telphone
                };

                var data = {
                    "phone": telphone,
                    "name": name,
                    "hmac": hmac,
                    "newid": newid,
                    "comeZd": comeZd,
                    "deposit": deposit,
                    "piaonumg": piaonumg,
                    "captcha": captcha,
                    "radio_type": radio_type,
                    "remark": remark
                };
                console.log(cdata);
                App.ajax('p', 'check_user_token', cdata, 'GET', function(r){
                    Model.submitAjaxForm(data);
                },function(r){
                    App.system(r.msg,1);
                    $("[action='submitindex']").html('立即免费领票');
                    $("[action='submitindex']").removeAttr('disabled');
                });
            });*/
            $(document).on("click","[action='submitindex']",function(){
                var form = $(this).parents('.form');
                var name = $(form).find(":input[name='name']").val();
                var telphone= $(form).find(":input[name='phone']").val().replace("-","").replace(" ","");
                //var xqname=$(form).find(":input[name='xqmc']").val();
                //var piaonumt=$(form).find(":input[name='piaonumt']").val();
                //var radio_type_hi=$(form).find(":input[name='radio_type']").val();
                //var captcha = $(form).find('input[name="code"]').val();
                var patrn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                var regName = /^[_\-\~\!\@\#\$\%\^\&\*\(\)\|\,\，\?\？\>\<\.\/\}\{\;\；\'\》\《\。]+$/;//过滤英文字母

                if(!patrn.test(telphone)){
                    App.system('请输入正确的手机号！',1);
                    $(form).find(":input[name='phone']").select();
                    return false;
                }
                if(name.length < 2){
                    App.system('您输入的联系人姓名无效！',1);
                    $(form).find(":input[name='name']").select();
                    return false;
                }else{
                    if(true==regName.test(name)){
                        App.system('您输入的联系人姓名无效！',1);
                        $(form).find(":input[name='username']").select();
                        return false;
                    }
                }

                var data = {
                    'name':name,
                    'phone':telphone
                };
                Model.submitAjaxForm(data, telphone);
            });

             //提交验证
           /* $(document).on("click","[action='submit']",function(){
                var form = $(this).parents('.form');
                var name = $(form).find(":input[name='name']").val();
                var telphone= $(form).find(":input[name='phone']").val().replace("-","").replace(" ","");
                var xqname=$(form).find(":input[name='xqmc']").val();
                var piaonumt=$(form).find(":input[name='piaonumt']").val();
                var radio_type_hi=$(form).find(":input[name='radio_type']").val();
                var captcha = $(form).find('input[name="code"]').val();
                var patrn = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                var regName = /^[_\-\~\!\@\#\$\%\^\&\*\(\)\|\,\，\?\？\>\<\.\/\}\{\;\；\'\》\《\。]+$/;//过滤英文字母

                if(!patrn.test(telphone)){
                    App.system('请输入正确的手机号！',1);
                    $(form).find(":input[name='phone']").select();
                    return false;
                }
                if(name.length < 2){
                    App.system('您输入的联系人姓名无效！',1);
                    $(form).find(":input[name='name']").select();
                    return false;
                }else{
                    if(true==regName.test(name)){
                        App.system('您输入的联系人姓名无效！',1);
                        $(form).find(":input[name='username']").select();
                        return false;
                    }
                }
                if($(form).find('.verify-code').lengh>0){
                    if(!RegExp(/^[a-zA-Z0-9]$/).test($(form).find('.verify-code').val())){
                        App.system('请输入验证码',1);
                        return false;
                    }
                }
                $(this).html('<img class="load-img" style="display:inline;" src="/static/m/images/load.gif" width="16">'+'正在加载');
                $(this).attr("disabled", "disabled");

                var hmac = $(form).find('#hmac').val(),
                    newid = $(form).find('#newid').val(),
                    comeZd = $(form).find('#comeZd').val(),
                    deposit = $(form).find('#deposit').val(),
                    piaonumg = $(form).find('#piaonumg').val(),
                    remark = $(form).find('#remark').val(),
                    radio_type = $(form).find('#radio_type').val();

                var data = {
                    "phone": telphone,
                    "name": name,
                    "hmac": hmac,
                    "newid": newid,
                    "comeZd": comeZd,
                    "deposit": deposit,
                    "piaonumg": piaonumg,
                    "captcha": captcha,
                    "radio_type": radio_type,
                    "remark": remark
                };

                Model.submitAjaxForm(data, telphone);
            });*/

            //底部悬浮动画
           /* $(document).on("click",".fix-wrap .close",function(){
                $('.bottom-sign').animate({'left': '-150%'}, 800, function(){
                    var wW = ($(window).width() - Model.data.width)/2;
                    if(wW < 125) {
                        $('.bottom-show-left').animate({'left': '-130px'}, 200);
                        // $('.bottom-show-left').animate({'left': '-172px'}, 200);
                    } else {
                        $('.bottom-show-left').animate({'left': 0}, 200);
                    }
                    flag = true;
                });
            });*/

            // 输入框姓名提示语
            $('input[name="name"]').bind('input propertychange', function() {
                var $this = $(this);
                var $name = $this.next('.name-message');
                if ($this.val().length >　0) {
                    $name.show();
                } else {
                    $name.hide();
                }
            });

            //输入框提示语
            this.renderInputMessage($bminput);

            //表单提示语
            // $(document).on('focus','.form .base-input input',function(){
            // 	$(this).next().hide();
            // 	$(this).parent().addClass('active');
            // });

            // $(document).on('blur','.form .base-input input',function(){
            // 	$(this).parent().removeClass('active');
            // 	if($(this).val() == ""){
            // 		$(this).next().show();
            // 	}
            // });

            // $(document).on('focus','.form .verify-input input',function(){
            // 	$(this).parent().addClass('active');
            // });

            // $(document).on('blur','.form .verify-input input',function(){
            // 	$(this).parent().removeClass('active');
            // });


            //点击即播放一分钟了解安团视频
            /*$(document).on('click','.about-at a',function(){
                // $(document).on('click','.info-wrap .know-more',function(){
                var html = $('#atvideo_tmpl').html();
                var nvideo = $('.small-player').length;
                if(nvideo == '0'){
                    $('.at-video').html(html);
                    $('.at-video video').trigger('play');
                }else{
                    return;
                }
            });*/

            //一分钟了解安团 小窗口视频关闭
            $(document).on('click','.small-player .js_close_atv',function(){
                $('.small-player').remove();
            });

            //口碑与心声
            $(document).on('click','.alibi-tab li',function(){
                var index = $('.alibi-tab li').index(this);
                $('.alibi-tab li').eq(index).addClass('active').siblings().removeClass('active');
                $('.tab-wrap .tab-box').eq(index).show().siblings().hide();
            });

            //业主问答
            $(document).on('click','.questions .question',function(){
                var $answerWrap = $(this).closest(".answer-wrap");
                var index = $answerWrap.index();
                $(".answer-wrap").find(".answer").stop().slideUp("slow");
                $(".answer-wrap").eq(index).find(".answer").stop().slideDown("slow");
            });

            // 推广开户公司名
            var atUrl = window.location.href;
            var $atName = $('.footer .copy-right');
            if (/10000.com/.test(atUrl)) {
                $atName.html('Copyright ©2005 - 2017 antuan.com All Rights Reserved.    易路同行网络科技（北京）有限公司 京ICP备10215789号-1');
            }

            //地图交互
            $('.main-wrap .map_main1').hover(function() {
                $(this).find('.map-mark').css('display','block');
            }, function() {
                $(this).find('.map-mark').css('display','none');
            });

            // 地图选项卡
            $(document).on('click', '.traffic-tab a', function() {
                var index = $('.traffic-tab a').index(this);
                $('.traffic-tab a').eq(index)
                    .addClass('active')
                    .siblings()
                    .removeClass('active');
                $('.traffic-content .traffic-contentlist').eq(index)
                    .removeClass('hidden')
                    .addClass('lx')
                    .siblings()
                    .addClass('hidden')
                    .removeClass('lx');
            });

            //判断是否存在验证码
            var cheight = $('.scrollup .scroll_main');
            if($('.verify-wrap').length > 0 ){
                cheight.css('height','60px');
            }

            // 输入框提示语
            $(document).on('click', '.name-message li', function() {
                var $this = $(this);
                var $name = $this.parents('.name-message');
                var $input = $name.prev('input[name="name"]');
                var val = $this.html();
                $name.hide();
                $input.val($input.val() + val);
            });

        },
        upSrcoll: function(){
            var _this = this;
            /*上下翻滚*/
            var speed=60;
            var scroll_area=document.getElementById("scroll_area");
            var scroll_main=document.getElementById("scroll_main");
            var scroll_origin=document.getElementById("scroll_origin");
            document.getElementById('scroll_area').innerHTML=document.getElementById('scroll_origin').innerHTML;
            function queen(){
                if(scroll_area.offsetTop-scroll_main.scrollTop<=0){
                    scroll_main.scrollTop -= scroll_origin.offsetHeight;
                }
                else{
                    scroll_main.scrollTop++;
                }
            }
            var myScroll=setInterval(queen,speed);
            document.getElementById('scroll_main').onmouseover=function() {clearInterval(myScroll)}
            document.getElementById('scroll_main').onmouseout=function() {myScroll=setInterval(queen,speed)}
        },
        scrollNav: function(index) {
            var offset = $("#floor" + index).offset().top;
            $('body,html').animate({
                scrollTop: offset
            }, 500);
        },
        bmForm:function(formId,value){
            switch(parseInt(value,10)){
                case 2:
                    $("#"+formId).find('#lable_name').text('小区/单位');
                    $("#"+formId).find('#lable_phone').text('联系电话');
                    $("#"+formId).find('#piaonumt').show();
                    $("#"+formId).find('#piaonumg').hide();
                    $("#"+formId).find('.personal').hide();
                    $("#"+formId).find('.team').show();
                    break;
                default:
                    $("#"+formId).find('#lable_name').text('小区名称');
                    $("#"+formId).find('#lable_phone').text('手机号码');
                    $("#"+formId).find('#piaonumt').hide();
                    $("#"+formId).find('#piaonumg').show();
                    $("#"+formId).find('.personal').show();
                    $("#"+formId).find('.team').hide();
            }
        },
        renderCountDown: function() {
            if (typeof STATUS == 'undefined' || !STATUS || +STATUS != 0) return;

            var time = EVENT_TIME;
            time = time.split(' ');
            var future = new Date(Date.UTC(time[0].split('-')[0], time[0].split('-')[1] - 1, time[0].split('-')[2], time[1].split(':')[0], time[1].split(':')[1]));
            // var future = new Date(Date.UTC(2016, 6, 29, 17, 58));

            var today = TIMESTAMP * 1000;

            var dur = Math.round((future.getTime() - today)) + future.getTimezoneOffset() * 60 * 1000;

            this.setCountDown(dur);
        },
        setCountDown: function(dur) {
            var _this = this;
            var time = App.getCountDown(dur, function(r) {
                $('.t_day0').html(r.day.slice(0, 1));
                $('.t_day1').html(r.day.slice(1, 2));
                $('.t_hour0').html(r.hour.slice(0, 1));
                $('.t_hour1').html(r.hour.slice(1, 2));
                $('.t_mini0').html(r.mini.slice(0, 1));
                $('.t_mini1').html(r.mini.slice(1, 2));
                $('.t_sec0').html(r.sec.slice(0, 1));
                $('.t_sec1').html(r.sec.slice(1, 2));
                if (dur < 0) {
                    $('.header_at .cou-get-time>p').css({
                        'text-align': 'center',
                        'font-size': '30px',
                        'line-height': '30px'
                    }).html('活动正在进行中');
                    return;
                }
                setTimeout(function() {
                    _this.setCountDown(dur - 1000);
                }, 1000);
            });
        },
        switchClassify:function($target){
            $target.addClass('active').siblings().removeClass('active');
            var code = $target.data('code');
            /*var name = $target.data('name');
            var id =  $target.data('id');
            var actid = $target.data('actid');*/
            //var data = {"name":name,"id":id,"actid":actid};
            var data = {"code":code};
            return data ;
        },
        loadMap: function() {
            var CITY_POINTX = +$('#at-map').data('pointx');
            var CITY_POINTY = +$('#at-map').data('pointy');
            //百度地图API功能
            function loadJScript() {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://api.map.baidu.com/api?v=2.0&ak=&ak=66uGxzFpgtYLALRb6ieZdSGtKjbC4kdu&s=1&callback=initMap";
                document.body.appendChild(script);
            }
            // 初始化地图
            window.initMap = function() {
                var map = new BMap.Map("at-map", {minZoom:6,maxZoom:15}); // 创建Map实例
                var point = new BMap.Point(CITY_POINTX,CITY_POINTY); // 创建点坐标
                var ICON = new BMap.Icon('/static/module/m/index/images/point_red.png', new BMap.Size(39, 25));
                map.panTo(point); // 设置地点居中
                map.centerAndZoom(point,15); // 设初始化地图
                var marker = new BMap.Marker(point, {icon: ICON});
                map.addOverlay(marker);
            }
            loadJScript();  //异步加载地图
        },
        codeinputShow: function() {
            var $focus = $('.form input[name="phone"]');
            var patrn = /^1[3|4|5|7|8]{1}[0-9]{9}$|^18\d{9}$/;

           /* $focus.bind('input propertychange', function() {
                if(patrn.test($focus.val())){
                    $('.form').find('.yzm-input').removeClass('hidden');
                    $('.scrollup .scroll_main').css('height', '32px');
                }
            });*/
        },
        addbmMemberTotal: function() {//计数入库
            var data = {
                phone: '',
                act_id: $('#act_id').val()
            };
            App.ajax('index', 'refer', data, 'POST', function(r) {
                console.log(r.reason);
            },function(r){
                console.log(r.reason);
            });
        },
        renderInputMessage: function($binput) {
            // 输入框姓名提示语
            $binput.bind('input propertychange', function() {
                var $this = $(this);
                var $name = $this.next('.name-message');
                if ($this.val().length >　0) {
                    $name.show();
                } else {
                    $name.hide();
                }
            });
        }
    };
    // 启动
    $(function(){
        View.init();
    });

    (function(window) {
        $(window).scroll(function() {
            //底部悬停
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            var	windowTop = $(window).scrollTop(); //监控窗口已滚动的距离;
            var	windowHeight = $(window).height();//浏览器窗口的高度*/
            var specialTop = $('.at-special').offset().top;
            var floor1Top = $('#floor1').offset().top;
            var historyTop = $('#floor9').length ? $('#floor9').offset().top : 0;
            //底部报名及侧边导航
           /* if(t > 0) {
                $(".bottom-sign").fadeIn(500);
            }else{
                $(".bottom-show-left").css({'left': '-172px'});
                $('.bottom-sign').css({'left': '0','display':'none'});
            }*/

            // if(windowTop + windowHeight > floor1Top + 830){
            if(windowTop + windowHeight > floor1Top + 850){
                $(".leftslider").fadeIn();
            }else{
                $(".leftslider").fadeOut();
            }

            //滚动至特价图片时加载特价图片
            if(t > specialTop){
                $(".special_wrap .speciallist").find("img.lazy").lazyload();
            }

            if((historyTop > 0 )&& (t > historyTop)){
                $('#s-slide-history img').each(function(){
                    var $this = $(this);
                    var src = $this.data('original');
                    $this.attr("src",src);
                })
                // $("#s-slide-history").find("img.lazy").lazyload({failure_limit:60,skip_invisible : false});
                // $("#floor9").find("img.lazy").lazyload();
            }

            //滚动加载业主现身说法视频
            var video_finished = true;//触发开关，防止多次调用事件
            var $video_yezhu = $('.yzsp-wrap');
            var voiceHeight = $('.at-voice').offset().top;
            if(t > (voiceHeight - 500) ){
                if ($video_yezhu.length == 0) {
                    var html = $('#yzsp_tmpl').html();
                    if(video_finished == true){
                        video_finished = false;
                        $('.warn').html(html);
                    }
                }
            }


            var scrollTop = $(window).scrollTop() + ($(window).height() * 1/4);
            // var floornum = $(".leftslider li.fnav").size();
            var floornum = 13;
            for(var i = 1; i <= floornum; i++) {
                if(!$('#floor' + i).length) {
                    return;
                }
                var preOffset = $('#floor' + i).offset().top;
                var backOffset = $('#floor' + (i + 1)).length ? $('#floor' + (i + 1)).offset().top : '';
                var flag = i != floornum ? !!(scrollTop > (preOffset) && scrollTop < (backOffset)) : !!(scrollTop > (preOffset));
                if (flag) {
                    $('.fl' + i).addClass('active').siblings().removeClass('active');
                }
            }
        });

        function navStyle(){
            var w_width = $(window).width();
            if(w_width <= 1190){
                Model.data.width = 980;
            }
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if(w_width >1280){
                // $(".leftslider").show();
            }else{
                $(".leftslider").remove();
            }
        }
        $(function() {
            navStyle();
        });

        window.onresize = function(){
            navStyle();
        };
    })(window);
})();