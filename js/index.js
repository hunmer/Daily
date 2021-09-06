

function back() {
    if(g_emoji.isShowing()){
      g_emoji.hide();
    } else
    if ($('.modal.show').length) {
        halfmoon.toggleModal($('.modal.show')[0].id);
    } else
    if (hideSidebar()) {

    } else
    if (g_cache.showing != undefined) {
        g_cache.showing = undefined;
        $('[data-action="toTab,chatList"]')[0].click();
    } else{
        confirm(_l('是否结束')).then((d) => {
            if(d.button == 'ok'){
                 toastPAlert(_l('是否结束1'), 'alert-danger');
                return;
            }
        });
    }
}


$(function() {
    window.history.pushState(null, null, "#");
    window.addEventListener("popstate", function(event) {
        //  if (_viewer && _viewer.isShown) {
        //     _viewer.hide();
        // }else
        back();
        window.history.pushState(null, null, "#");
        event.preventDefault(true);
        event.stopPropagation();
    });


    $(document).on('click', '[data-action]', function(event) {
        doAction(this, $(this).attr('data-action'));
    }).on('dblclick', '.msg .main', function(event) {
        g_chat.setTextStyle($(this).parent('[data-time]').attr('data-time'), 'del');
    })
    .on('change', '.msg .w-e-todo input[type="checkbox"]', function(event){
        var dom = $(event.target);
        dom.attr('checked', event.target.checked); // 把checked加入属性
        var time = dom.parents('[data-time]').attr('data-time');
        var html = dom.parents('.msg_text').html();
        g_chats[g_chat.name].msgs[time].text = html;
        local_saveJson('chats', g_chats);
    })

    $('.content-wrapper').scroll(function(event){
        var div = $('#content_'+g_cache.showing);
        //div.find('[data-action="up"]').css('display', this.scrollTop == 0 ? 'none' : 'block');

       
        if(g_cache.showing == 'chat'){
             var min = g_cache.lastNavMinH || 50;
             $('#div_inpuit').css('position', this.scrollTop < min ? 'unset' : 'fixed');

            var d = $(document.elementFromPoint($(this).width() / 2, $(this).height() / 2));
            if(d != null){
                d = d.parent('[data-time]');
                if(d.length){
                    g_chat.nav_check(parseInt(d.attr('data-time')), g_chat.name);
                }
            }
        }
    });

    $('#input_img').on('change', function(event) {
        var that = this;
        var config = $(that).attr('data-config');
        if(config){
            config = JSON.parse(config);
        }else{
            config = {width: 800, quality: 0.5};
        }
        lrz(that.files[0], config)
            .then(function(rst) {
                //console.log(parseInt(that.files[0].size / 1024), parseInt(rst.fileLen / 1024));
                switch ($(that).attr('data-type')) {
                    case 'userIcon':
                        $('#user_icon').attr('src', rst.base64);
                        break;
                }
            })
            .catch(function(err) {
            });
    });

    showContent('chatList');
    enableDebug();
    test();
});

function enableDebug(){
     if(!IsPC() && g_config.debug){
         loadRes([
            { url: "js/vue.js", type: "js" },
            { url: "js/web-console.umd.min.js", type: "js" },
        ], () => {
            new WebConsole({
                panelVisible: false,
                activeTab: 'console',
                entryStyle: 'button'
            });
        })
    }
}

function doAction(dom, action, params) {
    var action = action.split(',');
    if (g_actions[action[0]]) {
        return g_actions[action[0]](dom, action, params);
    }
    switch (action[0]) {
        case 'up':
            $('.content-wrapper').animate({scrollTop: 0}, 800);
            break;
        case 'openSetting':
            $('#modal-custom').find('.modal-title').html(_l('弹出_设置_标题'));
            $('#modal-custom').attr('data-type', 'setting').find('.modal-html').html(`
              <div class="input-group mb-10">

                `+(!IsPC() ? `
                <div class="custom-checkbox d-inline-block mr-10">
                  <input type="checkbox" id="checkbox-debug" value=""`+(g_config.debug ? ' checked' : '')+`>
                  <label for="checkbox-debug">`+_l('弹出_设置_调试模式')+`</label>
                </div>` : '')+`


              </div>

               <div class="btn-group w-full mt-10">
                    <button class="btn" data-action="uploadData"><i class="fa fa-upload" aria-hidden="true"></i></button>
                    <button class="btn" data-action="sync"><i class="fa fa-download" aria-hidden="true"></i></button>
                    <button class="btn btn-primary" data-action="setting_save">`+_l('弹出_设置_按钮_确定')+`</button>
                </div>
              
          `);

          halfmoon.toggleModal('modal-custom');
            break;
        case 'setting_save':
            g_config.debug = $('#checkbox-debug').prop('checked');
            local_saveJson('config', g_config);
            halfmoon.toggleModal('modal-custom');
            break;
        case 'sync':
            prompt('code').then((d) => {
                if(d.text !=''){
                     hideSidebar();
                    toastPAlert('checking...', 'alert-secondary');
                    queryMsg({
                        type: 'sync',
                        code: d.text
                    });
                }
            })
            break;
        case 'uploadData':
            hideSidebar();
            toastPAlert('uploading...', 'alert-secondary');
            var data = {
                type: 'uploadData',
                data: {
                    chats: g_chats,
                    times: g_times,
                    todos: g_todos
                }
            }
            data.md5 = md5(JSON.stringify(data.data));
             queryMsg(data);
            break;
        case 'toTab':
           hideSidebar();
            showContent(action[1]);

            break;
        case 'back':
            back();
            break;

        case 'darkMode':
            halfmoon.toggleDarkMode();
            var i = $(dom).find('i');
            if (!$('body').hasClass('dark-mode')) {
                i.attr('class', 'fa fa-moon-o');
            } else {
                i.attr('class', 'fa fa-sun-o');
            }
            break;
    }
}

