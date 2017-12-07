<?php

/**
 * Created by PhpStorm.
 * User: Liu
 * Date: 2017-07-31
 * Time: 18:43
 */
class Menus
{

    private $CI;

    public function __construct()
    {
        $this->CI=& get_instance();
    }

    public function  outPutMenus(){
        $d = $this->CI->router->fetch_directory();  //当前请求的控制器的目录
        $c = $this->CI->router->fetch_class();  //当前请求的控制器
        $m = $this->CI->router->fetch_method(); //当前请求的控制器的方法
        if(empty($_SESSION['sign_in'])){
            return false;
        }
        $this->admin_id=$_SESSION['sign_in']['admin_id'];
        $this->admin_name=$_SESSION['sign_in']['admin_name'];
        /*$this->company_code=$_SESSION['sign_in']['company_code'];*/
        $admin_id=$this->admin_id ? $this->admin_id : 1;
        $adminData=$this->CI->db
                    ->select('a.*','m.role_name')
                    ->from('sys_user as a')
                    //->join('sys_role as m','a.role_id=m.id','left')
                    ->where('a.id',$admin_id)
                    ->limit(1)
                    ->get()
                    ->row_array();
        $menus= $this->getUserMenuData($adminData);
        $menusTree=$this->getMenuTree($menus,0);
        $menusList=$this->getMenuHtml($menusTree);
        $currentMenu = $this->CI->db->get_where("sys_module", [
            "d" => $d ? substr($d, 0, -1) : null,
            "c" => $c,
            "m" => $m,
        ])->row();
        $currentMenuId = $currentMenu ? $currentMenu->id : null;
        $menusArray=array(
            "admin_data" => $adminData,
            "current_menu_id" => $currentMenuId,
            "menus_list" => $menusList
        );
        $this->CI->load->vars($menusArray);
    }
    private function getUserMenuData($userInfo){

        /*$menusData = array();*/
        $menusData = $this->CI->db
            ->select("m.id,m.parent_id,m.name,m.d,m.c,m.m")
            ->from("sys_module as m")
            ->where("m.status", 1)
            ->order_by("m.sort desc")
            ->get()
            ->result_array();
        /*if ($userInfo["role_id"] == 1 || empty($userInfo["role_id"])) {
            $menusData = $this->CI->db
                ->select("m.id,m.parent_id,m.name,m.d,m.c,m.m")
                ->from("sys_module as m")
                ->where("m.status", 1)
                ->order_by("m.sort desc")
                ->get()
                ->result_array();
        } else {
            //指定角色的所有菜单
            $menusData = $this->CI->db
                ->distinct()
                ->select("m.id,m.parent_id,m.name,m.d,m.c,m.m")
                ->from("sys_module as m")
                ->join("sys_authority as mr", "mr.module_id = m.id")
                ->where("m.status", 1)
                ->group_start()
                ->or_where("mr.role_id", $userInfo["role_id"])
                ->or_where("mr.user_id", $userInfo["id"])
                ->or_where("mr.department_id", $userInfo["department_id"])
                ->group_end()
                ->order_by("m.sort desc")
                ->order_by("m.id asc")
                ->get()
                ->result_array();
        }*/
        return $menusData;
    }

    private function getMenuTree($data,$pid){

        $tree = array();
        foreach ($data as $k => $v) {
            if ($v['parent_id'] == $pid) {//父类与子类匹配成功
                $v['children'] = $this->getMenuTree($data, $v['id']);
                $tree[] = $v;
            }
        }
        return $tree;
    }

    private function getMenuHtml($data){

        if (!is_array($data)) {
            return '';
        }
        $html = '';
        $is_root = empty($data[0]['parent_id']) ? true : false;
        $html .= $is_root ? '<ul class="sidebar-menu">' : '<ul class="treeview-menu">';
        foreach ($data as $row) {
            $url = creat_url("{$row['d']}/{$row['c']}/{$row['m']}");
            $menu_id = $row['id'];
            if (!empty($row['children'])) {
                $children = $this->getMenuHtml($row['children']);
                $html.="<li id='menu_id_{$menu_id}' class='treeview '><a href='#'><i class='fa fa-circle-o'></i><span>{$row['name']}</span><span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span></a>{$children}</li>";
            } else {
                if ($is_root) {
                    $html.="<li id='menu_id_{$menu_id}' data-name= {$row['m']} ><a href='{$url}'><i class='fa fa-circle-o'></i><span>{$row['name']}</span></a></li>";
                } else {
                    $html.="<li id='menu_id_{$menu_id}'  data-name={$row['m']}><a href='{$url}'><i class='fa fa-circle-o'></i>{$row['name']}</a></li>";
                }
            }
        }
        $html .= '</ul>';
        return $html;
    }
}