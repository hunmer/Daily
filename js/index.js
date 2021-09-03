
var g_cache = {
    closeCustom: () => {},
    closeCustom1: () => {},
}

function back() {
    if ($('.modal.show').length) {
        halfmoon.toggleModal($('.modal.show')[0].id);
    } else
    if (hideSidebar()) {} else
    if (g_cache.showing != undefined) {
        g_cache.showing = undefined;
        $('[data-action="toTab,chatList"]')[0].click();
    } else {
        if (confirm('終了しますか？')) {
            toastPAlert('よろしいですか？!', 'alert-danger');
            return;
        }
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
        doAction($(this), $(this).attr('data-action'));
    });
    if(!IsPC()){
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
                alert('图片读取错误');
            });
    });

    showContent('chatList');
});

function doAction(dom, action, params) {
    var action = action.split(',');
    if (g_actions[action[0]]) {
        return g_actions[action[0]](dom, action, params)
    }
    switch (action[0]) {
        case 'sync':
            var code = prompt('code');
            if(code){
                hideSidebar();
                toastPAlert('checking...', 'alert-secondary');
                queryMsg({
                    type: 'sync',
                    code: code
                });
            }
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
}

var connection;

function initWebsock() {
    connection = new WebSocket(_vars.socket);
    connection.onopen = () => {
        console.log('open')
       if(g_cache.query){
        var msg = g_cache.query;
        delete g_cache.query;
         connection.send(msg);
       }
    }

    connection.onmessage = (e) => {
        console.log(e.data);
        reviceMsg(JSON.parse(e.data));
    }

     connection.onclose = (e) => {
        console.log('close');
     }
}

function queryMsg(data, user = false) {
    if(user){
        data.user = g_config.user ? g_config.user.name : undefined;
    }
    console.log('send', data);
    var msg = JSON.stringify(data);
    if(!connection || connection.readyState != 1){
        g_cache.query = msg;
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