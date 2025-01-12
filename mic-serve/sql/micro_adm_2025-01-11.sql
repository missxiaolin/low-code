# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20080
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 5.7.44)
# 数据库: micro_adm
# 生成时间: 2025-01-11 08:19:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# 转储表 adm_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `adm_user`;

CREATE TABLE `adm_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(300) NOT NULL DEFAULT '' COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `adm_user` WRITE;
/*!40000 ALTER TABLE `adm_user` DISABLE KEYS */;

INSERT INTO `adm_user` (`id`, `username`, `password`)
VALUES
	(1,'admin','25d55ad283aa400af464c76d713c07ad');

/*!40000 ALTER TABLE `adm_user` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 component
# ------------------------------------------------------------

DROP TABLE IF EXISTS `component`;

CREATE TABLE `component` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `component` text NOT NULL,
  `version` varchar(30) NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# 转储表 menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` tinyint(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `path` varchar(100) NOT NULL COMMENT '路径',
  `name` varchar(30) NOT NULL COMMENT '名称',
  `type` tinyint(11) NOT NULL COMMENT '类型 1 菜单 2 页面',
  `status` tinyint(11) NOT NULL COMMENT '是否显示 1 是 2 否',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# 转储表 page_route
# ------------------------------------------------------------

DROP TABLE IF EXISTS `page_route`;

CREATE TABLE `page_route` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `route_name` varchar(30) NOT NULL DEFAULT '' COMMENT '名称',
  `path` varchar(300) NOT NULL DEFAULT '' COMMENT '路由地址',
  `tem_json` text NOT NULL COMMENT '模版json',
  `script_json` text NOT NULL COMMENT 'js ',
  `page_html` text NOT NULL COMMENT '页面',
  `css` text NOT NULL COMMENT 'css',
  `eventNode` text NOT NULL COMMENT '事件流',
  `customData` text NOT NULL COMMENT 'data 变量',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1 禁用 2 启用',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `page_route` WRITE;
/*!40000 ALTER TABLE `page_route` DISABLE KEYS */;

INSERT INTO `page_route` (`id`, `project_id`, `route_name`, `path`, `tem_json`, `script_json`, `page_html`, `css`, `eventNode`, `customData`, `status`, `create_time`, `update_time`)
VALUES
	(1,1,'首页','/index','{\"template\":{\"lc_id\":\"root\",\"lc_uuid\":\"root\",\"__children\":[{\"div\":{\"class\":\"container\",\"style\":\"min-height: 100%;\",\"lc_id\":\"container\",\"lc_uuid\":\"container\",\"__children\":[{\"span\":{\"lc_id\":\"uu78mobmhw\",\"__children\":[],\"__text__\":\"Span Element\",\"lc_uuid\":\"A5183393-3A82-4E74-94B6-0419F43C2238\"}}]}}]}}','export default {\n  setup() {\n\n    return {};\n  },\n};\n','\n  <template> \n      <div class=\"container\" style=\"min-height: 100%;\">\n      <span>Span Element</span>\n  </div>\n \n  </template>\n  \n<script>\nimport { onMounted,ref,getCurrentInstance } from \"vue\";\nimport events from \"./events.json\";\nconst vccEvents = events;\nexport default {\n  setup(props, { emit }) {\n    const instance = getCurrentInstance()\n\n    // 执行事件流\n    const eventFun = (eventStr, e = null) => {\n      const eventObj = vccEvents[eventStr]\n      if (!eventStr || !eventObj) return\n\n      instance.proxy.$execEventFlow(instance, eventObj.children, e)\n    }\n\n    onMounted(() => {\n      eventFun(\"init\")\n    })\n\n    return {\n      eventFun,\n    }\n  },\n}\n\n</script>\n  \n  <style scoped>\n  .container {}\n\n  </style>\n    ','','{}','[]',2,'2025-01-08 20:12:40','2025-01-08 20:12:40');

/*!40000 ALTER TABLE `page_route` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 project
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(2) NOT NULL COMMENT '1 pc 2 mobile',
  `code` varchar(3) NOT NULL DEFAULT '' COMMENT '三字码',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '项目名称',
  `desc` varchar(300) NOT NULL,
  `version` varchar(11) NOT NULL COMMENT '版本',
  `status` tinyint(4) NOT NULL COMMENT '1 禁用 2 启用 3 发布中',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;

INSERT INTO `project` (`id`, `type`, `code`, `name`, `desc`, `version`, `status`, `create_time`, `update_time`)
VALUES
	(1,1,'chr','lowcode','低代码PC','1.0.0',2,'2024-12-23 09:24:02','2024-12-23 09:24:02');

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 versions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `versions`;

CREATE TABLE `versions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) NOT NULL COMMENT '1 项目 2 组件',
  `project_id` int(11) NOT NULL,
  `version` varchar(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
