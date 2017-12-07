<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/11/2
 * Time: 16:10
 */

$config = array(
    'goods/add' => array(
        array(
            'field' => 'goodsName',
            'label' => '商品名称',
            'rules' => 'required',
            'errors' => array(
                'required' =>  '%s不能为空',
            )
        ),
        array(
            'field' => 'caption',
            'label' => '标题',
            'rules' => 'required',
            'errors' => array(
                'required' =>  '%s不能为空',
            )
        ),
        array(
            'field' => 'marketPrice',
            'label' => '市场价',
            'rules' => 'required',
            'errors' => array(
                'required' =>  '%s不能为空',
            )
        ),
        array(
            'field' => 'hePrice',
            'label' => '和家价',
            'rules' => 'required',
            'errors' => array(
                'required' =>  '%s不能为空',
            )
        )
    ),
    'brand/add' => array(
        array(
            'field' => 'classCode',
            'label' => '分类名称',
            'rules' => 'required',
            'errors' => array(
                'required' =>  '%s不能为空',
            )
        ),
        array(
            'field' => 'brandName',
            'label' => '品牌名称',
            'rules' => 'required',
            'errors' => array(
                'required' =>  '%s不能为空',
            )
        )
    ),
);