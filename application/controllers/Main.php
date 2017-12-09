<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/7
 * Time: 9:17
 */
class Main extends MY_Controller {
    private $maxNum = 1000;
    function __construct() {
        parent::__construct();
    }

    public function index() {
        $user = $this->db->get("subscribe_user")->result();
        $userCount = $this->db->select("count(id) as num")->from("subscribe_user")->where("to_days(createDate) = to_days(now())")->get()->result();
        $residue= $this->test( $this->maxNum - $userCount[0]->num );
        $class = $this->db->get("class")->result();
        $this->load->view('main/index.html',
            array(
                'user'=>$user,
                'class' => $class,
                'residue'=>$residue
            )
        );
    }

    function test( $num ){
        $t = '';
        for ($i = 0;$i<strlen($num);$i++){
            $n = substr( $num,$i,1);
            if($i == 0){
                $t.="<i class='i1'>".$n."</i>";
                continue;
            }
            if($i == strlen($num) - 1 ){
                $t.="<i class='i3'>".$n."</i>";
                continue;
            }
            $t.="<i>".$n."</i>";
        }
        return $t;
    }

    public function addPhone() {

        $data = array(
            'name' => $this->input->post('name'),
            'phone' => $this->input->post('phone'),
            'createDate'=> date('Y-m-d H:i:s',time())
        );

        $user = $this->db->get_where('subscribe_user',array('phone'=>$data['phone']))->row();
        if($user){
            echo json_encode( array( 'code'=>40,'reason' => '此手机号已预约过' ) );
            return;
        }else{
            $this->db->insert( 'subscribe_user',$data);
            if($this->db->affected_rows() <= -1){
                echo json_encode( array( 'code'=>40,'reason' => '预约失败' ) );
            }else{
                echo json_encode( array( 'code'=>10,'reason' => '预约成功' ) );
            }
        }

    }

    public function getBrand() {
        $code = $this->input->get('code');
        $brand = $this->db->get_where( 'brand',array( 'classCode' => $code) )->result();
        echo json_encode($brand);
    }
}