function toBottom(dom) {
    $('.content-wrapper')[0].scrollTo(0, dom[0].scrollHeight)
}


function showContent(id) {
    $('.navbar-nav').html('');
    $('.navbar-fixed-bottom').css('height', '');
    g_cache.showing = id;
    var t = '';
    switch (id) {
        case 'time':
            t = _l('标题_计时');
            g_cd.init();
            break;

        case 'chatList':
            t = _l('标题_聊天列表');
            g_chat.init();
            g_chat.initNav();
            g_chat.initBottom();
            break;

        case 'progress':
            t = _l('标题_进度');
            g_habbit.init();

            break;

        case 'daily':
            t = _l('标题_日常');
            g_habbit.init();

            break;

        case 'countdown':
            t = _l('标题_倒计时');
            g_habbit.init();
            break;
    }
    $('.sidebar-menu .active').removeClass('active');
    $('.sidebar-menu [data-action="toTab,' + id + '"]').addClass('active');
    $('.navbar-brand').html(t);
    for (var con of $('._content')) {
        if (con.id == 'content_' + id) {
            $(con).show();
        } else {
            $(con).hide();
        }
    }
    $(window).resize();
    for (var con of $('.toolbar')) {
        // && $(con).html() != ''
        if (con.id == 'bottom_' + id) {
            $(con).show();
        } else {
            $(con).hide();
        }
    }

    initNavHeight();

}

function initNavHeight(){
    g_cache.lastNavMinH =  $('.navbar-fixed-bottom').children().height();
    $('.navbar-fixed-bottom').css('height',g_cache.lastNavMinH );
}

var connection;

function initWebsock() {
    connection = new WebSocket(_vars.socket);
    connection.onopen = () => {
        for(var msg of g_cache.query){
         connection.send(msg);
        }
        g_cache.query = [];
    }

    connection.onmessage = (e) => {
        console.log(e.data);
        reviceMsg(JSON.parse(e.data));
    }

     connection.onclose = (e) => {
     }
}

function queryMsg(data, user = false) {
    if(user){
        data.user = g_config.user ? g_config.user.name : undefined;
    }
    console.log('send', data);
    var msg = JSON.stringify(data);
    if(!connection || connection.readyState != 1){
        if(g_cache.query.indexOf(msg) == -1){
         g_cache.query.push(msg);
        }
        return initWebsock();
    }
    connection.send(msg);
}


function reviceMsg(data) {
    console.log('revice', data);
    var type = data.type;
    delete data.type;
    if (g_revices[type]) {
        return g_revices[type](data);
    }
    switch (type) {
        case 'uploadData':
            if(!data.code){
                return  toastPAlert('error md5...', 'alert-danger');
            }
            alert('CODE: ' + data.code);
            break;

        case 'sync':
            if(!data.md5){
                return  toastPAlert('error code...', 'alert-danger');
            }
            if(data.md5 != md5(JSON.stringify(data.data))){
                return  toastPAlert('error md5...', 'alert-danger');
            }
            g_chats = data.data.chats;
            local_saveJson('chats', g_chats);
            g_times = data.data.times;
            local_saveJson('times', g_times);
            g_todos = data.data.todos;
            local_saveJson('todos', g_todos);
            alert('OK!');
            location.reload();
    }
}

function test(){
    // doAction(null, 'ranking');
        // g_chat.openChat('アイディア');
}

function onToggleSidebar(){
    halfmoon.toggleSidebar();
    if($('#page-wrapper').attr('data-sidebar-hidden') == 'hidden'){

    }else{
        g_emoji.hide();
    }
}