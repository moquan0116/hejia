/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 100108
Source Host           : localhost:3306
Source Database       : hejia

Target Server Type    : MYSQL
Target Server Version : 100108
File Encoding         : 65001

Date: 2017-12-08 08:09:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hj_brand
-- ----------------------------
DROP TABLE IF EXISTS `hj_brand`;
CREATE TABLE `hj_brand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `classCode` varchar(255) DEFAULT NULL,
  `brandCode` varchar(50) DEFAULT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_brand
-- ----------------------------
INSERT INTO `hj_brand` VALUES ('1', 'BR20170326', 'BR20171207113721', '嘉禾布艺', '1');
INSERT INTO `hj_brand` VALUES ('2', 'CL20171208121707', 'BR20171208121803', '4546', '1');

-- ----------------------------
-- Table structure for hj_class
-- ----------------------------
DROP TABLE IF EXISTS `hj_class`;
CREATE TABLE `hj_class` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `classCode` varchar(50) DEFAULT NULL,
  `className` varchar(30) DEFAULT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_class
-- ----------------------------
INSERT INTO `hj_class` VALUES ('1', 'BR20170326', '墙纸布艺', '1');
INSERT INTO `hj_class` VALUES ('2', 'BR20170325', '开关灯具', '1');
INSERT INTO `hj_class` VALUES ('3', 'CL20171208121559', '在此', '1');
INSERT INTO `hj_class` VALUES ('4', 'CL20171208121707', '2254', '1');
INSERT INTO `hj_class` VALUES ('5', 'CL20171208121744', '敀', '1');

-- ----------------------------
-- Table structure for hj_goods
-- ----------------------------
DROP TABLE IF EXISTS `hj_goods`;
CREATE TABLE `hj_goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goodsCode` varchar(50) NOT NULL,
  `goodsName` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL COMMENT '标题',
  `subscribeNum` int(11) DEFAULT NULL COMMENT '预约数',
  `marketPrice` decimal(10,2) DEFAULT NULL COMMENT '市场价',
  `hePrice` decimal(10,2) DEFAULT NULL COMMENT '和家价',
  `image` varchar(255) DEFAULT NULL COMMENT '商品图片',
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_goods
-- ----------------------------
INSERT INTO `hj_goods` VALUES ('1', 'GS20171207095955', 'TATA木门后时代镜风@001金楸色', '2100*900*240 每户限购2樘，满5000元起订', null, '3599.00', '1099.00', 'http://localhost/hejia/uploads/images/2017/20171207/20171207215955811_283_283.jpg', '1');
INSERT INTO `hj_goods` VALUES ('2', 'GS20171207100839', '箭牌花洒 AMG12G816', '顶喷可旋转 限量300套', null, '899.00', '599.00', 'http://localhost/hejia/uploads/images/2017/20171207/20171207220839897_283_283.jpg', '1');

-- ----------------------------
-- Table structure for hj_subscribe_user
-- ----------------------------
DROP TABLE IF EXISTS `hj_subscribe_user`;
CREATE TABLE `hj_subscribe_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_subscribe_user
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='系统模块表';

-- ----------------------------
-- Records of hj_sys_module
-- ----------------------------
INSERT INTO `hj_sys_module` VALUES ('1', '用户列表', null, 'user', 'userManagement', 'index', '0', '9999', '1');
INSERT INTO `hj_sys_module` VALUES ('2', '商品列表', null, 'goods', 'goodsManagement', 'index', '0', '9999', '1');
INSERT INTO `hj_sys_module` VALUES ('3', '品牌列表', null, 'brand', 'brandManagement', 'index', '4', '9997', '1');
INSERT INTO `hj_sys_module` VALUES ('4', '品牌管理', null, '', null, null, '0', '9999', '1');
INSERT INTO `hj_sys_module` VALUES ('5', '分类列表', null, 'class', 'classManagement', 'index', '4', '9998', '1');

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
INSERT INTO `hj_sys_user` VALUES ('1', '超级管理员', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '', null, null, null, '2017-12-07 20:30:11', '1', '0', '0', null);
