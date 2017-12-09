<?php

/**
 * Created by PhpStorm.
 * User: moquan
 * Date: 2017/12/7
 * Time: 22:30
 */
class UserManagement extends MY_Controller {

    public function __construct() {
        parent::__construct();
    }

    /*
     * 商品列表
     */
    public function index(){

        //是否搜索
        $goodsName = $this->input->get_post('goodsName');

        //当前页数
        $curPage = $this->input->get_post("page");
        $curPage = empty($curPage) ? 1 : $curPage;

        //搜索查询条件判断

        //取会员信息
        $this->db->select("su.*")
            ->from("subscribe_user su")
            ->order_by("su.id","DESC");
        $total_rows =$this->db->count_all_results("",false);
        $this->db->page($curPage, $this->pageRows);

        //查询最结果
        $user =$this->db->get()->result_array();
        //总记录数
        $total_rows = $this->db->count_all_results();
        //页面处理
        $pager = [
            'current' => $curPage, //用户当前请求的第几页,大于等于1的正整数，非正常的数字会被转为1
            'total_rows' => $total_rows, //总共多少条数据
            'page_rows' => $this->pageRows, //每页显示多少条数据
            'uri' => 'user/UserManagement/index',
            'get_parameter' => [
            ],
        ];


        //加载页面传输数据
        $this->load->view("subUser/subUserList.html", array(
                "user" => $user,
                "pager" => $pager
            )
        );
    }

    public function add() {

        $this->load->view('subUser/subUserAdd.html');
    }

    public function doAdd(){

        $data = array(
            'name' => $this->input->post('name'),
            'phone' => $this->input->post('phone'),
            'createDate' => date( 'Y-m-d H:i:s',time())
        );
        $user = $this->db->get_where('subscribe_user',array('phone'=>$data['phone']))->row();
        if($user){
            echo json_encode( array('code'=>500,'msg'=>'手机号已存在') );
            return false;
        }else{
            $this->db->insert( 'subscribe_user', $data );
            if( $this->db->affected_rows() <= -1){
                echo json_encode( array('code'=>500,'msg'=>'操作失败') );
                return false;
            }else{
                echo json_encode( array('code'=>200,'msg'=>'操作成功') );
                return false;
            }
        }

    }
}