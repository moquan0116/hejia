
/**
 * 获取一个input[type=file]的预览对象的URL
 * @param {type} obj input的dom对象
 * @returns {obj.value}
 */
function getFileUrl(obj) {
    var url;
    var ua = navigator.userAgent;
    if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE 
        return obj.value;
    }
    if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox
        return window.URL.createObjectURL(obj.files.item(0));
    }
    if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome
        if(obj.files.length===0){
            return null;
        }
        return  window.URL.createObjectURL(obj.files.item(0));
    }
    if(navigator.userAgent.indexOf("Safari")){   //IOS
        return  window.URL.createObjectURL(obj.files.item(0));
    }
}

/**
 * 列表页删除按钮确认框
 * @param {string} mes 提示消息
 * @param {string} jump 确认以后要跳转的地址
 * @returns {undefined}
 */
function delete_row(mes,jump){
    /*console.log(jump)
    if(confirm(mes)===true){
        window.location.href=jump;
    }else{
        //什么也不做
    }*/
    layer.confirm(mes, function (index) {
        window.location.href = jump;
        layer.close(index);
    });
}

//图像上传组件
$("[data-imgupload] .mailbox-attachments input[type=file]").on("change", function () {   //input的value改变的时候展示预览到img元素
    var data = getFileUrl(this);
    //alert(data);
    $(this).parents("li").find(".mailbox-attachment-icon>img").attr("src", data);
});
$("[data-imgupload] .mailbox-attachments input[type=file]").each(function () {   //后退到当前页面以后把input的value清空
    $(this).val("");    //后退的时候    
});

//分类选择器组件
$("[data-classselect]").each(function () {   //添加所有分类到select
    var classselect = $(this);    //当前一级分类select jquery对象
    var classselect_one = classselect.find(".classselect-one"); //
    var classselect_two = classselect.find(".classselect-two"); //
    var all_class_one = classselect.data("all_class_one");    //所有1j的数据
    var all_class_two = classselect.data("all_class_two");    //所有2j的数据  
    //console.table(all_class_one);
    //console.table(all_class_one);
    classselect_one.children(":not(:first)").remove();    //清空option
    //console.log(classselect_one);
    
    for (i = 0; i < all_class_one.length; i++) {
        var one = all_class_one[i];
        classselect_one.append("<option value='" + one.class_code + "'>" + one.class_name + "</option>");   
    }
    
    
    classselect_one.change(function () { //
        //alert();
        var classselect = $(this).parents("[data-classselect]");    //当前选中的一级分类select jquery对象
        //var classselect_one = classselect.find(".classselect-one"); //
        //var classselect_two = classselect.find(".classselect-two"); //
        //var all_class_one = classselect.data("all_class_one");    //
        //var all_class_two = classselect.data("all_class_two");    //
        //console.table(all_class_one);
        //console.table(all_class);

        var class_one_code = $(this).val();    //当前1j
        //console.log(classselect_two.children(":not(:first)"));
        classselect_two.children(":not(:first)").remove();    //清空option
        //return;
        //classselect_two.append("<option value=''>" + "请选择" + "</option>"); //添加一个option
        //return;
        for (i = 0; i < all_class_two.length; i++) {
            var class_two = all_class_two[i];
            //console.log(class_two.class_one_code , class_one_code);
            if (class_two.class_one_code == class_one_code) {
                classselect_two.append("<option value='" + class_two.class_two_code + "'>" + class_two.class_two_name + "</option>");//添加一个option
            }
        }
        $(classselect_two).trigger("change");
        
    });
    
    var default_one_code = $(classselect_one).data("default");  //默认一级分类
    var default_two_code = $(classselect_two).data("default");  //默认二级分类
    //alert("option[value="+default_one_code+"]");
    if(default_one_code){
        $(classselect_one).find("option[value="+default_one_code+"]").attr("selected",true);
    }else{
        $(classselect_one).find("option:first").attr("selected",true);
    }
    $(classselect_one).trigger("change");
    if(default_two_code){
        $(classselect_two).find("option[value="+default_two_code+"]").attr("selected",true);
    }else{
        $(classselect_two).find("option:first").attr("selected",true);
    }
    //$(classselect_two).trigger("change");
});
//分类选择组件结束

//选中表格检索部分下拉框时提交表单
$(".box-tools select").change(function(){
    var other_select = $(this).parents('.area').nextAll('.area').find('select');
    other_select.each(function (k,v) {
        $(v).val('');
    });
    $(this).parents("form").submit();
});
//列表表头部分选择以后提交检索表单
$(".box-body table thead select").change(function(){
    $(this).parents("form").submit();
});

function change_select_style(jq_select){   //1.jq_select的值为空时字体设为灰色，否则去掉灰色 2.父级的form-group下的所有select表情都有值时添加has-success的class

    if(jq_select.val() == ''){    //当前select没选中时设为灰色
        jq_select.css("color","#999");
    }else{  //选中时去掉灰色
        jq_select.css("color","");
    }
    var form_group_success;
    jq_select.parents(".form-group").find("select").each(function(){
        if($(this).val() == ""){    //有为空的select时form_group_success设为false并退出
            form_group_success = false;
            return false;
        }else{
            form_group_success = true;
        }
    })
    if(form_group_success){
        jq_select.parents(".form-group").addClass("has-success");
    }else{
        jq_select.parents(".form-group").removeClass("has-success");
    }
}

//表单的select选中非空时添加has-success样式
$(".form-horizontal select").each(function(){
    change_select_style($(this));
    $(this).on("change",function(){
        change_select_style($(this));
    });
});

//后退
function back() {
    window.history.back();
}

    //合并数组
    function mergeArray( arr1, arr2) {
        for ( var i = 0; i < arr2.length; i++){
            if( !inArray( arr2[i] ,arr1 ) ){
                arr1.push( arr2[i] );
            }
        }
        return arr1;
    }
    //数组中是否存在某个元素
    function inArray( needle, array ) {
        for ( var item in array ){
            if( array[item] == needle ){
                return true;
            }
        }
        return false;
    }
    //从数组中删除指定的元素
    function arrayDel( val, arr ) {
        for( var i = 0; i < arr.length; i++ ) {
            if( arr[i] == val ) {
                arr.splice( i, 1 );
                break;
            }
        }
    }


 /*
  * 
  * */
 /*function outputMsg( data, layer, parent) {
     var msg = '';
     $.each( data.msg, function (k,v) {
         msg += v+'</br>';
     });
     layer.msg( msg );
     if( data.errorCode != 200){
         return false;
     }else{
         setTimeout(function () {
             parent.location.reload();
         },1000);
     }
 }*/



