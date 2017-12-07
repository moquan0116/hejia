/**
 * Created by Administrator on 2017/12/7.
 */
// 模板代码，直接粘贴复制使用，注释部分可删除
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
            var city_name = $('#city_name').val();
            /*			if(city_name){
             setCookie("city_cookie",city_name,"h20",{ path:'/'});
             }

             $(document).on('click','.search .region a,.hot .hot-city a',function(){
             var city = $(this).html();
             setCookie("city_cookie",city,"h20",{ path:'/'});
             });

             $(document).on('click','.city-box .enter a',function(){
             var city = '合肥';
             setCookie("city_cookie",city,"h20",{ path:'/'});
             });*/

            var city_txt = $('.header_city .city_name>a');
            /*			if(getCookie("city_cookie")){
             if(getCookie("city_cookie"))
             $(city_txt).html(getCookie("city_cookie"));
             else if(city_name)
             $(city_txt).html(city_name);
             }else{
             $(city_txt).html('合肥');
             }*/

            if(city_name)
                $(city_txt).html(city_name + '站');

            function getCookie(name){
                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                if(arr=document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            }

            function delCookie(name){
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval=getCookie(name);
                if(cval!=null)
                    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
            }

            function setCookie(name,value,time){
                var strsec = getsec(time);
                var exp = new Date();
                exp.setTime(exp.getTime() + strsec*1);
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
            }
            function getsec(str){
                // alert(str);
                var str1=str.substring(1,str.length)*1;
                var str2=str.substring(0,1);
                if (str2=="s"){
                    return str1*1000;
                }else if (str2=="h"){
                    return str1*60*60*1000;
                }else if (str2=="d"){
                    return str1*24*60*60*1000;
                }
            }
            // //这是有设定过期时间的使用示例：
            // //s20是代表20秒
            // //h是指小时，如12小时则是：h12
            // //d是天数，30天则：d30
            // // setCookie("name","hayden","s20");

            //切换城市
            $(document).on('click','[action="exchane_city"]',function(){
                $('.city-mark,.city-change').show();

                //点击字母
                $('.spell dd a').on('click',function(){
                    var letter_rel = $(this).attr('rel_link');
                    var a = $(this).text().toLowerCase();
                    $('.spell dd a').removeClass('active');
                    $(this).addClass('active');
                    //首字母选择城市
                    $('.spell a,.region a').removeClass('active');
                    $('[rel_link="'+a+'"]').addClass('active');

                });
            });

            //关闭弹窗
            $(document).on('click','[action="city-close"]',function(){
                $('.city-mark,.city-change').hide();
            });

            //头部个人中心交互
            $(document).on('mouseenter', '.js_user_name', function() {
                var $this = $(this);
                $this.find('ul').show();
                $this.find('.my_name').css({
                    'border':'1px solid #dcdcdc',
                    'border-bottom':'0 none',
                    'background':'#fff'
                });
                $this.find('ul').css({
                    'border':'1px solid #dcdcdc',
                    'border-top':'0 none',
                    'background':'#fff'
                });
            });
            $(document).on('mouseleave', '.js_user_name', function() {
                var $this = $(this);
                $this.find('ul').hide();
                $this.find('.my_name').css({
                    'border-color':'transparent',
                    'background':'#f2f2f2'
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