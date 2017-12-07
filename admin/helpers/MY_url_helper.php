<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2017-08-07
 * Time: 14:13
 */
if (!function_exists('creat_url')) {
    /*
     * 扩展
     * @param   type
     * @param   array $p get 参数
     * @param   type  $protocol http https ftp ...
     * @return  type
     */

    function creat_url($uri = '', $p = null, $protocol = null) {
        $CI = &get_instance();

        $url = $CI->config->site_url($uri, $protocol);

        if (is_string($p)) {
            $url .="?" . $p;
        } elseif (is_array($p) or is_object($p)) {
            $url .="?" . http_build_query($p); //将一个数组转化为url后面的参数字符串（数组和对象）
        } else {

        }
        return $url;
    }

}
if (!function_exists('current_url')) {
    /**
     * 获取当前访问的url http访问下有效
     * @return string
     */
    function current_url()
    {
        $query_string = $_SERVER["QUERY_STRING"];
        $CI = &get_instance();
        $url = $CI->config->site_url($CI->uri->uri_string());
        $url .= $query_string ? '?' . $query_string : '';
        return $url;
    }
}