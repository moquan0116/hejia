<?php

/**
 * 媒体文件上传类（上传图片、flash、视频等到服务器，和微信的Media无关）
 */
class Image_model extends MY_Model {

    public $base_url = null;

    public function __construct() {
        parent::__construct();
        //$this->base_url = $this->config->item('static_base_url');
        $this->base_url = "http://".$_SERVER['HTTP_HOST'].'/hejia/';
    }

    /**
     * @param string $name form表单里的input的name值 例子： upload_imgage("file") upload_imgage("file[0]") upload_imgage("file[2][5]") 
     * @return boolean or string 成功返回一个信息数组(relatively_path为相对网站跟目录FCPATH的路径) 失败返回false
     */
    public function upload($name) {
        $base_dir = 'uploads/images/';
        $base_url = $this->base_url;
        $time = time();
        $child_dir = date('Y', $time) . '/' . date('Ymd', $time) . '/';
        $info = $this->get_image_info($name); //获取文件的宽高
        $width = $info['width'];
        $height = $info['height'];
        if($info == FALSE){
            $width = $height = '';
        }
        $file_name = date('YmdHis', $time) . mt_rand(100, 999).'_'.$width.'_'.$height;
        $config['upload_path'] = $base_dir . $child_dir;
        $config['allowed_types'] = 'gif|jpg|jpeg|png';
        $config['max_size'] = 10240; //最大限制，单位KB
        $config['file_name'] = $file_name;
        $config['file_ext_tolower'] = TRUE; //后缀格式化为小写

        if (!is_dir($config['upload_path'])) {   //创建目录
            mkdir($config['upload_path'], 0777, true);
        }

        $this->load->library('upload');
        $this->upload->initialize($config);
        if ($this->upload->do_upload($name) === FALSE) {
            //echo $name;
            $this->set_error($this->upload->display_errors());
            return FALSE;
        }
        //$data = $this->add_width_height($this->upload->data()); //文件名里添加高度和宽度
        $data = $this->upload->data();
        
        //$data['relative_path'] = getRelativePath(str_replace('\\','/',realpath($data['full_path'])), str_replace('\\','/',realpath(FCPATH)));    //获取相对网站根目录的路径信息
        $data['relative_path'] = getRelativePath(realpath($data['full_path']), realpath(FCPATH));    //获取相对网站根目录的路径信息
        $data['relative_path'] = str_replace("\\", "/", $data['relative_path']);
        $data['url'] = str_replace("\\", "/", $base_url . $data['relative_path']);    //资源的访问地址
        return $data;
    }
    
    public function get_image_info($field) {
        // Is $_FILES[$field] set? If not, no reason to continue.
        if (isset($_FILES[$field])) {
            $_file = $_FILES[$field];
        }
        // Does the field name contain array notation?
        elseif (($c = preg_match_all('/(?:^[^\[]+)|\[[^]]*\]/', $field, $matches)) > 1) {
            $files = $_FILES;
            $_file = NULL;
            if (isset($files[$matches[0][0]])) {
                foreach ($files[$matches[0][0]] as $k => $v) {
                    //$temp = $v; 
                    for ($i = 1; $i < $c; $i++) {
                        $field = trim($matches[0][$i], '[]');
                        if (($field = trim($matches[0][$i], '[]')) === '' OR ! isset($v[$field])) {
                            $v = NULL;
                            break;
                        }
                        $v = $v[$field];
                    }
                    if ($v === NULL) {
                        $_file = NULL;
                        break;
                    }
                    $_file[$k] = $v;
                }
                unset($v);
            } else {
                $_file = NULL;
            }
        }

        if (empty($_file)) {
            return FALSE;
        }

        $info = @getimagesize($_file['tmp_name']);
        if ($info === FALSE) {
            return FALSE;
        }
        
        return [
            "width" => $info[0],
            "height" => $info[1],
            "size" => $_file['size']/1000,  //B转换为KB
        ];
    }

}
