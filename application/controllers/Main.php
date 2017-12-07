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
        $this->load->view('main/index.html');
    }

    public function test() {
        var_dump($_POST);
    }
}