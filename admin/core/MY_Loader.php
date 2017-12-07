<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Loader extends CI_Loader {

    public function database($params = '', $return = FALSE, $query_builder = NULL) {
        r();
        return parent::database($params = '', $return = FALSE, $query_builder = NULL);
    }

}
/**
 * 扩展db数据库查询构造器添加一个page方法
 */
function r() {
    require_once(BASEPATH . 'database/DB_driver.php');
    require_once(BASEPATH . 'database/DB_query_builder.php');

    class CI_DB extends CI_DB_query_builder {
        /**
         * 和limit效果一样
         * @param int $page_no  当前第几页
         * @param int $page_rows    每页多少条数据
         * @return CI_DB    数据库对象
         */
        public function page($page_no, $page_rows) {
            $offset = ($page_no - 1) * $page_rows;
            $this->limit($page_rows, $offset);
            return $this;
        }

    }

}
