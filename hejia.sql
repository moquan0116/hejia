/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 100108
Source Host           : localhost:3306
Source Database       : hejia

Target Server Type    : MYSQL
Target Server Version : 100108
File Encoding         : 65001

Date: 2017-12-07 18:39:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hj_reg_user
-- ----------------------------
DROP TABLE IF EXISTS `hj_reg_user`;
CREATE TABLE `hj_reg_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_reg_user
-- ----------------------------

-- ----------------------------
-- Table structure for hj_sys_module
-- ----------------------------
DROP TABLE IF EXISTS `hj_sys_module`;
CREATE TABLE `hj_sys_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `d` varchar(100) DEFAULT NULL,
  `c` varchar(100) DEFAULT NULL,
  `m` varchar(100) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `sort` int(11) NOT NULL DEFAULT '9999',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1可用 0不可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='系统模块表';

-- ----------------------------
-- Records of hj_sys_module
-- ----------------------------
INSERT INTO `hj_sys_module` VALUES ('1', '用户列表', null, 'user', 'userManagement', 'index', '0', '9999', '1');
INSERT INTO `hj_sys_module` VALUES ('2', '商品管理', null, null, null, null, null, '9999', '1');
INSERT INTO `hj_sys_module` VALUES ('3', '商品列表', null, null, null, null, '2', '9999', '1');
INSERT INTO `hj_sys_module` VALUES ('4', '品牌列表', null, null, null, null, '2', '9999', '1');

-- ----------------------------
-- Table structure for hj_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `hj_sys_user`;
CREATE TABLE `hj_sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `loginname` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL COMMENT '电话',
  `email` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `lastlogin_date` datetime DEFAULT NULL COMMENT '最后登陆时间',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1可用0不可用',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `department_id` int(11) NOT NULL COMMENT '部门ID',
  `open_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='平台用户表';

-- ----------------------------
-- Records of hj_sys_user
-- ----------------------------
INSERT INTO `hj_sys_user` VALUES ('1', '超级管理员', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '', null, null, null, '2017-12-07 16:01:47', '1', '0', '0', null);
SET FOREIGN_KEY_CHECKS=1;
