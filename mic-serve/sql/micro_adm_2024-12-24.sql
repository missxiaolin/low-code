# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20078
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 5.7.44)
# 数据库: micro_adm
# 生成时间: 2024-12-24 08:21:33 +0000
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


# 转储表 menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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
	(5,1,'测试','/ceshi/index','{\"template\":{\"lc_id\":\"root\",\"lc_uuid\":\"root\",\"__children\":[{\"div\":{\"class\":\"container\",\"lc_id\":\"container\",\"lc_uuid\":\"container\",\"__children\":[{\"span\":{\"lc_id\":\"sari7tlmcj\",\"__children\":[],\"__text__\":\"Span Element\",\"lc_uuid\":\"C31D9775-0D9E-41BC-A912-690ADAE776C9\"}},{\"a\":{\"lc_id\":\"66jgrvksuu\",\"__children\":[],\"__text__\":\"W3School\",\"lc_uuid\":\"7862B674-84ED-499F-87C5-F34C90343753\"}},{\"div\":{\"div-lc-mark\":\"\",\"lc_id\":\"0wq650zf99\",\"__children\":[],\"lc_uuid\":\"4DA63054-C9D3-4AA2-91AF-A66E0AF415F9\",\"__text__\":\"您好\"}}]}}]}}','export default {\n  setup() {\n    let $data = toRefs({\n    });\n\n    return {\n      ...$data,\n    };\n  },\n};\n','\n  <template> \n      <div class=\"container\">\n      <span>Span Element</span>\n      <a>W3School</a>\n      <div>您好</div>\n  </div>\n \n  </template>\n  \n<script>\nimport { toRefs,onMounted,getCurrentInstance } from \"vue\";\nexport default {\n  setup(props, { emit }) {\n    const instance = getCurrentInstance()\n    const $data = toRefs({})\n    const $events = {}\n\n    // 执行事件流\n    const eventFun = (eventStr, e) => {\n      if (!eventStr) return\n      const eventObj = JSON.parse(eventStr)\n      instance.proxy.$execEventFlow(instance, eventObj, e)\n    }\n\n    const pagesInit = (str) => {\n      if (!str || $events[str]) return\n      const eventObj = $events[str]\n      eventFun(eventObj, null)\n    }\n\n    onMounted(() => {\n      pagesInit(\"init\")\n    })\n\n    return {\n      ...$data,\n      eventFun,\n    }\n  },\n}\n\n</script>\n  \n  <style scoped>\n  .container {}\n\n  </style>\n    ','','{}','[]',2,'2024-12-23 11:24:15','2024-12-23 13:32:11'),
	(6,1,'测试2','/c/index','{\"template\":{\"lc_id\":\"root\",\"lc_uuid\":\"root\",\"__children\":[{\"div\":{\"lc_id\":\"container\",\"lc_uuid\":\"container\",\"__children\":[],\"class\":\"container\",\"__text__\":\"我是测试2页面\"}}]}}','export default {\n  setup() {\n    let $data = toRefs({\n    });\n\n    return {\n      ...$data,\n    };\n  },\n};\n','\n  <template> \n      <div class=\"container\">我是测试2页面</div>\n \n  </template>\n  \n<script>\nimport { toRefs,onMounted,getCurrentInstance } from \"vue\";\nexport default {\n  setup(props, { emit }) {\n    const instance = getCurrentInstance()\n    const $data = toRefs({})\n    const $events = {}\n\n    // 执行事件流\n    const eventFun = (eventStr, e) => {\n      if (!eventStr) return\n      const eventObj = JSON.parse(eventStr)\n      instance.proxy.$execEventFlow(instance, eventObj, e)\n    }\n\n    const pagesInit = (str) => {\n      if (!str || $events[str]) return\n      const eventObj = $events[str]\n      eventFun(eventObj, null)\n    }\n\n    onMounted(() => {\n      pagesInit(\"init\")\n    })\n\n    return {\n      ...$data,\n      eventFun,\n    }\n  },\n}\n\n</script>\n  \n  <style scoped>\n  .container {}\n\n  </style>\n    ','','{}','[]',2,'2024-12-23 14:08:55','2024-12-23 14:08:55');

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
	(1,1,'chr','lowcode','低代码PC','',2,'2024-12-23 09:24:02','2024-12-23 09:24:02'),
	(3,1,'cha','pc','pc','',2,'2024-12-23 18:14:43','2024-12-23 18:14:43');

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 versions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `versions`;

CREATE TABLE `versions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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
