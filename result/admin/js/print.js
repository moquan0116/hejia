
var date = moment().format('YYYY-MM-DD HH:mm:ss');
//jquery打印插件
function control_print(param) {
    $(param).print({
        globalStyles: true,
        mediaPrint: false,
        stylesheet: null,
        noPrintSelector: ".no-print",
        iframe: true,
        //append: '',
        //prepend: '',
        manuallyCopyFormValues: true,
        deferred: $.Deferred(),
        timeout: 750,
        title: null,
        doctype: '<!doctype html>'
    });
}

//打印控制方法
function print_test(callback) {
    var url = arguments[1] ? arguments[1] : null;

    if(url !== null && url !== undefined){
        get_data_test(url,callback,control_print);
    }else{
        control_print(callback());
    }
}

//打印请求后台数据
function get_data_test(url,callback,callback1) {
    $.ajax({
        type: "GET",
        url: url,
        //data:formData,
        processData: false,
        async: true,
        contentType: false,
        dataType:"JSON",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        },
        success: function (data) {
            var ele = callback(data);
            //diy表格
            if(callback && callback instanceof Function)
            if($.isEmptyObject(data) || !$(ele).length){
                return false;
            }

            //调用打印
            if(callback1 && callback1 instanceof Function)
                callback1(ele);
            return true;
        }
    });
}

//生成table
function make_table(data,head) {
    var table = $(
        "<table class='table table-bordered text-center'>"+
        "<thead></thead>"+
        "<tbody></tbody>"+
        "</table>"
    );
    //表格标题th

    table.children("thead").append(generate_tr(head));

    //表格列表td
    $(data).each(function (m,n) {
        table.children("tbody").append(generate_tr(head,n));
    });

    return table;
}

//生成table tr
function generate_tr(head) {
    var obj = arguments[1] ? arguments[1] : {};
    var tr = $("<tr></tr>");

    $.each(head,function (key,val) {
        if($.isEmptyObject(obj)){
            tr.append("<th  class='"+key+"'>"+val+"</th></tr>");
        }else if(key in obj){
            tr.append("<td  class='"+key+"'>"+obj[key]+"</td></tr>");
        }
    });

    return tr;
}

//表格顶部添加元素
function add_top(table,top) {
    var block = $("<div></div>");
    var row = $("<div class='row'></div>");
    var col = $("<div>"+
                    "<div class='input-group'>"+
                        "<h4>" +
                            "<small class='name'></small>:<span class='val'></span>" +
                        "</h4>"+
                    "</div>"+
              "</div>");

    $.each(top,function (k,v) {
        var t = col.clone();
        t.find('.name').html(v.name);
        t.find('.val').html(v.val);
        if($(v.css).length > 0 && v.css.hasOwnProperty("col")){
            $(t).addClass('col-xs-'+v.css.col);
        }
        row.append(t);
    });

    block.append(table);
    $(table).before(row);
    return block;
}

//打印footer
/*
function footer() {
    return $("<div class='row' id='footer'></div>")
                .append("<div class='col-xs-4 pull-right'>日期:"+date+"</div><div class='col-xs-4 pull-right'>制单人:"+admin_name+"</div>");
}*/
