var g_chat = {
    lastData: '',
    fullscreen: false,
    preInit: () => {
        $(`<h5 class="sidebar-title">` + _l('侧栏_聊天_标题') + `</h5>
            <div class="sidebar-divider"></div>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,chatList">
                    <span class="sidebar-icon">
                        <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_聊天_进入') + `
            </a>`).appendTo('.sidebar-menu');
    },
    init: () => {
        if (g_chat.inited) return;
        g_chat.inited = true;
        $(`<div id='content_chatList' class="_content p-10 hide animated fadeIn" animated='fadeIn'>
            <div class="mainContent"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="chatList_add" class="btn btn-square btn-primary rounded-circle btn-lg shadow" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            </div>`).appendTo('.content-wrapper');
        // <a data-action="up" class="btn btn-square btn-primary rounded-circle btn-lg shadow" style="display: none;" role="button"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
        $(`<div id='content_chat' class="_content hide animated fadeIn" animated='fadeIn'>
            <div id="div_inpuit" class="theme w-full p-5 mb-10" style="z-index: 9999"></div>
            <div class="mainContent"></div>
            <div class="ftb br">

                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="back" class="btn btn-square btn-primary rounded-circle btn-lg shadow" role="button"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>`).appendTo('.content-wrapper');


        g_chat.registerActions();
        g_chat.initHtml();
        // showContent('chatList');
        // showContent('chat');
        // g_chat.showSearch();
                      //😀😁😂🤣😃😄😅😆😆😉😊😋😎😍😘🥰😗
        //
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

                <div id="msg_rm" class="w-125 bg-white row position-absolute p-5 border rounded w-auto" >


                <div class="overflow-y-hidden overflow-x-scroll w-full h-50 w-full">
                      <div class="w-full font-size-20 d-inline-flex" onmousewheel="this.parentElement.scrollBy(event.deltaY, 0)" id="emoji_recent">
                      </div>
                </div>

                <div class="btn-group-vertical p-5" role="group" aria-label="Vertical button group">

                    <div class="btn-group dropdown with-arrow mb-10" role="group">
                        <button class="btn text-dark" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-3" aria-haspopup="true" aria-expanded="false">` + _l('消息_操作') + `
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-3">
                            <div class="dropdown-content text-center">
                               <button class="btn mb-10 btn-secondary" data-action="chat_msg_mark" type="button">
                                <i class="fa fa-star-o " aria-hidden="true"></i>
                                ` + _l('星标') + `</button>
                                <button class="btn mb-10" data-action="chat_msg_task" type="button">
                                <i class="fa fa-tasks" aria-hidden="true"></i>
                                ` + _l('任务') + `</button>
                                <button class="btn mb-10" data-action="chat_msg_copy" type="button">
                                <i class="fa fa-clipboard" aria-hidden="true"></i>
                                ` + _l('复制') + `</button>
                                <button class="btn btn-primary" data-action="chat_msg_edit" type="button">
                                <i class="fa fa-edit" aria-hidden="true"></i>
                                ` + _l('编辑') + `</button>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group dropdown with-arrow mb-10" role="group">
                        <button class="btn text-dark" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-3" aria-haspopup="true" aria-expanded="false">` + _l('消息_样式') + `
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-3">
                            <div class="dropdown-content text-center">
                                
                                <button class="btn mb-10" data-action="chat_msg_style,bold" type="button">
                                <i class="fa fa-bold" aria-hidden="true"></i>
                                ` + _l('加粗') + `</button>
                                <button class="btn mb-10" data-action="chat_msg_style,italic" type="button">
                                <i class="fa fa-italic" aria-hidden="true"></i>
                                ` + _l('斜体') + `</button>
                                <button class="btn mb-10" data-action="chat_msg_style,del" type="button">
                                <i class="fa fa-strikethrough" aria-hidden="true"></i>
                                ` + _l('删除线') + `</button>
                                <button class="btn mb" data-action="chat_msg_style,u" type="button">
                                <i class="fa fa-underline" aria-hidden="true"></i>
                                ` + _l('下划线') + `</button>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group dropdown with-arrow mb-10" role="group">
                        <button class="btn text-dark" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-3" aria-haspopup="true" aria-expanded="false">` + _l('消息_颜色') + `
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-3">
                            <div class="dropdown-content text-center">
                                <button class="btn mb-10" data-action="chat_msg_color,primary" type="button">
                                    <i class="fa fa-circle text-primary" aria-hidden="true"></i>
                                    ` + _l('蓝色') + `</button>
                                    <button class="btn mb-10" data-action="chat_msg_color,success" type="button">
                                    <i class="fa fa-circle text-success" aria-hidden="true"></i>
                                    ` + _l('绿色') + `</button>
                                    <button class="btn mb-10" data-action="chat_msg_color,secondary" type="button">
                                    <i class="fa fa-circle text-secondary" aria-hidden="true"></i>
                                    ` + _l('黄色') + `</button>
                                    <button class="btn mb-10" data-action="chat_msg_color,danger" type="button">
                                    <i class="fa fa-circle text-danger" aria-hidden="true"></i>
                                    ` + _l('红色') + `</button>
                                    <button class="btn mb-10" data-action="chat_msg_color,white" type="button">
                                    <i class="fa fa-circle" aria-hidden="true"></i>
                                    ` + _l('白色') + `</button>
                                     <button class="btn" data-action="chat_msg_color,default" type="button">
                                    <i class="fa fa-circle-o" aria-hidden="true"></i>
                                    ` + _l('默认') + `</button>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-danger mt-10" data-action="chat_msg_delete" type="button">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    ` + _l('删除') + `</button>

                </div>


                </div>
            </div>
        `).appendTo('body');
            g_emoji.initHistoryEmoji();

        registerContextMenu('.chat_list', (dom, event) => {
            doAction(null, 'chatList_add,'+dom.attr('data-name'));
        });
        registerContextMenu('.msg .main', (dom, event) => {
            g_chat.rm_showing = dom.parent('[data-time]').attr('data-time');
            g_chat.rm.css('display', 'unset');

            var div = $('#msg_rm');
            var i = div.width() / 2;
            var x = event.pageX;
            var mw = $(window).width();
            if (x + i > mw) {
                x = mw - div.width() - 10;
            } else {
                x -= i;
            }

            var y = event.pageY + 20;
            var mh = $(window).height();
            if (y + div.height() > mh) {
                y = mh - div.height();
            }

            var data = g_chats[g_chat.name].msgs[dom.parent('[data-time]').attr('data-time')];
            for (var k of ['u', 'bold', 'italic', 'del']) {
                var d = $('[data-action="chat_msg_style,' + k + '"]');
                if (data[k]) {
                    d.addClass('btn-primary');
                } else {
                    d.removeClass('btn-primary');
                }
            }
            addAnimation(div.css({
                left: x + 'px',
                top: y + 'px',
            }), 'flipInX', () => {});
        });

    },
    showSearch: () => {
        g_cache.closeCustom = () => {}
        $('#modal-custom').find('.modal-title').html(_l('弹出_搜索_标题'));
        $('#modal-custom').attr('data-type', 'msg_search').find('.modal-html').html(`
            <div class="input-group">
              <select class="form-control flex-reset w-75" onchange=""> 
                <option value="" disabled>` + _l('弹出_搜索_选择框_提示') + `</option>
                <option value="class-1" selected>` + _l('弹出_搜索_选择框_文本') + `</option>
              </select>
              <input type="text" class="form-control" placeholder="` + _l('弹出_搜索_输入框_默认') + `">
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">` + _l('弹出_搜索_按钮_搜索') + `</button>
              </div>
            </div>
            <div id="result-content">
                
            </div>
        `);
        halfmoon.toggleModal('modal-custom');
    },
    showRanking: (date, table = true) => {
            g_cache.rankingDate = date;
            var d = g_cache.ranking;
                var h = '';
            if (d[date]) {
                var i = 1;

                for (var name of Object.keys(d[date]).sort(function(a, b) {
                    return d[date][b][g_cache.ranking_sort] - d[date][a][g_cache.ranking_sort]
                })) {
                    var s;
                    switch (i) {
                        case 1:
                            s = '🥇';
                            break;

                        case 2:
                            s = '🥈';
                            break;

                        case 3:
                            s = '🥉';
                            break;

                        default:
                            s = i;
                    }
                    h += `
                <tr>
                  <th>` + s + `</th>
                  <td><img src="` + _vars['img'] + 'icons/' + name + `.jpg" class="user-icon"></td>
                  <td>` + name + `</td>
                  <td>` + d[date][name].chars + `</td>
                  <td class="text-right">` + d[date][name].msgs + `</td>
                </tr>`;
                    i++;
                }
            }

            if(table){
                    $('#modal-custom').find('.modal-title').html(_l('弹出_排行榜_标题', date));
                    $('#modal-custom').attr('data-type', 'ranking').find('.modal-html').html(`
                
                <div class="flex-center float-right" data-action="ranking_chooseData">
                    <i class="fa fa-calendar"  style="position: relative; left: 25px;top: 0;" aria-hidden="true"></i>
                    <input type="text" class="form-control timepicker text-center pl-20 w-auto" style="width: 125px;" readonly placeholder="日付を選択">
                </div>

                <table class="table" id='table_ranking'>
                  <thead>
                    <tr>
                      <th width="50px">` + _l('排行_名次') + `</th>
                      <th>` + _l('排行_头像') + `</th>
                      <th>` + _l('排行_用户') + `</th>
                      <th data-action="ranking_sort,chars">` + _l('排行_字符数') + `<i class="fa fa-arrow-up hide" aria-hidden="true"></i></th>
                      <th data-action="ranking_sort,msgs" class="text-right text-primary">` + _l('排行_消息数') + `<i class="fa fa-arrow-up" aria-hidden="true"></i></th>
                    </tr>
                  </thead>
                  <tbody>`+h+'</tbody></table>');
                    if(!closeModal('modal-custom', 'ranking')){
                        halfmoon.toggleModal('modal-custom');
                    }
                }else{
                    closeModal('modal-custom', 'ranking', () => {
                         $('#modal-custom tbody').html(h);
                    })
                }

    },
     setTextStyle: (time, style, enable) => {
            var par = $('.msg[data-time="' +time+ '"]');
            var time = par.attr('data-time');
            if(enable == undefined){
               enable = !g_chats[g_chat.name].msgs[time][style]; 
            }
            g_chats[g_chat.name].msgs[time][style] = enable;
            local_saveJson('chats', g_chats);
            par.replaceWith(g_chat.getHTML_msgs(time, g_chats[g_chat.name].msgs[time], true));
        },

        // pin 文字/图片 到消息
     pin_to_msg: (time, value) => {
            var dom = $('.msg[data-time="' +time+ '"]');
            if(value == ''){
                delete g_chats[g_chat.name].msgs[time].emoji;
            }else{
                g_chats[g_chat.name].msgs[time].emoji = value;
            }
            local_saveJson('chats', g_chats);
            dom.replaceWith(g_chat.getHTML_msgs(time, g_chats[g_chat.name].msgs[time], true));
        },

        
    registerActions: () => {
        
        registerAction('event_#msg', (dom, action, params, event) => {
            var img = $(dom).find('[data-audio]');
            if(img.length){
                g_emoji.playAudio(img.attr('data-audio'));
            }
        });

        registerAction('editor_fullscreen', (dom, action, params, event) => {
            g_chat.fullscreen = !g_chat.fullscreen;
            if(g_chat.fullscreen){
                var div = $('.navbar-fixed-bottom').css({top: 0, height: '100%'}).find('#bottom_chat').css('height', '100%').find('.flex-center').css('height', '100%');
                div.find('#msg').css('height', '100%').addClass('col-12');
                $('button[data-action="chat_sendMsg"]').css({
                        position: 'fixed',
                         height: 'unset', 
                        bottom: 0,
                        right: 0
                });
            }else{
                var div = $('.navbar-fixed-bottom').css({top: 'unset', height: '100px'}).find('#bottom_chat').css('height', 'unset').find('.flex-center').css('height', 'unset');
                div.find('#msg').css('height', 'unset').removeClass('col-12');
                $('button[data-action="chat_sendMsg"]').css({
                        position: 'unset',
                         height: 'unset', 
                });
            }
            
        });
       
        registerAction('emoji_select', (dom, action, params) => {
            g_chat.pin_to_msg(action.length > 1 ? action[1] : g_chat.rm_showing ,action.length > 1 ? '' : dom.nodeName == 'IMG' ? dom.src : $(dom).html());
        });
         registerAction('ranking_sort', (dom, action, params) => {
            $('#table_ranking').find('.fa-arrow-up').hide().parent().removeClass('text-primary');
            $(dom).find('.fa-arrow-up').show().parent().addClass('text-primary');
            g_cache.ranking_sort = action[1];
            g_chat.showRanking( g_cache.rankingDate, false);
        });
        registerAction('ranking', (dom, action, params) => {
            toastPAlert('loading...', 'alert-secondary');
            queryMsg({ type: 'ranking' });
        });
        registerAction('ranking_chooseData', (dom, action, params) => {
            if(!g_cache.ranking){
                return queryMsg({ type: 'ranking' });
            }
            var enable = [true];
            for(var date in g_cache.ranking){
                var a = date.split('/');
                a[1]--; // 月 - 1
                 enable.push(a);
            }
            $('.timepicker').pickadate({
                 disable: enable,
                 onSet: function(thingSet) {
                    g_chat.showRanking(getFormatedTime(4, new Date(thingSet.select)));
                 }
             });

    });            
        
        registerRevice('ranking', (data) => {
             var d = data.data;
            g_cache.ranking = d;
            g_chat.showRanking(getFormatedTime(4));
        });
        registerAction('chat_msg_copy', (dom, action, params) => {
            copyText($('.msg[data-time="' + g_chat.rm_showing + '"]').find('.alert-text').text());
        });
        registerAction('chat_msg_edit', (dom, action, params) => {
            var par = $('.msg[data-time="' + g_chat.rm_showing + '"]');
            var time = par.attr('data-time');
            var old = par.find('.alert-text').text();
            g_chat.editId = time;
            g_chat.editText = old;
            g_chat.editor.txt.html(old);
            g_chat.rm.css('display', 'none');
             g_chat.editor.cmd.do('insertHTML', ''); // 聚焦
        });

       

        registerAction('chat_msg_style', (dom, action, params) => {
            g_chat.setTextStyle( g_chat.rm_showing ,action[1], $(dom).toggleClass('btn-primary').hasClass('btn-primary'));
        });
        registerAction('chat_msg_color', (dom, action, params) => {
            var par = $('.msg[data-time="' + g_chat.rm_showing + '"]');
            var time = par.attr('data-time');
            if (action[1] == 'default') {
                delete g_chats[g_chat.name].msgs[time]['color'];
            } else {
                g_chats[g_chat.name].msgs[time]['color'] = action[1];
            }
            local_saveJson('chats', g_chats);
            par.replaceWith(g_chat.getHTML_msgs(time, g_chats[g_chat.name].msgs[time], true));
        });
        registerAction('chat_msg_delete', (dom, action, params) => {
            confirm(_l('是否删除消息')).then((d) => {
                if(d.button == 'ok'){
                g_chat.rm.css('display', 'none');
                var par = $('.msg[data-time="' + g_chat.rm_showing + '"]');
                var h6 = par.next();
                if(h6.hasClass('date') && !par.prev().hasClass('msg')){ // 删除的是最后一个
                    h6.remove();
                    g_chat.lastData = '';
                }
                delete g_chats[g_chat.name].msgs[par.attr('data-time')];
                par.remove();

                local_saveJson('chats', g_chats);
            }
            })
        });
        registerAction('chatList_remove', (dom, action, params) => {
            confirm(_l('是否删除频道')).then((d) => {
                if(d.button == 'ok'){
                delete g_chats[g_chat.name];
                local_saveJson('chats', g_chats);
                $('[data-action="toTab,chatList"]')[0].click();
                g_chat.initHtml();
            }
        });
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
                        <i class="fa fa-edit _icon mx-auto" id='chatList_add_icon' aria-hidden="true" data-icon="fa-edit"></i>
                        <i class="fa fa-edit text-primary" style="position: absolute; bottom: 0px;right: -5px;" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_频道_新建_名称_标题') + `</span>
                  </div>
                  <input type="text" id="chatList_input_name" class="form-control" placeholder="` + _l('弹出_频道_新建_名称_默认') + `">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_频道_新建_注释_标题') + `</span>
                  </div>
                  <textarea id="chatList_input_desc" class="form-control" placeholder="` + _l('弹出_频道_新建_注释_默认') + `"></textarea>
                </div>
                <button class="btn btn-primary btn-block" data-action="chatList_create` + (edit ? ',' + action[1] : '') + `">` + _l('弹出_频道_' + (edit ? '修改' : '新建') + '_按钮_确定') + `</button>
            `);
            if (edit) {
                var data = g_chats[action[1]];
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
            if (name == '') {
                return input.focus();
            }
            if (g_chats[name] && !edit) {
                return alert(_l('弹出_频道_新建_已存在'));
            }
            var data = {
                icon: $('#chatList_add_icon').attr('data-icon'),
                desc: $('#modal-custom textarea').val(),
            }
            if (edit) {
                data = Object.assign(g_chats[action[1]], data);
               
                if (name != action[1]) {
                    delete g_chats[action[1]];
                    var to = name;
                }
            } else {
                data.enable = true;
                data.msgs = {};
                data.createAt = new Date().getTime();
            }
             g_chats[name] = data;

            local_saveJson('chats', g_chats);
            halfmoon.toggleModal('modal-custom');
            if (to) {
                g_chat.openChat(to);
            } else {
                g_chat.initHtml();
            }
        });
        registerAction('chat_searchTag', (dom, action, params) => {});
        registerAction('chat_sendMsg', (dom, action, params) => {
            var m = g_chat.editor.txt.html();
            if (m != '') {
                g_emoji.hide();
                if(g_chat.fullScreen){
                    $('[data-action="editor_fullscreen"]').click();
                }
                var c = $('<div>'+m+'</div>').clone(); // 用div把所有元素包成1个，以便取得所有html
                for(var d of c.find('.emoji_')){
                    // 去除蜜汁插入图片的背景颜色
                    d.style.backgroundColor = '';
                }
                if(c.length == 1 && c[0].nodeName == 'P'){
                    s = c[0].innerText;
                } else{
                    s = c[0].outerHTML // jq html() 无法获取h1等等
                }
                s = s.replace('<p>', '').replace('</p>', '').replace('<div>', '').replace('</div>', ''); // 替换一个div与p

                g_chat.editor.txt.clear();

                 if(g_chat.editId && s != g_chat.editText){
                    var time = g_chat.editId;
                     g_chats[g_chat.name].msgs[time].text = s;
                    $('.msg[data-time="' + time + '"]').replaceWith(g_chat.getHTML_msgs(time, g_chats[g_chat.name].msgs[time], true));
                }else{
                     var data = {
                        text: s
                    }
                    var time = new Date().getTime();
                    g_chats[g_chat.name].msgs[time] = data;
                    $('#content_chat .mainContent').prepend($(g_chat.getHTML_msgs(time, data, false)).addClass('animated lightSpeedInRight').attr('animated', 'lightSpeedInRight'));
                    $('.chat_list[data-name="' + g_chat.name + '"]').find('.badge').html(Object.keys(g_chats[g_chat.name].msgs).length);
                }
                local_saveJson('chats', g_chats);
                g_chat.editId = '';
                g_chat.editText = '';

                $('.chat_list[data-name="'+g_chat.name+'"]').replaceWith(g_chat.getHtml(g_chats[g_chat.name], g_chat.name));

            }
        });

    },
    countMsg: (s_data, channel) => {
        var cnt = [0, 0];
        var channels;
        if(channel){
            channels = [channel];
        }else{
            channels = Object.keys(g_chats);
        }
        for (var name of channels) {
            for (var time in g_chats[name].msgs) {
                if (getFormatedTime(4, new Date(parseInt(time))) == s_data) {
                    cnt[0]++;
                    cnt[1]+=g_chats[name].msgs[time].text.length;
                }
            }
        }
        return cnt;
    },
    initHtml: () => {
        var h = '';
        for (var name in g_chats) {
            h += g_chat.getHtml(g_chats[name], name);
        }

        $('#content_chatList .mainContent').html(h);
        
    },
    initNav: () => {
        $('.navbar-nav').html(`
            <li class="nav-item" data-action="ranking">
              <a class="nav-link font-size-20">🏆</a>
            </li>
        `);
    },
    initBottom: () => {
        var cnt = g_chat.countMsg(getFormatedTime(4));
         $('.navbar-fixed-bottom').html(`
            <div id="bottom_chatList" class="row w-full flex-center toolbar">
                <div class="col-9 flex-center mx-auto" >
                    
                </div>
                <div class='col'>
                    <a class="badge-group">
                      <span class="badge bg-dark text-white">`+getFormatedTime(2)+`</span>
                      <span class="badge badge-primary">`+cnt[0]+`</span>
                    </a>
                </div>

            </div>`);

    },
    getHTML_msgs: (time, data, replace = true) => {
        var h = '';
      
        // <font color="#c24f4a">wwwwwwwwwwwww</font>
        var s = data.text;
        if(s.indexOf('color="') != -1){
            s = $(s).text(); // 提取标签内文本
            var s1 = data.text.replace(s, '{str}');
        }
        for (var tag of cutStrings1(s, '#', true)) {
            s = s.replaceAll('#' + tag, '<a data-action="chat_searchTag">#' + tag + '</a>');
        }
        if(s1){
            s = s1.replace('{str}', s); // 换回去
            delete s1;
        }
        h += `<div class="msg ns row justify-content-end mb-10" data-time="` + time + `" data-action="event_#msg" >

                    <div class="col-auto align-self-end mr-10">
                        <span class='time text-muted text-right'>` + getFormatedTime(0, date) + `</span>
                    </div>
                <div class="alert` + (data.color ? ' alert-' + data.color : '') + ` main filled-dm mb-5 mr-10 col-auto shadow-sm" role="alert">
                `+g_chat.initMessagePin(time, data.emoji)+`
                
                  <span class="alert-text text-break msg_text">` + g_chat.getStyle(data, s) + `</span>
                </div>
            </div>`;

        var date = new Date(Number(time));
        var s_data = getFormatedTime(4, date);
        if (!replace && s_data != g_chat.lastData) {
            g_chat.lastData = s_data;
            h += `<h6 class='text-muted text-center d-block mt-20 date'>` + s_data + `</h6>`;
        }
                 
            // <h4 class="alert-heading"></h4>
        //  <img src="img/maki.jpg" class="user-icon">
        return h;
    },

    initMessagePin: (time, s) => {
        if(s != undefined && s != ''){
            if(s.substr(0, 1) == '{' && s.substr(-1) == '}'){
                var d = JSON.parse(s);
                return '<img class="emoji-pin" style="width: 50px;margin: 5px;height:50px;" src="'+d.img+'" data-src="'+d.img+'" data-action="emoji_select,'+time+'"'+(d.audio ? ' data-audio="'+d.audio+'"': '')+'>';
            }
                return s.indexOf('http') != -1 ? '<img class="emoji-pin" style="width: 23px;margin: 5px;height:23px;" src="'+s+'" data-action="emoji_select,'+time+'">' : '<span class="emoji-pin" data-action="emoji_select,'+time+'">'+s+'</span>';
        }
        return '';
    },

    getStyle: (data, s) => {
        var text = s || data.text;
        if (data.u) {
            text = '<u>' + text + '</u>';
        }
        if (data.del) {
            text = '<s>' + text + '</s>';
        }
        if (data.italic) {
            text = '<i>' + text + '</i>';
        }
        if (data.bold) {
            text = '<b>' + text + '</b>';
        }
        return text;
    },

    openChat: (name) => {
        if(name == undefined) return
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
            h = g_chat.getHTML_msgs(time, g_chats[name].msgs[time], false) + h;
        }
        
        for(var img of $('#content_chat .mainContent').html(h)){
            reloadImage(img);
        }
        // .navbar-fixed-bottom
        //  <i data-action="editor_fullscreen" class="fa fa-arrows-alt" aria-hidden="true" style="position: absolute;top: 5px; left: 12px;z-index: 9999;"></i>
        $('#div_inpuit').html(`
                <div class='col-12'>
                    <div id="toolbar-container" class="w-full"></div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-1">
                       
                     </div>
               

                    <div id="msg" class="w-full text-center form-control col-10 mx-auto  " style="height: 50px;padding-right: 35px;padding-left: 5px;border-bottom-right-radius: 50px !important;">
                    </div>
                    <div class="col-1">

                     <a data-action="chat_sendMsg" class="btn btn-square btn-primary rounded-circle btn-lg shadow" style="position: absolute;bottom: 2px; right: 18px;font-size: 2rem;"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>
                    </div>
            </div>`);
          g_chat.editor = new wangEditor("#toolbar-container", "#msg");
          g_chat.editor.config.menus = [
                // 'emoticon',
                'bold',
                'todo',
                'italic',
                'underline',
                'strikeThrough',
                'head',
                'foreColor',
                'list',
                'image',
            ];
            g_chat.randomPlaceHolder();
            g_chat.editor.config.uploadImgShowBase64 = true;

            g_chat.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
                lrz(resultFiles[0],  {width: 800, quality: 0.5})
                    .then(function(rst) {
                        console.log(parseInt(resultFiles[0].size / 1024), parseInt(rst.fileLen / 1024));
                        insertImgFn(rst.base64)
                })
                .catch(function(err) {
                    alert('图片读取错误');
                });
            }
            // TODO 对网络图片进行大小限制

            g_chat.editor.config.onchange = function(newHtml) {
                if(g_chat.fullscreen) return;
                var h = newHtml.trim() == '' ? 0 : $('.w-e-text')[0].scrollHeight;
                if(h < 50) h = 50;
                 $('#msg').css('height', h);
            }

            g_chat.editor.txt.eventHooks.enterUpEvents.splice(0, 0, (event) => {
                if(event.ctrlKey){
                    $('[data-action="chat_sendMsg"]').click();
                }
            });
            
            g_chat.editor.config.focus = false

          
             g_chat.editor.create();

        $('.w-e-toolbar').prepend(`<div data-action="show_stricker" class="w-e-menu" data-title="">
                <i class="w-e-icon-happy"></i>
            </div>`);

        showContent('chat');
         g_chat.randomPlaceHolder();
        $('.navbar-brand').html(`<i data-action="habbit_dots" class="fa ` + g_chats[name].icon + ` mr-10" aria-hidden="true"></i>` + name);
        $('.navbar-nav').html(`
            <a class="badge-group hide">
              <span class="badge bg-dark text-white">1/1</span>
              <span class="badge badge-primary">5</span>
            </a>

            <li class="nav-item dropdown with-arrow">
          <a class="nav-link" data-toggle="dropdown" id="nav-link-dropdown-toggle">
            <i class="fa fa-ellipsis-v mr-15 " aria-hidden="true"></i> 
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="nav-link-dropdown-toggle">
            <a data-action="chatList_add,` + name + `" class="dropdown-item">` + _l('频道信息') + `</a>
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
        g_cache.date_scroll = '';
        if(time){
            g_chat.nav_check(time, name);
        }
        $('.content-wrapper').scroll();
    },

    randomPlaceHolder: () => {
        var a = [
            '今日いい事あった～？',
            '今何してるの～？',
            '今日は何したい？',
            'なんでもいいよ～',
            'ほんの少しだけ運命は変えるよ',
            // '今天写了{}条消息了哦..',
            // '已经{}没有发过消息了哦..',
        ];
        $('.placeholder').html(a[randNum(0, a.length - 1)]);
    },

    // 消息界面右上角显示的一日统计
    nav_check: (time, channel) => {
        var date = new Date(parseInt(time));
        var s_date = getFormatedTime(4, date);
        if(s_date != g_cache.date_scroll){
            g_cache.date_scroll = s_date;
             var cnt = g_chat.countMsg(s_date, channel);
            $('.navbar-nav .badge-group').show().find('.badge').html(getFormatedTime(2, date)).next().html(cnt[0]);

        }
    },

    getHtml: (data, name) => {
        var keys = Object.keys(data.msgs);
        var len = keys.length;
        return `<div class="alert filled-lm chat_list shadow-sm" role="alert" data-action="chat_openChat" data-name="` + name + `">
                    <div class="_icon">
                        <i data-action="habbit_dots" class="fa ` + data.icon + `" aria-hidden="true"></i>
                    </div>
                    <div style="margin-left: 20px;">
                      <h4 class="alert-heading text-truncate" style="padding-right: 40px;">` + name + `</h4><span class="last-text" style="padding-right: 30px;">
                      ` + (len > 0 ? data.msgs[keys[keys.length - 1]].text : _l('什么都没写')) + `</span>
                  </div>
                    <span class="text-muted rt">` + time_getRent(parseInt(len > 0 ? keys[0] : data.createAt)) + `</span>
                    ` + (len > 0 ? '<span class="badge badge-primary rb">' + len +'</span>' : '') + `
                </div>`;
    }
}
g_chat.preInit();