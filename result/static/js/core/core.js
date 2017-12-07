/**
 * Created by Administrator on 2017/12/7.
 */
var pagenation = function(target, total, pagesize, isajax, callback, url) {
    if (isajax) {
        $(target)
            .paginate(total, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4,
                items_per_page: pagesize,
                callback: callback,
                prev_text: "&lt;上一页",
                next_text: "下一页&gt;",
                first_init: false
            });
        return;
    }

    url = (url ? url : location.href);
    url = url.replace(/[&]page=\d+/ig, '');//替换＆page=2这个为空

    if(url.indexOf('page') != -1 )//替换page=2这个为空
        url = url.replace(/page=\d+/ig, '');

    if (url.indexOf('?') == url.length - 1) url = url.substr(0, -1);

    $(target)
        .paginate(total, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 8,
            items_per_page: pagesize,
            prev_text: "&lt;上一页",
            next_text: "下一页&gt;",
            link_to: url + (url.indexOf('?') == -1 ? '?' : '&') + "page=__id__"
        });
}

var request = function(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

$.appdialog = {
    /**
     * 模态框
     * @param object options 参数配置
     * @param string id 模态框ID
     */
    open : function(options, id){
        //默认参数配置
        this.options = {
            width  : 600,
            height : 300,
            modal  : true,
            show   : {'effect':'fade'},
            hide   : {'effect':'fade'}
        };

        //合并参数配置
        options = $.extend(this.options, options);

        //调用模态框
        var obj = id ? $('#' + id) : $('#dialog');
        obj.html(options.content).dialog({
            width       : options.width,
            height      : options.height,
            modal       : options.modal,
            draggable   : options.draggable,
            position    : options.position,
            show        : options.show,
            hide        : options.hide,
            bgiframe    : true,
            resizable   : false,
            dialogClass : 'ui-' + id,
            closeText   : '关闭',
            title       : options.title,
            buttons     : options.buttons,
            close       : options.close
        });
    },

    /**
     * 模态框
     * @param string msg 提示消息
     * @param string id 模态框ID
     */
    error : function(msg, id){
        //调用模态框
        var obj = id ? $('#' + id) : $('#dialog');
        obj.html(msg).dialog({
            width       : 320,
            height      : 160,
            modal       : true,
            show        : {'effect':'shake'},
            hide        : {'effect':'fade'},
            bgiframe    : true,
            resizable   : false,
            dialogClass : 'ui-' + id,
            closeText   : '关闭',
            title       : '温馨提示',
            buttons     : {
                '确定' : function(){
                    $(this).dialog('close');
                }
            }
        });
    }

};

jQuery.fn.outerHTML = function (s) {
    return (s) ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
}