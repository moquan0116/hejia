<?php

/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2017-08-07
 * Time: 14:59
 */
class Auth
{
   public function __construct()
   {
       $this->CI=& get_instance();
   }
   /*
    *
    */
   public function judgeLoginStatus(){

       $ignore=$this->CI->config->item('ignore');
       $d = $this->CI->router->fetch_directory();  //当前请求的控制器的目录
       $c = $this->CI->router->fetch_class();  //当前请求的控制器
       $m = $this->CI->router->fetch_method(); //当前请求的控制器的方法
       if (in_array(["d" => $d], $ignore['dir']) ||
           in_array(["d" => $d, "c" => $c], $ignore['dirController']) ||
           in_array(["d" => $d, "c" => $c, "m" => $m], $ignore['dirControllerFunction'])) {
       }else{

           $this->adminSignInValid();
       }
   }

    protected function adminSignInValid()
    {
        if (empty($_SESSION['sign_in'])) {
            redirect(
                creat_url('sign/in', array("return" => current_url()))
            );
        }else{

            $this->CI->admin_name=$_SESSION['sign_in']['admin_name'];
            $this->CI->admin_id=$_SESSION['sign_in']['admin_id'];
            /*$this->CI->company_code=$_SESSION['sign_in']['company_code'];*/
        }

    }
}