<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf8">
        <title>提示</title>
        <link rel="stylesheet" type="text/css" href="<?= base_url('/result/admin/bootstrap/css/bootstrap.min.css') ?>" />
        <link rel="stylesheet" type="text/css" href="<?=base_url('/result/admin/dist/css/AdminLTE.min.css')?>" />
    </head>
    <body>
        <div class="modal" data-backdrop="static">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">提示</h4>
              </div>
              <div class="modal-body">
                <p><?=$message?></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>

        <script src='<?= base_url("result/admin/plugins/jQuery/jquery-2.2.3.min.js") ?>'></script>
        <script src="<?= base_url('/result/admin/bootstrap/js/bootstrap.min.js') ?>" ></script>
        <script>
            $(".modal").on("show.bs.modal",function(){
                setTimeout(function(){
                    $(".modal").modal("hide");
                },<?=$time*1000?>); 
            });
            $(".modal").on("hide.bs.modal",function(){
                <?php if($url){?>
                    <?php if($url == 'back'){?>
                        window.history.go(-2);
                    <?php }else{?>
                    self.location.href='<?=$url?>';
                    <?php }?>
                <?php }else{?>
                    location.href = document.referrer;
                <?php }?> 
            });            
            $(".modal").modal("show");  //初始化

        </script>
    </body>
</html>
