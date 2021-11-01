
var g_user = {
	init: () => {
    if(g_user.inited) return;
        g_user.inited = true;
		if(!g_config.user){
      if(!g_config.firstLogin){
        g_config.firstLogin = true;
        local_saveJson('config', g_config);
        g_user.modal();
      }
		}else{
      $('#sidebar_icons_float img').attr('src', _vars.img+g_config.user.icon);
    }
    registerAction('user_uploadIcon', (dom, action, params) => {
      $('#input_img').attr({
        'data-config': JSON.stringify({width: 200, quality: 0.5}),
        'data-type': 'userIcon'})[0].click();
    });
    registerAction('user_setProfile', (dom, action, params) => {
      // var v = checkInputValue($('#user_input_mail, #user_input_name, #user_input_password'));
      var v = checkInputValue($('#user_input_name'));
      if(!v) return;
      var data = {
          name: v[0],
          icon: $('#user_icon').attr('src'),
          // email: v[0],
          // password: v[2],
          // desc: $('#user_input_desc').val(),
      }
      $(dom).html(_l('弹出_用户_按钮_上传中'));
      queryMsg({type: 'setProfile', data: data});
    });
     
    registerRevice('countMsg', (data) => {
      g_config.lastUpload = data.msgs;
      var s_data =  getFormatedTime(4, new Date(data.time));
        if(g_config.lastUploadAll != s_data){
          g_config.lastUploadAll = s_data;
          var d = {};
           for (var key of local_getList()) {
                d[key] = localStorage.getItem(key);
            }
          queryMsg({type: 'data', data: d}, true);
       }
      local_saveJson('config', g_config);
    });
    registerRevice('setProfile', (data) => {
      $('[data-action="user_setProfile]').html(_l('弹出_用户_修改_按钮_确定'));
      g_config.user = data.data;
      $('#sidebar_icons_float img').attr('src', _vars.img+ g_config.user.icon);
      local_saveJson('config', g_config);
      closeModal('modal-custom', 'user', () => {
         halfmoon.toggleModal('modal-custom');
      });
       toastPAlert(_l('用户_上传成功'), 'alert-success');
       g_user.upload();
    })
	},
/*
  
*/

  upload: () => {
    var s_data = getFormatedTime(4);
    var cnt = g_chat.countMsg(s_data);
    if(g_config.lastUpload != cnt && cnt > 0){
        queryMsg({type: 'countMsg', msgs: cnt, time: new Date().getTime()}, true);
     
    }
  },
	
	modal: (data) => {
		var edit = !data;
		if(edit){
			data = g_config.user || {
				name: '',
				icon: 'img/user.jpg'
    //     email: '',
    //     password: '',
				// desc: '',
			};
		}
    /*
  <div class="input-group mb-10">
                <div class="input-group-prepend">
                  <span class="input-group-text">`+_l('弹出_用户_邮箱_标题')+`</span>
                </div>
                <input type="email" id="user_input_email" class="form-control" placeholder="`+_l('弹出_用户_邮箱_标题_默认')+`" value="`+data.email+`">
              </div>
  <div class="input-group mb-10">
                <div class="input-group-prepend">
                  <span class="input-group-text">`+_l('弹出_用户_密码_标题')+`</span>
                </div>
                <input type="text" id="user_input_password" class="form-control" placeholder="`+_l('弹出_用户_密码_标题_默认')+`" value="`+data.password+`">
              </div>
              <div class="input-group mb-10">
                <div class="input-group-prepend">
                  <span class="input-group-text">`+_l('弹出_用户_名称_介绍_标题')+`</span>
                </div>
                <textarea id="user_input_desc" class="form-control" placeholder="`+_l('弹出_用户_名称_介绍_默认')+`">`+data.desc+`</textarea>
              </div>

    */
          $('#modal-custom').find('.modal-title').html(_l('弹出_用户_' + (edit ? '修改' : '新建')));
          $('#modal-custom').attr('data-type', 'user').find('.modal-html').html(`
              <div class="mb-10">
                  <div class="position-relative mx-auto w-fit" data-action="user_uploadIcon">
                      <img id='user_icon' src="`+data.icon+`" class="user-icon">
                      <i class="fa fa-edit text-primary" style="position: absolute; bottom: 0px;right: -5px;" aria-hidden="true"></i>
                  </div>
              </div>
              <div class="input-group mb-10">
                <div class="input-group-prepend">
                  <span class="input-group-text">`+_l('弹出_用户_名称_标题')+`</span>
                </div>
                <input type="text" id="user_input_name" class="form-control" placeholder="`+_l('弹出_用户_名称_标题_默认')+`" value="`+data.name+`">
              </div>
              <button class="btn btn-primary btn-block" data-action="user_setProfile">`+_l('弹出_用户_'+ (edit ? '修改' : '新建')+'_按钮_确定')+`</button>
          `);
          if(data.email){
            $('#user_input_email').prop('disabled', true);
          }
          halfmoon.toggleModal('modal-custom');
		}
}

g_user.init();