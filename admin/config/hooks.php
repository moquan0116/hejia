<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/
/*
 * 在控制器实例化之后立即执行，控制器的任何方法都还尚未调用。
 * Auth 登录认证
 * Menus 生成菜单
 */
$hook['post_controller_constructor'][] = array(
    'class'    => 'Auth',
    'function' => 'judgeLoginStatus',
    'filename' => 'Auth.php',
    'filepath' => 'hooks'
);

$hook['post_controller_constructor'][]=array(
    'class' => 'Menus',
    'function'=>'outPutMenus',
    'filename'=>'Menus.php',
    'filepath' => 'hooks'
);