var g_chat = {
    lastData: '',
    init: () => {
        $(`<div id='content_chatList' class="_content p-10 hide animated fadeIn" animated='fadeIn'>
            <div class="mainContent"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="chatList_add" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            </div>`).appendTo('.content-wrapper');
        $(`<div id='content_chat' class="_content p-10 hide animated fadeIn" animated='fadeIn'>
            <div class="mainContent"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="back" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>`).appendTo('.content-wrapper');
        $(`<h5 class="sidebar-title">` + _l('侧栏_聊天_标题') + `</h5>
            <div class="sidebar-divider"></div>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,chatList">
                    <span class="sidebar-icon">
                        <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_聊天_进入') + `
            </a>`).appendTo('.sidebar-menu');

        g_chat.registerActions();
        g_chat.initHtml();
        showContent('chatList');
        // showContent('chat');
        // g_chat.openChat('日常');
        // g_chat.showSearch();



        g_chat.rm = $(`
            <div style="position: fixed;top: 0; left: 0;width: 100%;height: 100%;z-index: 99999;display: none;background-color: rgba(0, 0, 0, .5);" onclick="
            if(event.target == this){
             var x = event.clientX;
            var y = event.clientY;
            var l = $('#msg_rm').offset().left;
            var t = $('#msg_rm').offset().top;
            if(!(x >= l && x <= l + $('#msg_rm').width() && y >= t && y <= t + $('#msg_rm').height())){
                this.style.display = 'none';
            }
        }
            ">
                <div id="msg_rm" class="bg-white row position-absolute p-5 border rounded w-auto" >
                <div class="btn-group-vertical p-5" role="group" aria-label="Vertical button group">

                    <div class="btn-group dropdown with-arrow mb-10" role="group">
                        <button class="btn text-dark" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-3" aria-haspopup="true" aria-expanded="false">`+_l('消息_操作')+`
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-3">
                            <div class="dropdown-content text-center">
                               <button class="btn mb-10 btn-secondary" data-action="chat_msg_mark" type="button">
                                <i class="fa fa-star-o " aria-hidden="true"></i>
                                `+_l('星标')+`</button>
                                <button class="btn mb-10" data-action="chat_msg_task" type="button">
                                <i class="fa fa-tasks" aria-hidden="true"></i>
                                `+_l('任务')+`</button>
                                <button class="btn mb-10" data-action="chat_msg_copy" type="button">
                                <i class="fa fa-clipboard" aria-hidden="true"></i>
                                `+_l('复制')+`</button>
                                <button class="btn btn-primary" data-action="chat_msg_edit" type="button">
                                <i class="fa fa-edit" aria-hidden="true"></i>
                                `+_l('编辑')+`</button>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group dropdown with-arrow mb-10" role="group">
                        <button class="btn text-dark" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-3" aria-haspopup="true" aria-expanded="false">`+_l('消息_样式')+`
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-3">
                            <div class="dropdown-content text-center">
                                
                                <button class="btn mb-10" data-action="chat_msg_style,bold" type="button">
                                <i class="fa fa-bold" aria-hidden="true"></i>
                                `+_l('加粗')+`</button>
                                <button class="btn mb-10" data-action="chat_msg_style,italic" type="button">
                                <i class="fa fa-italic" aria-hidden="true"></i>
                                `+_l('斜体')+`</button>
                                <button class="btn mb-10" data-action="chat_msg_style,del" type="button">
                                <i class="fa fa-strikethrough" aria-hidden="true"></i>
                                `+_l('删除线')+`</button>
                                <button class="btn mb" data-action="chat_msg_style,u" type="button">
                                <i class="fa fa-underline" aria-hidden="true"></i>
                                `+_l('下划线')+`</button>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group dropdown with-arrow mb-10" role="group">
                        <button class="btn text-dark" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-3" aria-haspopup="true" aria-expanded="false">`+_l('消息_颜色')+`
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-3">
                            <div class="dropdown-content text-center">
                                <button class="btn mb-10" data-action="chat_msg_color,primary" type="button">
                                    <i class="fa fa-circle text-primary" aria-hidden="true"></i>
                                    `+_l('蓝色')+`</button>
                                    <button class="btn mb-10" data-action="chat_msg_color,success" type="button">
                                    <i class="fa fa-circle text-success" aria-hidden="true"></i>
                                    `+_l('绿色')+`</button>
                                    <button class="btn mb-10" data-action="chat_msg_color,secondary" type="button">
                                    <i class="fa fa-circle text-secondary" aria-hidden="true"></i>
                                    `+_l('黄色')+`</button>
                                    <button class="btn mb-10" data-action="chat_msg_color,danger" type="button">
                                    <i class="fa fa-circle text-danger" aria-hidden="true"></i>
                                    `+_l('红色')+`</button>
                                    <button class="btn mb-10" data-action="chat_msg_color,white" type="button">
                                    <i class="fa fa-circle" aria-hidden="true"></i>
                                    `+_l('白色')+`</button>
                                     <button class="btn" data-action="chat_msg_color,default" type="button">
                                    <i class="fa fa-circle-o" aria-hidden="true"></i>
                                    `+_l('默认')+`</button>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-danger mt-10" data-action="chat_msg_delete" type="button">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    `+_l('删除')+`</button>

                </div>


                </div>
            </div>
        `).appendTo('body');

      registerContextMenu('.msg .main', (dom, event) => {
        g_chat.rm_showing = dom.parent('[data-time]').attr('data-time');
        g_chat.rm.css('display', 'unset');

        var div = $('#msg_rm');
        console.log( div.width());
        var i = div.width() / 2;
        var x = event.pageX;
        var mw = $(window).width();
        console.log(x, i, mw);
        if(x + i > mw){
            x = mw - div.width() - 10;
        }else{
            x -= i;
        }

        var y = event.pageY + 20;
        var mh = $(window).height();
        if(y + div.height() > mh){
            y = mh - div.height();
        }

        var data = g_chats[g_chat.name].msgs[dom.parent('[data-time]').attr('data-time')];
        for(var k of ['u', 'bold', 'italic', 'del']){
            var d =  $('[data-action="chat_msg_style,'+k+'"]');
            if(data[k]){
               d.addClass('btn-primary');
            }else{
               d.removeClass('btn-primary');
            }
        }
        addAnimation(div.css({
                left: x+'px',
                top: y+'px',
            }), 'flipInX', () => {
      });
    });
    },
     showSearch: () => {
         g_cache.closeCustom = () => {}
        $('#modal-custom').find('.modal-title').html(_l('弹出_搜索_标题'));
        $('#modal-custom').attr('data-type', 'msg_search').find('.modal-html').html(`
            <div class="input-group">
              <select class="form-control flex-reset w-75" onchange=""> 
                <option value="" disabled>`+_l('弹出_搜索_选择框_提示')+`</option>
                <option value="class-1" selected>`+_l('弹出_搜索_选择框_文本')+`</option>
              </select>
              <input type="text" class="form-control" placeholder="`+_l('弹出_搜索_输入框_默认')+`">
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">`+_l('弹出_搜索_按钮_搜索')+`</button>
              </div>
            </div>
            <div id="result-content">
                
            </div>
        `);
        halfmoon.toggleModal('modal-custom');
    },
    registerActions: () => {
        
        registerAction('chat_msg_copy', (dom, action, params) => {
            copyText($('.msg[data-time="'+ g_chat.rm_showing+'"]').find('.alert-text').text());
         });
        registerAction('chat_msg_edit', (dom, action, params) => {
            var par = $('.msg[data-time="'+ g_chat.rm_showing+'"]');
            var time = par.attr('data-time');
            var old = par.find('.alert-text').text();
            var text = prompt(_l('输入文本'), old);
            if(text != undefined && text != '' && text != old){
                g_chats[g_chat.name].msgs[time].text = text; 
                local_saveJson('chats', g_chats);
                par.replaceWith(g_chat.getHTML_msgs(time, g_chats[g_chat.name].msgs[time]));
            }
         });

         registerAction('chat_msg_style', (dom, action, params) => {
            var par = $('.msg[data-time="'+ g_chat.rm_showing+'"]');
            var time = par.attr('data-time');
            g_chats[g_chat.name].msgs[time][action[1]] = $(dom).toggleClass('btn-primary').hasClass('btn-primary');
            local_saveJson('chats', g_chats);
            par.replaceWith(g_chat.getHTML_msgs(time, g_chats[g_chat.name].msgs[time]));
         });
         registerAction('chat_msg_color', (dom, action, params) => {
            var par = $('.msg[data-time="'+ g_chat.rm_showing+'"]');
            var time = par.attr('data-time');
            if(action[1] == 'default'){
                delete  g_chats[g_chat.name].msgs[time]['color'];
            }else{
                 g_chats[g_chat.name].msgs[time]['color'] = action[1];
            }
            local_saveJson('chats', g_chats);
            par.replaceWith(g_chat.getHTML_msgs(time, g_chats[g_chat.name].msgs[time]));
         });
        registerAction('chat_msg_delete', (dom, action, params) => {
            if(confirm(_l('是否删除消息'))){
                var par = $('.msg[data-time="'+ g_chat.rm_showing+'"]');
                halfmoon.toggleModal('modal-custom');
                delete g_chats[g_chat.name].msgs[par.attr('data-time')];
                par.remove();
                local_saveJson('chats', g_chats);
            }
            g_chat.openChat($(dom).attr('data-name'));
        });
         registerAction('chatList_remove', (dom, action, params) => {
            if(confirm(_l('是否删除频道'))){
                delete g_chats[g_chat.name];
                local_saveJson('chats', g_chats);
                $('[data-action="toTab,chatList"]')[0].click();
                g_chat.initHtml();
            }
        });
        registerAction('chat_openChat', (dom, action, params) => {
            g_chat.openChat($(dom).attr('data-name'));
        });
        
        registerAction('chatList_add', (dom, action, params) => {
             g_cache.closeCustom = () => {}
             var edit = action.length > 1;
             
            $('#modal-custom').find('.modal-title').html(_l('弹出_频道_' + (edit ? '修改' : '新建')));
            $('#modal-custom').attr('data-type', 'chatList_add').find('.modal-html').html(`
                <div class="mb-10">
                    <div class="position-relative mx-auto w-fit" onclick="g_choose.icon.init();">
                        <i class="fa fa-edit icon mx-auto" id='chatList_add_icon' aria-hidden="true" data-icon="fa-edit"></i>
                        <i class="fa fa-edit text-primary" style="position: absolute; bottom: 0px;right: -5px;" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">`+_l('弹出_频道_新建_名称_标题')+`</span>
                  </div>
                  <input type="text" id="chatList_input_name" class="form-control" placeholder="`+_l('弹出_频道_新建_名称_默认')+`">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">`+_l('弹出_频道_新建_注释_标题')+`</span>
                  </div>
                  <textarea id="chatList_input_desc" class="form-control" placeholder="`+_l('弹出_频道_新建_注释_默认')+`"></textarea>
                </div>
                <button class="btn btn-primary btn-block" data-action="chatList_create`+ (edit ? ','+action[1] : '')+`">`+_l('弹出_频道_'+ (edit ? '修改' : '新建')+'_按钮_确定')+`</button>
            `);
            if(edit){
                var data =  g_chats[action[1]];
                $('#chatList_input_name').val(action[1]);
                $('#chatList_input_desc').val(data.desc);
                $('#chatList_add_icon').removeClass('fa-edit').addClass(data.icon).attr('data-icon', data.icon);
            }
            halfmoon.toggleModal('modal-custom');
        });
        registerAction('chatList_create', (dom, action, params) => {
            var input = $('#modal-custom input[type="text"]');
            var edit = action.length > 1
                var name = input.val();
                if(name == ''){
                    return input.focus();
                }
                if(g_chats[name] && !edit){
                    return alert(_l('弹出_频道_新建_已存在'));
                }
                var data = {
                    icon: $('#chatList_add_icon').attr('data-icon'),
                    desc: $('#modal-custom textarea').val(),
                }
                if(edit){
                    data = Object.assign(g_chats[action[1]], data);
                    g_chats[name] = data;
                    if(name != action[1]){
                        delete g_chats[action[1]];
                        var to = name;
                    }
                }else{
                    data.enable = true;
                    data.msgs = {};
                    data.createAt = new Date().getTime();
                }
           
            local_saveJson('chats', g_chats);
            halfmoon.toggleModal('modal-custom');
            if(to){
               g_chat.openChat(to);
            }else{
                g_chat.initHtml();
            }
        });
        registerAction('chat_searchTag', (dom, action, params) => {
        });
        registerAction('chat_sendMsg', (dom, action, params) => {
            var m = $('#msg').val();
            if (m != '') {
                $('#msg').val('');
                var data = {
                    text: m
                }
                var time = new Date().getTime();
                g_chats[g_chat.name].msgs[time] = data;
                local_saveJson('chats', g_chats);
                $('#content_chat .mainContent').append($(g_chat.getHTML_msgs(time, data)).addClass('animated lightSpeedInRight').attr('animated', 'lightSpeedInRight'));
                toBottom($('#content_chat'));
                $('.chat_list[data-name="'+g_chat.name+'"]').find('.badge').html(Object.keys( g_chats[g_chat.name].msgs).length);
            }
        });

    },
    initHtml: () => {
        var h = '';
        for (var name in g_chats) {
            h += g_chat.getHtml(g_chats[name], name);
        }
        $('#content_chatList .mainContent').html(h);

    },
    getHTML_msgs: (time, data) => {
        var h = '';
        var date = new Date(Number(time));
        var s_data = getFormatedTime(2, date);
        if (s_data != g_chat.lastData) {
            g_chat.lastData = s_data;
            h += `<h6 class='text-muted text-center d-block mt-10'>` + s_data + `</h6>`;
        }
        for(var tag of cutStrings1(data.text, '#', true)){
            data.text = data.text.replaceAll('#'+tag, '<a data-action="chat_searchTag">#'+tag+'</a>');
        }
        h += `<div class="msg ns row justify-content-end mb-10" data-time="`+time+`" >
                    <div class="col-auto align-self-end mr-10">
                        <span class='time text-muted text-right'>` + getFormatedTime(0, date) + `</span>
                    </div>
                <div class="alert`+(data.color ? ' alert-'+data.color : '')+` main filled-dm mt-10 mr-10 col-auto" role="alert">
                  <h4 class="alert-heading"></h4>
                  <span class="alert-text">` + g_chat.getStyle(data) + `</span>
                </div>
            </div>`;
        //  <img src="img/maki.jpg" class="user-icon">
        return h;
    },

    getStyle: (data) => {
        var text = data.text;
        if(data.u){
            text = '<u>'+text+'</u>';
        }
        if(data.del){
            text = '<s>'+text+'</s>';
        }
        if(data.italic){
            text = '<i>'+text+'</i>';
        }
        if(data.bold){
            text = '<b>'+text+'</b>';
        }
        return text;
    },

    openChat: (name) => {
        g_chat.lastData = '';
        g_chat.name = name;
        /*
            <a href="#" class="dropdown-item">
              Analytics
              <strong class="badge badge-success float-right">New</strong>
            </a>
        */
        var h = '';
        // todo 多种消息支持，根据类型执行不同的函数得出不同的Html
        for (var time in g_chats[name].msgs) {
            h += g_chat.getHTML_msgs(time, g_chats[name].msgs[time])
        }
        $('#content_chat .mainContent').html(h);

        $('.navbar-fixed-bottom').html(`
            <div id="bottom_chat" class="row w-full flex-center toolbar">
                <div class="col-9 flex-center" style="">
                    <i class="fa fa-smile-o font-size-18" aria-hidden="true" style="position: absolute;left: 15px;"></i>
                    <input type="text" id='msg' class="form-control" placeholder="ここで入力する..." onkeydown="if(event.keyCode == 13){doAction(null, 'chat_sendMsg')}" style="padding-left: 40px;padding-right: 40px;">
                    <i class="fa fa-picture-o font-size-18" aria-hidden="true" style="position: absolute;right: 15px;"></i>
                </div>
                <div class='col-1'></div>
                <button class="btn btn-primary col float-right" type="button" data-action="chat_sendMsg" style="max-width: 90%;border-radius: 20px;">
                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
            </div>`);
        showContent('chat');
        $('.navbar-brand').html('🔈 '+name);
        $('.navbar-nav').html(`
            <li class="nav-item dropdown with-arrow">
          <a class="nav-link" data-toggle="dropdown" id="nav-link-dropdown-toggle">
            <i class="fa fa-ellipsis-v mr-15 " aria-hidden="true"></i> 
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="nav-link-dropdown-toggle">
            <a data-action="chatList_add,`+name+`" class="dropdown-item">`+_l('频道信息')+`</a>
            <div class="dropdown-divider"></div>
            <div class="dropdown-content">
              <a data-action="chatList_remove" class="btn btn-block btn-danger" role="button">
                <i class="fa fa-trash-o mr-5" aria-hidden="true"></i>
                Remove
              </a>
            </div>
          </div>
        </li>
        `);
        toBottom($('#content_chat'));
    },

    getHtml: (data, name) => {
        var keys = Object.keys(data.msgs);
        var len = keys.length;
        return `<div class="alert filled-lm chat_list" role="alert" data-action="chat_openChat" data-name="` + name + `">
                    <div class="icon">
                        <i data-action="habbit_dots" class="fa ` + data.icon + `" aria-hidden="true"></i>
                    </div>
                    <div style="margin-left: 20px;">
                      <h4 class="alert-heading text-truncate" style="calc(100% - 100px);">` + name + `</h4><span>
                      ` + (len > 0 ? data.msgs[keys[keys.length-1]].text : _l('什么都没写')) + `</span>
                  </div>
                    <span class="text-muted rt">` + getFormatedTime(0, new Date(parseInt(len > 0 ? keys[0] : data.createAt))) + `</span>
                    <span class="badge badge-primary rb">` + len + `</span>
                </div>`;
    }
}
g_chat.init();