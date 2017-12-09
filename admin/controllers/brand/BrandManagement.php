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
        $this->db->select("br.*,cls.classCode,cls.className")
                ->from("brand br")
                ->join("class cls","br.classCode = cls.classCode","left")
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

    public function edit() {
        $id = $this->input->get('id');
        $class = $this->db->get("class")->result();
        $brand = $this->db->get_where( "brand",array("id" => $id) )->row_array();
        $this->load->view('brand/brandEdit.html',array( 'class' => $class, 'brand'=>$brand ));
    }

    public function doEdit() {
        $id = $this->input->post('id');
        $data = array(
            "brandName" => trim( $this->input->post("brandName") ),
            "classCode" => trim( $this->input->post("classCode") ),
        );
        /*$brand = $this->db->get_where("brand",array('id'=>$id))->row();
        if(empty($_FILES['brandImage']['tmp_name']) && ){
            echo json_encode( array('code'=>500,'msg'=>'请上传品牌图片') );
            return false;
        }*/
        if(!empty($_FILES['brandImage']['tmp_name'])){
            $this->load->model("image_model","image");
            $image = $this->image->upload("brandImage");
            if(!empty($image['url'])){
                $data['image'] = $image['url'];
            }else{
                echo json_encode( array('code'=>500,'msg'=>'品牌图片上传失败') );
                return false;
            }
        }



        $this->db->update( 'brand', $data, array('id'=>$id) );
        if( $this->db->affected_rows() <= -1){
            echo json_encode( array('code'=>500,'msg'=>'操作失败') );
        }else{
            echo json_encode( array('code'=>200,'msg'=>'操作成功') );
        }
    }

    public function doAdd() {
        if( $this->form->form_validation("brand/add" ,false)){
            $data = array(
                "brandCode" => $this->makeCode('BR','brand'),
                "brandName" => trim( $this->input->post("brandName") ),
                "classCode" => trim( $this->input->post("classCode") ),
            );

            if($this->db->get_where("brand",array('brandName'=>$data['brandName']))->row_array()){
                echo json_encode( array('code'=>500,'msg'=>'品牌名称已存在') );
                return false;
            }

            if(empty($_FILES['brandImage']['tmp_name'])){
                echo json_encode( array('code'=>500,'msg'=>'品牌图片上传失败') );
                return false;
            }

            $this->load->model("image_model","image");
            $image = $this->image->upload("brandImage");
            if(!empty($image['url'])){
                $data['image'] = $image['url'];
            }else{
                echo json_encode( array('code'=>500,'msg'=>'品牌图片上传失败') );
                return false;

            }


            $this->db->insert( 'brand', $data );
            if( $this->db->affected_rows() <= -1){
                echo json_encode( array('code'=>500,'msg'=>'操作失败') );
            }else{
                echo json_encode( array('code'=>200,'msg'=>'操作成功') );
            }

        }
    }

    public function del() {
        $id = $this->input->get('id');
        $this->db->delete("brand",array('id'=>$id));
        if($this->db->affected_rows()<=-1){
            echo json_encode( array('code'=>500,'msg'=>'操作失败') );
        }else{
            echo json_encode( array('code'=>200,'msg'=>'操作成功') );
        }
    }


}