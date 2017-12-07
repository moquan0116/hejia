<?php
/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2017-08-07
 * Time: 15:03
 */

/*
 * 不需要登录的文件夹
 * ["d"=>"wechat/"]
 */
$config['ignore']['dir']=array();
/*
 * 不需要登录的文件夹/控制器/*
 * ["d"=>"d","c"=>"c"]
 */
$config['ignore']['dirController']=array(
    ["d"=>NULL,"c"=>"sign"]

);
/*
 * 不需要登录的 文件夹/控制器/方法
 * ["d"=>"d","c"=>"c","m"=>"m"]
 */
$config['ignore']['dirControllerFunction']=array();