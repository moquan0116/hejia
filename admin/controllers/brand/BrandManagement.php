<?php

/**
 * Created by PhpStorm.
 * User: moquan
 * Date: 2017/12/7
 * Time: 20:44
 */
class BrandManagement extends MY_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model("Form_model","form");
    }


    /*
     * 品牌列表
     */
    public function index(){

        //是否搜索
        $brandName = $this->input->get_post('brandName');

        //当前页数
        $curPage = $this->input->get_post("page");
        $curPage = empty($curPage) ? 1 : $curPage;

        //搜索查询条件判断

        //取会员信息
        $this->db->select("br.*,cls.*")
                ->from("brand br")
                ->join("class cls","br.classCode = cls.classCode")
                ->order_by("br.id","DESC");
        $total_rows =$this->db->count_all_results("",false);
        $this->db->page($curPage, $this->pageRows);

        //查询最结果
        $brand =$this->db->get()->result_array();
        //总记录数
        $total_rows = $this->db->count_all_results();
        //页面处理
        $pager = [
            'current' => $curPage, //用户当前请求的第几页,大于等于1的正整数，非正常的数字会被转为1
            'total_rows' => $total_rows, //总共多少条数据
            'page_rows' => $this->pageRows, //每页显示多少条数据
            'uri' => 'brand/BrandManagement/index',
            'get_parameter' => [
            ],
        ];


        //加载页面传输数据
        $this->load->view("brand/brandList.html", array(
                "brand" => $brand,
                "pager" => $pager
            )
        );
    }


    public function add() {
        $class = $this->db->get("class")->result();
        $this->load->view('brand/brandAdd.html',array( 'class' => $class ));
    }

    public function doAdd() {
        if( $this->form->form_validation("brand/add" )){
            $data = array(
                "brandCode" => $this->makeCode('BR','brand'),
                "brandName" => trim( $this->input->post("brandName") ),
                "classCode" => trim( $this->input->post("classCode") ),
            );


            $this->db->insert( 'brand', $data );
            if( $this->db->affected_rows() <= -1){
                $this->error( "操作失败" );
            }else{
                $this->success( "操作成功" );
            }

        }



    }


}