<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Sign extends MY_Controller
{

    public function index()
    {
        $this->in();
    }

    public function in()
    {
        $return = $this->input->get_post('return');

        $this->load->view('login.html', array('return' => $return));
    }

    public function act()
    {
        $return = $this->input->get('return');
        $password = $this->input->get_post('password');
        $username = $this->input->get_post('username');

        $admin_data = $this->db
            ->limit(1)
            ->get_where('sys_user', array('loginname' => $username, 'pwd' => md5($password), 'status' => 1))
            ->row();

        if (empty($admin_data)) {
            $this->error('用户名或密码错误');
        }
        $this->db->update('sys_user', array('lastlogin_date' => date('Y-m-d H:i:s',time())),array('id'=>$admin_data->id));
        unset($_SESSION['sign_in']);
        $_SESSION['sign_in']['admin_id'] = $admin_data->id;
        $_SESSION['sign_in']['admin_name'] = $admin_data->username;
      /*  $_SESSION['sign_in']['role_id'] = $admin_data->role_id;
        $_SESSION['sign_in']['department_id'] = $admin_data->department_id;
        $_SESSION['sign_in']['company_code']=$admin_data->company_code;*/
        redirect($return ? $return : creat_url('/'));
    }

    public function out()
    {
        unset($_SESSION['sign_in']);
        redirect(creat_url('/'));
    }

}
























