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
        $brand = $this->db->get_where("brand",array('classCode'=>$class[0]->classCode))->result_array();
        $goods = $this->db->limit(2,0)->get("goods")->result_array();
        $this->load->view('main/index.html',
            array(
                'user'=>$user,
                'class' => $class,
                'residue'=>$residue,
                'goods'=>$goods,
                'brand'=>$brand
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
                echo json_encode( array( 'code'=>40,'reason' => '索票失败' ) );
            }else{
                echo json_encode( array( 'code'=>10,'reason' => $this->sendSms( $data['phone'] ) ) );
                $this->sendSms( $data['phone'] );
            }
        }

    }

    public function getBrand() {
        $code = $this->input->get('code');
        $brand = $this->db->get_where( 'brand',array( 'classCode' => $code) )->result();
        echo json_encode($brand);
    }

    public function getAddGoods() {
        $current = $this->input->get('current');
        $rowCount = $this->input->get('rowCount');
        $goods = $this->db->select()->from("goods")->limit($rowCount,$current)->get()->result();
        if(empty($goods)){
            echo json_encode( array("code"=>500,"data" =>null) );
            return false;
        }else{
            echo json_encode( array("code"=>200,"data" =>$goods) );
        }
    }

    public function sendSms( $mobiles ) {
        $mobiles = trim($mobiles);
        $content = "恭喜您索票成功！第二十四届新疆（冬季）家博会将于12月22-24日在新疆国际会展中心盛大开幕，家博会门票将于开展前免费邮寄到家。咨询电话：0991-4677878";
        if( !$mobiles ){
            return false;
        }else{
            if( !$content ){
                return false;
            }else{
                $cpid    = '3880';//--------------------------->>企业ID，请联系我们索取免费测试帐号
                $cppwd   = strtoupper(MD5("050616"));//---------->>ID密码
                $httpstr = "http://api.esms100.com:8080/mt/?cpid={$cpid}&cppwd={$cppwd}&phone={$mobiles}&msgtext=".urlencode($content)."&encode=utf8";
                $result  = @file_get_contents($httpstr);
                if($result == '0'){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
}