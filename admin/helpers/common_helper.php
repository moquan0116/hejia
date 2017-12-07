<?php

if (!function_exists('getRelativePath')) {
    /**
     * 获取$path相对$compareTo的路径 摘自php官网 http://php.net/manual/en/function.realpath.php#97885
     * @param type $path    经过realpath()整理过以后的规范化“绝对路径”
     * @param type $compareTo   经过realpath()整理过以后的规范化“绝对路径”
     * @return type
     */
    function getRelativePath($path, $compareTo) {
        // clean arguments by removing trailing and prefixing slashes
        if (substr($path, -1) == '/') {
            $path = substr($path, 0, -1);
        }
        if (substr($path, 0, 1) == '/') {
            $path = substr($path, 1);
        }

        if (substr($compareTo, -1) == '/') {
            $compareTo = substr($compareTo, 0, -1);
        }
        if (substr($compareTo, 0, 1) == '/') {
            $compareTo = substr($compareTo, 1);
        }
        // simple case: $compareTo is in $path
        if (strpos($path, $compareTo) === 0) {
            $offset = strlen($compareTo) + 1;
            return substr($path, $offset);
        }

        $relative = array();
        $pathParts = explode('/', $path);
        $compareToParts = explode('/', $compareTo);

        foreach ($compareToParts as $index => $part) {
            if (isset($pathParts[$index]) && $pathParts[$index] == $part) {
                continue;
            }

            $relative[] = '..';
        }

        foreach ($pathParts as $index => $part) {
            if (isset($compareToParts[$index]) && $compareToParts[$index] == $part) {
                continue;
            }

            $relative[] = $part;
        }

        return implode('/', $relative);
    }

}
/*
 *  print_r  函数简写
 */
if (!function_exists('p')) {

    function p($p, $return = FALSE) {
        return print_r($p, $return);
    }

}
/*
 * var_dump 函数的简写
 */
if (!function_exists('v')) {

    function v() {
        call_user_func_array("var_dump", func_get_args()); //func_get-args 返回一个包含函数参数列表的数组
    }

}

/**
 * 获取当前时间的字符串形式 例：2016-01-01 01:01:01
 */
if (!function_exists('current_time')) {
    function current_time(){
        return date('Y-m-d H:i:s');
    }
}

if(!function_exists('creat_ajax_url')){

    function creat_ajax_url($uri = '', $p = null, $protocol = null) {
        $CI = &get_instance();

        $url ='./'.$uri;

        if (is_string($p)) {
            $url .="?" . $p;
        } elseif (is_array($p) or is_object($p)) {
            $url .="?" . http_build_query($p); //将一个数组转化为url后面的参数字符串（数组和对象）
        } else {

        }
        return $url;
    }
}

if(!function_exists('create_code')){

    function create_code($len=0,$type,$pre=0,$time=FALSE){
        $new='';
        if($pre){
            $len=$len-strlen($pre);
            $new.=$pre;
        }
        if($time){
            $time=date('YmdHis');
            $len=$len-strlen($time);
            $new.=$time;
        }
        if($len>0){
            $string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if ($type == 'upper') {
                for ($i = 0; $i < $len; $i++) {
                    $new .= $string[mt_rand(36, 61)];
                }
                return $new;
            }
            if ($type == 'lower') {
                for ($i = 0; $i < $len; $i++) {
                    $new .= $string[mt_rand(10, 35)];
                }
                return $new;
            }
            if ($type == 'number') {
                for ($i = 0; $i < $len; $i++) {
                    $new .= $string[mt_rand(0, 9)];
                }
                return $new;
            }
            if($type == 'mix'){
                for ($i = 0; $i < $len; $i++) {
                    $new .= $string[mt_rand(0,61)];
                }
                return $new;
            }
        }
          return $new;
    }
}
