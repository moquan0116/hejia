<?php

class Form_model extends MY_Model
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 返回表单验证提示消息
     * @param array $para 验证数组或着表单验证配置文件数组下的子数组,即规则集名，例如：user/add数组
     * @param boolean $flag 验证消息类型，默认false为加载错误页面形式,true为json错误形式
     * @param int|sting $time 错误提示的显示时间 默认为3秒 ,只是在加载错误页面时
     * return boolean 参数错误返回false,没有表单错误返回true
     */
    public function form_validation($para,$flag = false,$time = 3){
        $this->load->library('form_validation');
        if(is_array($para)){
            $this->form_validation->set_rules($para);
            $this->form_validation->run();
        }elseif (is_string($para) && strpos($para,'/')){
            $this->form_validation->run($para);
        }else{
            return false;
        }
        $vali = $this->form_validation->error_array();
        if(!empty($vali)){
            foreach($vali as $k=>$v){
                if($v){
                    //加载错误页面形式
                    if($flag == false){
                        $this->error($v,'',$time);
                    }
                    //json对象错误形式
                    if($flag == true){
                        $this->json_error($v);
                    }
                }
            }
        }
        return true;
    }

    /**
     * 返回一个json格式的错误信息
     * @param type $message 提示内容
     */
    public function json_error($message = "操作失败"){
        $tmp['error'] = $message;
        echo json_encode($tmp);
        exit();
    }

    /**
     * 返回一个json格式的成功信息
     * @param type $message 提示内容
     */
    public function json_success($message = "操作成功"){
        $tmp['success'] = $message;
        echo json_encode($tmp);
        exit();
    }

    /**
     * 返回一个错误信息，并exit()
     * @param type $message 提示内容
     * @param type $url 要跳转到的地址，默认NULL为返回上一页"不刷新"
     * @param type $time 多长时间自动跳转,单位秒
     */
    public function error($message = "错误", $url = null,$time=3) {
        echo $this->load->view('errors/html/error.php', array('message' => $message, 'url' => $url, "time" =>$time ), true);
        exit();
    }

    /**
     * 返回一个成功的提示消息,并exit()
     * @param type $message 提示内容
     * @param type $url 要跳转到的地址或一段js代码javascript:开头，默认NULL为返回上一页并"刷新"
     * @param type $time 多长时间自动跳转，单位秒
     */
    public function success($message = "成功", $url = null,$time = 3) {
        echo $this->load->view('errors/html/success.php', array('message' => $message, 'url' => $url, "time"=>$time), true);
        exit();
    }

}
