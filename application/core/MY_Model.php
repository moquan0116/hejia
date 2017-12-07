<?php

class MY_Model extends CI_Model {

    private $error = null;    //执行操作时的错误信息

    function __construct() {
        parent::__construct();
    }

    /**
     * 返回一个错误
     * @return type
     */
    public function last_error() {
        return $this->error;
    }

    /**
     * 设置一个错误
     * @param type $message
     */
    public function set_error($message) {
        $this->error = $message;
    }
    /*
     * 执行分页查询
     * @param int curPage  当前页
     * @param int pageRows 每页显示行数
     * return Array
     */
    public function actionSql($curPage,$pageRows){
        $total_rows = $this->db->count_all_results("",FALSE);
        $data = $this->db->page($curPage, $pageRows)
                         ->get()
                         ->result_array();
        $return_data['data'] = $data;
        $return_data['totalRows'] = $total_rows;
        return $return_data;
    }

    public function trimall($str) {
        return preg_replace('# #','',$str);
    }

    /*
    * 返回查询结果二维数组
    * @return array
    * */
    public function getResultArray(){
        return $this->db->get()->result_array();
    }

    /*
     * 返回查询结果对象
     * @return object
     * */
    public function getRow(){
        return $this->db->get()->row();
    }

    /*
    * 返回查询结果对象
    * @return object
    * */
    public function getResult(){
        return $this->db->get()->result();
    }

    /*
     * 返回查询结果一维数组
     * @return array
     * */
    public function getRowArray(){
        return $this->db->get()->row_array();
    }
}