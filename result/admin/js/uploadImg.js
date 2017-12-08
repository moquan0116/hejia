/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * 获取一个input[type=file]的预览对象的URL
 * @param {type} obj input的dom对象
 * @returns {obj.value}
 */
function getFileUrl(obj) {
    var url;
    if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE 
        url = obj.value;
    } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox 
        url = window.URL.createObjectURL(obj.files.item(0));
    } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome 
        if(obj.files.length===0){
            return null;
        }
        url = window.URL.createObjectURL(obj.files.item(0));
    }
    return url;
}

//图像上传组件
$("[data-imgupload] .mailbox-attachments input[type=file]").on("change", function () {   //input的value改变的时候展示预览到img元素
    var data = getFileUrl(this);
    $(this).parents("li").find(".mailbox-attachment-icon>img").attr("src", data);
});
$(".mailbox-attachments input[type=file]").each(function () {   //后退到当前页面以后把input的value清空
    $(this).val("");    //后退的时候
    
});

