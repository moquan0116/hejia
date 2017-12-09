/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 100108
Source Host           : localhost:3306
Source Database       : hejia

Target Server Type    : MYSQL
Target Server Version : 100108
File Encoding         : 65001

Date: 2017-12-09 18:59:47
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
  `image` varchar(255) DEFAULT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_brand
-- ----------------------------
INSERT INTO `hj_brand` VALUES ('1', 'BR20170326', 'BR20171207113721', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209145849803_750_843.jpg', '嘉禾布艺', '1');
INSERT INTO `hj_brand` VALUES ('5', 'BR20170326', 'BR20171209102909', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209102909111_1140_267.png', '双虎木门', '1');
INSERT INTO `hj_brand` VALUES ('6', '请选择', 'BR20171209103508', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209103508513_781_722.png', 'dsf', '1');
INSERT INTO `hj_brand` VALUES ('4', 'BR20170326', 'BR20171209100654', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209100654338_7990_6310.jpg', '王力安全门', '1');
INSERT INTO `hj_brand` VALUES ('7', 'CL20171208121707', 'BR20171209103540', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209103540203_781_722.png', 'sdf', '1');

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
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_class
-- ----------------------------
INSERT INTO `hj_class` VALUES ('1', 'BR20170326', '墙纸布艺', '1');
INSERT INTO `hj_class` VALUES ('2', 'BR20170325', '开关灯具', '1');

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_goods
-- ----------------------------
INSERT INTO `hj_goods` VALUES ('1', 'GS20171207095955', 'TATA木门后时代镜风@001金楸色', '2100*900*240 每户限购2樘，满5000元起订', null, '3599.00', '1099.00', 'http://localhost/my_host/hejia/uploads/images/2017/20171207/20171207215955811_283_283.jpg', '1');
INSERT INTO `hj_goods` VALUES ('2', 'GS20171207100839', '箭牌花洒 AMG12G816', '顶喷可旋转 限量300套', null, '899.00', '599.00', 'http://localhost/my_host/hejia/uploads/images/2017/20171207/20171207220839897_283_283.jpg', '1');
INSERT INTO `hj_goods` VALUES ('3', 'GS20171209113752', 'dsf', 'sdf', null, '100.00', '50.00', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209113752136_781_722.png', '1');
INSERT INTO `hj_goods` VALUES ('5', 'GS20171209014659', '衣柜', '百得胜全屋定制', null, '5000.00', '2000.00', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209134659247_801_600.jpg', '1');
INSERT INTO `hj_goods` VALUES ('6', 'GS20171209014738', '家具', '板式家具', null, '60000.00', '30000.00', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209134738754_1148_1080.png', '1');
INSERT INTO `hj_goods` VALUES ('7', 'GS20171209014850', '集成灶', '火王集成灶', null, '4000.00', '1000.00', 'http://localhost/my_host/hejia/uploads/images/2017/20171209/20171209134850841_3581_4673.png', '1');

-- ----------------------------
-- Table structure for hj_reg_user
-- ----------------------------
DROP TABLE IF EXISTS `hj_reg_user`;
CREATE TABLE `hj_reg_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_reg_user
-- ----------------------------
INSERT INTO `hj_reg_user` VALUES ('1', 'fds先生', '15136584785', '2017-12-08 09:56:12', '1');

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
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hj_subscribe_user
-- ----------------------------
INSERT INTO `hj_subscribe_user` VALUES ('12', '李先生', '15896327458', '2017-12-09 03:45:15', '1');
INSERT INTO `hj_subscribe_user` VALUES ('13', '王先生', '15994077575', '2017-12-09 03:46:31', '1');
INSERT INTO `hj_subscribe_user` VALUES ('14', '赵小姐', '13837425698', '2017-12-09 03:47:57', '1');
INSERT INTO `hj_subscribe_user` VALUES ('15', '马女士', '15869302174', '2017-12-09 09:21:33', '1');
INSERT INTO `hj_subscribe_user` VALUES ('16', '周先生', '15678954785', '2017-12-09 09:24:10', '1');
INSERT INTO `hj_subscribe_user` VALUES ('20', '金先生', '15136584785', '2017-12-09 12:34:17', '1');

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
INSERT INTO `hj_sys_user` VALUES ('1', '超级管理员', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '', null, null, null, '2017-12-09 09:33:06', '1', '0', '0', null);
SET FOREIGN_KEY_CHECKS=1;
