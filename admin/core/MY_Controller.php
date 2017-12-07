<?php

/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2017-08-07
 * Time: 14:06
 */
class MY_Controller extends CI_Controller
{
    public $pageRows = 20; //分页显示多少条数据
    public $admin_id = null;
    public $admin_name = null;
    public $is_post = null;

    function __construct()
    {
        parent::__construct();
        if($debug = $this->input->get("debug")){
            $this->output->enable_profiler(TRUE);
        }
        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
            $this->is_post = true;
        } else {
            $this->is_post = false;
        }

    }

    /**
     * 返回一个错误信息，并exit()
     * @param type $message 提示内容
     * @param type $url 要跳转到的地址，默认NULL为返回上一页"不刷新"
     * @param type $time 多长时间自动跳转,单位秒
     */
    public function error($message = "错误", $url = null, $time = 10)
    {
        echo $this->load->view('errors/html/error.php', array('message' => $message, 'url' => $url, "time" => $time), true);
        exit();
    }

    /**
     * 返回一个成功的提示消息,并exit()
     * @param type $message 提示内容
     * @param type $url 要跳转到的地址或一段js代码javascript:开头，默认NULL为返回上一页并"刷新"
     * @param type $time 多长时间自动跳转，单位秒
     */
    public function success($message = "成功", $url = null, $time = 10)
    {
        echo $this->load->view('errors/html/success.php', array('message' => $message, 'url' => $url, "time" => $time), true);
        exit();
    }

    /**
     * 根据请求不同返回相应的数据格式
     * @param type $viewPath 页面路径
     * @param type $data 页面请求的数据
     * @param type $vStr 是否字符串输出 true是字符串输出，false否
     */
    public function view($viewPath, $data, $vStr = false)
    {
        if ($this->is_ajax_request()) {
            $this->output->set_content_type('json');
            echo json_encode($data);
        } else {
            $this->load->view($viewPath, $data, $vStr);
        }
    }

    /*     * *
      判断是否是ajax请求
     * * */

    private function is_ajax_request()
    {
        return ($this->server('HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest');
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

    /*
     * ajax 输出
     */
    public function ajaxOutput($data){
        $this->output->set_header('Access-Control-Allow-Origin:*');
        $this->output->set_content_type('application/json')->set_output(json_encode($data));
    }

    public function trimall($str)
    {
        return preg_replace('# #','',$str);
    }
}