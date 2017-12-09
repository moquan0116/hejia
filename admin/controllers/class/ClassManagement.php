<?php

/**
 * Created by PhpStorm.
 * User: moquan
 * Date: 2017/12/7
 * Time: 20:44
 */
class ClassManagement extends MY_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model("Form_model","form");
    }


    /*
     * 品牌列表
     */
    public function index(){

        //是否搜索
        $className = $this->input->get_post('className');

        //当前页数
        $curPage = $this->input->get_post("page");
        $curPage = empty($curPage) ? 1 : $curPage;

        //搜索查询条件判断

        //取会员信息
        $this->db->select("cls.*")
                ->from("class cls")
                ->order_by("cls.id","DESC");
        $total_rows =$this->db->count_all_results("",false);
        $this->db->page($curPage, $this->pageRows);

        //查询最结果
        $class =$this->db->get()->result_array();
        //总记录数
        $total_rows = $this->db->count_all_results();
        //页面处理
        $pager = [
            'current' => $curPage, //用户当前请求的第几页,大于等于1的正整数，非正常的数字会被转为1
            'total_rows' => $total_rows, //总共多少条数据
            'page_rows' => $this->pageRows, //每页显示多少条数据
            'uri' => 'class/classManagement/index',
            'get_parameter' => [
            ],
        ];


        //加载页面传输数据
        $this->load->view("class/classList.html", array(
                "class" => $class,
                "pager" => $pager
            )
        );
    }


    public function add() {
        $this->load->view('class/classAdd.html');
    }

    public function doAdd() {
            $data = array(
                "classCode" => $this->makeCode('CL','class'),
                "className" => trim( $this->input->post("className") ),
            );

            if (!in_array( false,$data)){
                $this->db->insert( 'class', $data );
                if( $this->db->affected_rows() <= -1){
                    //$this->error( "操作失败" );
                    echo json_encode( array( 'code'=>500, 'msg'=>'操作失败') );
                    return false;
                }else{
                    //$this->success( "操作成功" );
                    echo json_encode( array( 'code'=>200, 'msg'=>'操作成功') );
                    return true;

                }
            }
    }

    public function edit() {
        $id = $this->input->get('id');
        $class = $this->db->get_where( "class",array("id" => $id) )->row_array();
        $this->load->view('class/classEdit.html',array( 'class'=>$class ,'id'=>$id));
    }

    public function doEdit() {
        $id = $this->input->post('id');
        $data = array(
            "className" => trim( $this->input->post("className") ),
        );

        $this->db->update( 'class', $data, array('id'=>$id) );
        if( $this->db->affected_rows() <= -1){
            echo json_encode( array('code'=>500,'msg'=>'操作失败') );
        }else{
            echo json_encode( array('code'=>200,'msg'=>'操作成功') );
        }
    }

    public function del() {
        $id = $this->input->get('id');
        $this->db->delete("class",array('id'=>$id));
        if($this->db->affected_rows()<=-1){
            echo json_encode( array('code'=>500,'msg'=>'操作失败') );
        }else{
            echo json_encode( array('code'=>200,'msg'=>'操作成功') );
        }
    }


}