<?php

/**
 * Created by PhpStorm.
 * User: moquan
 * Date: 2017/12/7
 * Time: 20:44
 */
class GoodsManagement extends MY_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model("Form_model","form");
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
        $this->db->select("gds.*")
                ->from("goods gds")
                ->order_by("gds.id","DESC");
        $total_rows =$this->db->count_all_results("",false);
        $this->db->page($curPage, $this->pageRows);

        //查询最结果
        $goods =$this->db->get()->result_array();
        //总记录数
        $total_rows = $this->db->count_all_results();
        //页面处理
        $pager = [
            'current' => $curPage, //用户当前请求的第几页,大于等于1的正整数，非正常的数字会被转为1
            'total_rows' => $total_rows, //总共多少条数据
            'page_rows' => $this->pageRows, //每页显示多少条数据
            'uri' => 'goods/GoodsManagement/index',
            'get_parameter' => [
            ],
        ];


        //加载页面传输数据
        $this->load->view("goods/goodsList.html", array(
                "goods" => $goods,
                "pager" => $pager
            )
        );
    }


    public function add() {
        $this->load->view('goods/goodsAdd.html');
    }

    public function doAdd() {
        if( $this->form->form_validation("goods/add" )){
            $data = array(
                "goodsCode" => 'GS'.date('Ymdhis',time()),
                "goodsName" => trim( $this->input->post("goodsName") ),
                "caption" => trim( $this->input->post("caption") ),
                "marketPrice" => trim( $this->input->post("marketPrice") ),
                "hePrice" => trim( $this->input->post("hePrice") ),
                "image" => trim( $this->input->post("image") )
            );

            if(empty($_FILES['image']['tmp_name'])){
                $this->error("请选择商品图片");
            }

            $this->load->model("image_model","image");
            $image = $this->image->upload("image");
            if(!empty($image['url'])){
                $data['image'] = $image['url'];
            }else{
                $this->error("商品图片上传失败");
            }


            $this->db->insert( 'goods', $data );
            if( $this->db->affected_rows() <= -1){
                $this->error( "操作失败" );
            }else{
                $this->success( "操作成功" );
            }

        }



    }


}