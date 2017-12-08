<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/7
 * Time: 9:17
 */
class Main extends MY_Controller {
    function __construct() {
        parent::__construct();
    }

    public function index() {
        $class = $this->db->get("class")->result();
        $this->load->view('main/index.html',
            array(
                'class' => $class
            )
        );
    }

    public function addPhone() {

        $data = array(
            'name' => $this->input->post('name'),
            'phone' => $this->input->post('phone'),
            'createDate'=> date('Y-m-d H:i:s',time())
        );

        $this->db->insert( 'subscribe_user',$data);
        if($this->db->affected_rows() <= -1){
            echo json_encode( array( 'reason' => '预约失败' ) );
        }else{
            echo json_encode( array( 'reason' => '预约成功' ) );
        }
    }

    public function getBrand() {
        $code = $this->input->get('code');
        $brand = $this->db->get_where( 'brand',array( 'classCode' => $code) )->result();
        echo json_encode($brand);
    }
}