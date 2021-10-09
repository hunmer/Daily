var _tip = $('#soundTip')[0];
function back() {
      startVibrate(25);
    if (g_emoji.isShowing()) {
        g_emoji.hide();
    } else
    if ($('.modal.show').length) {
        halfmoon.toggleModal($('.modal.show')[0].id);
    } else
    if (hideSidebar()) {

    } else
    if (g_cache.showing == 'questionView') {
        $('[data-action="toTab,question"]')[0].click();
    } else
    if (g_cache.showing != undefined) {
        g_cache.showing = undefined;
        $('[data-action="toTab,chatList"]')[0].click();
    } else {
        confirm(_l('是否结束')).then((d) => {
            if (d.button == 'ok') {
                toastPAlert(_l('是否结束1'), 'alert-danger');
                return;
            }
        });
    }
}
function isShow($node) {
    return $node.offset().top <= $(window).height() + $(window).scrollTop()
}


$(function() {
    
    FastClick.attach(document.body);
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
             startVibrate(25);
        })
        .on('change', '.msg .w-e-todo input[type="checkbox"]', function(event) {
            var dom = $(event.target);
            dom.attr('checked', event.target.checked); // 把checked加入属性
            var time = dom.parents('[data-time]').attr('data-time');
            var html = dom.parents('.msg_text').html();
            g_chats[g_chat.name].msgs[time].text = html;
            local_saveJson('chats', g_chats);
        })
        .on('click', 'select', function(event) {
            if(!g_config.fixSelect) return;
            event.preventDefault(true);
            g_cache.select = $(this);
            var h = '';
            for(var option of  g_cache.select.find('option')){
                if(!option.disabled){
                      var v = option.value;
                    h += `<div class="custom-radio mb-20">
                      <input type="radio" name="radio-set-1" id="radio-`+v+`" value="`+v+`" onchange="g_cache.selectValue = this.value;"`+(option.selected ? ' checked':'')+`>
                      <label for="radio-`+v+`">`+option.innerText+`</label>
                    </div>`;
                }
            }
            confirm('选择一项', {
                html: true,
                maxHeight: 'unset',
                height: '100%',
                text: '<div id="confirm_select">'+h+'</div>'
            }).then((d) => {
                if (d.button == 'ok') {
                    g_cache.select.find('option[value="'+g_cache.selectValue+'"]').prop('selected', true);
                    g_cache.select[0].onchange();
                }
            })
        });

    $('.content-wrapper').scroll(function(event) {
        var div = $('#content_' + g_cache.showing);
        //div.find('[data-action="up"]').css('display', this.scrollTop == 0 ? 'none' : 'block');

        if (g_cache.showing == 'chat' && g_chat.name != undefined) {
            if(this.scrollTop == 0){
                $('#div_inpuit').css('position', 'unset');
            }else
            if(this.scrollTop >= $('#div_inpuit').offset().top + $('#div_inpuit').height() + 30){
                $('#div_inpuit').css('position', 'fixed');
            }

            var d = $(document.elementFromPoint($(this).width() / 2, $(this).height() / 2));
            if (d != null) {
                d = d.parent('[data-time]');
                if (d.length) {
                    g_chat.nav_check(parseInt(d.attr('data-time')), g_chat.name);
                }
            }
        }
    });
    $('#input_img').on('change', function(event) {
        var that = this;
        var config = $(that).attr('data-config');
        if (config) {
            config = JSON.parse(config);
        } else {
            config = { width: 800, quality: 0.5 };
        }
        lrz(that.files[0], config)
            .then(function(rst) {
                //console.log(parseInt(that.files[0].size / 1024), parseInt(rst.fileLen / 1024));
                switch ($(that).attr('data-type')) {
                    case 'userIcon':
                        $('#user_icon').attr('src', rst.base64);
                        break;
                    case 'bg':
                        g_config.bg = rst.base64;
                        g_cache.uploaded_bg = rst.base64;
                        setBg(rst.base64);
                        break;

                    case 'icon':
                        var d= $('.modal.show .icon_selecter')
                        d.find('i').hide();
                        d.find('img').attr('src', rst.base64).show();
                        break;

                    case 'timeLog':
                        g_cd.append_Timelog(rst.base64);
                        break;
                }
            })
            .catch(function(err) {});
    });
     showContent(g_config.lastShow || 'chatList');
    test();
});

function soundTip(url) {
    if(!url) url = g_config.tipSound;
    _tip.src = url;
    _tip.play();
}


function enableDebug() {
    // if (!IsPC() && g_config.debug) {
        // loadRes([
        //     { url: "js/vue.js", type: "js" },
        //     { url: "js/web-console.umd.min.js", type: "js" },
        // ], () => {
            if (!IsPC() && g_config.debug) {
                loadJs('js/web-console.umd.min.js', () => {
                    new WebConsole({
                        panelVisible: false,
                        activeTab: 'console',
                        entryStyle: 'button'
                    });
                });
            
        }
        // })
    // }
}

function loadRes(files, callback) {
    var i = 0;
    var fileref = [];
    for (var file of files) {
        if (file.type == "js") {
            fileref[i] = document.createElement('script');
            fileref[i].setAttribute("type", "text/javascript");
            fileref[i].setAttribute("src", file.url)
        } else if (file.type == "css" || file.type == "cssText") {
            fileref[i] = document.createElement("link");
            fileref[i].setAttribute("rel", "stylesheet");
            fileref[i].setAttribute("type", "text/css");
            fileref[i].setAttribute("href", file.url)
        }
        var target = document.getElementsByTagName('head')[0] || document.body || document.documentElement;

       target.appendChild(fileref[i]).onload = function() {
            //window.plugin_musicPlayer.res.push(fileref);
            if (++i == files.length) {
                if (typeof callback == 'function') callback();
            }
        }

    }
}

function setBg(bg) {
    var blur = '';
    if (bg != '') {
        bg = 'linear-gradient(rgb(35 35 35 / 25%), rgb(111 111 111 / 55%)), url(' + bg + ')';
        if (g_config.blur > 0) {
            blur = 'saturate(180%) blur(' + g_config.blur + 'px)';
        }
    }
    $('body').css('backgroundImage', bg).css('backdropFilter', blur);
}

function initSetting() {
    var light;
    if(g_config.autoThmem){
        var h = new Date().getHours();
        light = h < 18 && h > 6;
    }else{
        light = !g_config.darkMode;
    }
    if(light){
     $('body').removeClass('dark-mode');
    }
    if (g_config.bg) {
        setBg(g_config.bg);
    }
   initCss();
   enableDebug();
}

function setFontColor(color){
     g_config.fontColor = color;
     initCss();
}

function InputValue(dom, add, callback){
    var i = parseInt(dom.val()) + add;
    if(i<0) i=0;
    dom.val(i);
    callback(i);
}

function setBlur(i){
    g_config.blur = parseInt(i);
    if(g_config.bg){
        setBg(g_config.bg)
    }
}

function initCss(){
     if(g_cache.css) g_cache.css.remove();
     var css = '';
     if( g_config.color){
         for(var key of ['--dm-button-group-button-primary-border-color-hover', '--lm-button-group-button-primary-border-color-hover', '--primary-color', '--lm-button-primary-bg-color', '--dm-button-primary-bg-color', '--lm-alert-primary-border-color)', '--dm-alert-primary-border-color);']){
            //  '--dm-button-primary-bg-color-hover', '--lm-button-primary-bg-color-hover'
            css += key+':' + g_config.color+';'
        }
     }
     
     if( g_config.fontColor){
         for(var key of ['--lm-button-primary-text-color', '--dm-button-primary-text-color', '--dm-badge-primary-text-color', '--lm-badge-primary-text-color']){
            css += key+':' + g_config.fontColor+';'
        }
     }
    css = ':root{'+css+'}';
     if(css){
            g_cache.css = insertStyle(css);
     }
}

function setColor(color){
    g_config.color = color;
     initCss();
}

function doAction(dom, action, params) {
    var action = action.split(',');
    if (g_actions[action[0]]) {
        return g_actions[action[0]](dom, action, params);
    }
    switch (action[0]) {

         

        case 'daily_card_switch':
            var d = $(dom);
            if(!d.hasClass('card')){
                d = d.parents('.card');
            }
            var showed = d.find('.cardContent.show').removeClass('show').addClass('hide');
            var next = showed.next();
            if(!next.length) next = showed.prev();
            if(!next.length) next = showed;
            next.removeClass('hide').addClass('show');
            break;

        case 'setting_audio':
            if (dom.value == 'custom') {
                prompt('input url', '').then((d) => {
                    var url = d.text;
                    if (url != null && url != '') {
                        $(dom).find(':disabled').val(url).html(url).prop('selected', true);
                    }
                })
            } else {
                soundTip(dom.value)
            }
            break;

        case 'setting_bg':
            if (dom.value == 'custom') {
                prompt('input url').then((d) => {
                    var url = d.text;
                    if (url != null && url != '') {
                        $(dom).find('[data-url]').show().html(url).val(url).prop('selected', true);
                        g_config.bg = url;
                        setBg(dom.value)
                    }
                });
            } else if (dom.value == 'upload') {
                $('#input_img').attr('data-type', 'bg').click();
            } else {
                g_cache.uploaded_bg = undefined;
                g_config.bg = dom.value;
                setBg(dom.value)
            }
            break;

        case 'setting_color':
            if (dom.value == 'custom') {
            }else{
                setColor(dom.value);
            }
            break;


        case 'up':
            $('.content-wrapper').animate({ scrollTop: 0 }, 800);
            break;

        case 'saveSetting':
            g_config.tipSound = $('#select-tip').val();
            var bg = $('#select-bg').val();
            if (bg == 'upload' && g_cache.uploaded_bg != undefined) {
                bg = g_cache.uploaded_bg
            }
            g_config.bg = bg;
            g_config.debug = $('#checkbox-debug').prop('checked');
            g_config.blur = $('#bg_blur').val();
            g_config.passwordEnable = $('#switch-password').prop('checked');
            g_config.password = $('#input_password').val();
            g_config.autoTheme = $('#checkbox-autoTheme').prop('checked');
            g_config.fixSelect =  $('#checkbox-fixSelect').prop('checked');
            local_saveJson('config', g_config);
            halfmoon.toggleModal('modal-custom');
            //initSetting();
            break;
        case 'openSetting':
            g_cache.config = g_config;
            g_cache.closeCustom = () => {
                g_config = g_cache.config;
                initSetting();
            }
            $('#modal-custom').find('.modal-title').html(_l('弹出_设置_标题'));
           h = `
                <div class="form-group">
                        <label>ヒント音</label>
                        <div class="row">
                            <select class="form-control col-4" id="select-tip" onchange="doAction(this, 'setting_audio');">
                                <option value="" selected>なし</option>
                                <option value="res/tip_paopao.wav">シャボン玉</option>
                                <option value="res/tip_dingdong.wav">ディンドン</option>
                                <option value="res/tip_dingdong.mp3">ディンドン1</option>
                                <option value="res/tip_line.wav">line</option>
                                <option value="res/tip_mail.wav">メール</option>
                                <option value="res/tip_iphone.wav">iphone</option>
                                <option value="custom">カスタム</option>
                            </select>
                            <div class="col-4"></div>
                            <div class="col-4"></div>
                             
                        </div>
                  
                    </div>
                    <div class="form-group mt-10">
                        <label>背景</label>
                        <label class="float-right">背景ブラー</label>
                        <div class="row">
                            <select class="form-control col-4" id="select-bg" onchange="doAction(this, 'setting_bg');">
                                <option value="" selected>なし</option>
                                <option value="custom">URL</option>
                                <option value="upload">アップロード</option>
                                <option value="" data-url="" class="hide"></option>

                                <option value="" disabled>--------</option>
                                <option value="res/bg.jpg">少女</option>
                                <option value="res/frog.jpg">カエル</option>
                                <option value="res/rabbit.jpg">ウサギ</option>
                                <option value="res/star.jpg">スター</option>
                                <option value="res/flower1.jpg">紫色の花</option>
                                <option value="res/star.jpg">紫色の星</option>
                                <option value="res/night1.jpg">ピクセル</option>
                                <option value="res/night2.jpg">ピクセル1</option>
                            </select>
                            <div class="col-4"></div>
                            <div class="input-group col-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" onclick="InputValue($('#bg_blur'), -1, (i) => {setBlur(i);})">
                                    <</span> </div> <input id='bg_blur' type="number" class="form-control" value="4" onkeyup="setBlur(this.value)">
                                        <div class="input-group-append">
                                            <span class="input-group-text" onclick="InputValue($('#bg_blur'), 1, (i) => {setBlur(i);})">></span>
                                        </div>
                                </div>
                            </div>
                        </div>
                         ` + (!IsPC() ? `
                <div class="custom-checkbox d-inline-block mr-10">
                  <input type="checkbox" id="checkbox-debug" value=""` + (g_config.debug ? ' checked' : '') + `><label for="checkbox-debug">` + _l('弹出_设置_调试模式') + `</label>
                </div>` : '') + `
                         <div class="custom-checkbox d-inline-block mr-10">
                          <input type="checkbox" id="checkbox-fixSelect" value=""` + (g_config.fixSelect ? ' checked' : '') + `><label for="checkbox-fixSelect">` + _l('弹出_设置_修复select') + `</label>
                        </div>
                        <div class="custom-checkbox d-inline-block mr-10">
                          <input type="checkbox" id="checkbox-autoTheme" value=""` + (g_config.autoTheme ? ' checked' : '') + `><label for="checkbox-autoTheme">` + _l('弹出_设置_自动主题') + `</label>
                        </div>

                         <div style="display: flex;margin-top: 10px;justify-content: space-between;">主题色:&nbsp;&nbsp;`;

                         for(var color of ['#636e72', '#fd79a8', '#ff7675', '#fab1a0', '#ffeaa7', '#b2bec3', '#6c5ce7', '#0984e3', '#00cec9','#00b894']){
                            h += `<div class="rounded-circle color-dot" style="background-color: `+color+`;" onclick="setColor('`+color+`')"></div>`;
                         }
                         h+=`<input type="color" value="`+g_config.color+`" onchange="doAction(this, 'setting_color')">`;
                         h+=`
                            </div>
                            <div style="display: flex; margin-top: 10px">文字色:&nbsp;&nbsp;
                                <div class="rounded-circle color-dot bg-white" onclick="setFontColor('#dfe6e9')"></div>
                                <div class="rounded-circle color-dot bg-dark" onclick="setFontColor('#2d3436')"></div>
                            </div>

                            <div class="input-group mt-10">
                              <div class="input-group-prepend">
                                <div class="input-group-text">
                                  <div class="custom-switch">
                                    <input type="checkbox" id="switch-password" value="">
                                    <label for="switch-password" class="blank"></label>
                                  </div>
                                </div>
                              </div>
                              <input id='input_password' type="password" class="form-control" placeholder="`+_l('弹出_设置_输入密码')+`" value="`+(g_config.password || '')+`">
                            </div>

                     <div class="btn-group w-full mt-10">
                    <button class="btn" data-action="uploadData"><i class="fa fa-upload" aria-hidden="true"></i></button>
                    <button class="btn" data-action="sync"><i class="fa fa-download" aria-hidden="true"></i></button>
                    <button class="btn" onclick="$('#upload').click();"><i class="fa fa-file" aria-hidden="true"></i></button>
                    <button class="btn btn-primary" data-action="saveSetting">` + _l('弹出_设置_按钮_确定') + `</button>
                </div>
                `;
                 $('#modal-custom').attr('data-type', 'setting').find('.modal-html').html(h);
            halfmoon.toggleModal('modal-custom');
            $('#bg_blur').val(g_config.blur || 0);
            $('#select-tip option[value="' + g_config.tipSound + '"]').prop('selected', true);
            if (typeof(g_config.bg) == 'string' && g_config.bg.substr(0, 5) == 'data:') {
                $('#select-bg option[value="upload"]').prop('selected', true);
            } else {
                $('option[value="' + g_config.bg + '"]').prop('selected', true);
            }
            var d =  $('#select-color option[value="'+ g_config.color+'"]');
            if(!d.length){
                d = $('#select-color option[value="custom"]')
            }
            d.prop('selected', true);

            $('#checkbox_tts').prop('checked', g_config.tts);
            $('#switch-password').prop('checked', g_config.passwordEnable);
            $('#checkbox_fixInput').prop('checked', g_config.fixInput);
            break;
        case 'sync':
            prompt('code').then((d) => {
                if (d.text != '') {
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
                data: {}
            }
            for(var key of local_getList()){
                data.data[key] = localStorage.getItem(key);
            }
            var s = JSON.stringify(data.data);
            confirm(_l('是否只下载数据')).then((d) => {
                if(d.button == 'ok'){
                    downloadData(s, 'daily.json');
                    return;
                }else{
                     data.md5 = md5(s);
                    queryMsg(data);
                }
            });
           
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
            g_config.darkMode = $('body').hasClass('dark-mode');
            local_saveJson('config', g_config);
            if (g_config.darkMode) {
                i.attr('class', 'fa fa-sun-o');
            } else {
                i.attr('class', 'fa fa-moon-o');
            }
            break;

        case 'share':
            var c = $(dom).find('i')[0].className;
            console.log(c);
            var u = '';
            if(c.indexOf('twitter') != -1){
                u = 'https://twitter.com/intent/tweet?text={text}';
            }else
            if(c.indexOf('facebook') != -1){
                u = 'https://www.facebook.com/dialog/share?app_id=87741124305&href=http%3A%2F%2Fhunmer.github.io%2FDaily&quote={text}&display=popup';
            }
            if(u){
                window.open(u.replace('{text}', $('#input_share').val().trim()));
            }
            break;
    }
}

function toBottom(dom) {
    $('.content-wrapper')[0].scrollTo(0, dom[0].scrollHeight)
}


function toTop() {
    $('.content-wrapper')[0].scrollTo(0, 0);
}

function showContent(id) {
    $('.navbar-nav').html('');
    $('.navbar-fixed-bottom').css('height', '');
    g_cache.showing = id;
    
    var t;
    switch (id) {
        case 'chat':
            break;
        case 'time':
            t = _l('标题_计时');
            g_cd.init();
            break;

        case 'chatList':
            t = _l('标题_聊天列表');
            g_chat.init();
            if(!g_cache.isFirstChatList){
                g_cache.isFirstChatList = true;
                if(g_chat.lastMsg[g_config.lastChanel]){
                    g_chat.openChat(g_config.lastChanel);
                    return;
                }
            }

            g_chat.initNav();
            g_chat.initBottom();
            g_chat.initHtml(); // 调整顺序
            break;

        case 'progress':
            t = _l('标题_进度');
            g_progress.init();
            break;

        case 'daily':
            t = _l('标题_日常');
            g_daily.init();
            break;

        case 'question':
            t = _l('标题_提问');
            g_question.init();
            g_question.initHtml(); // 调整顺序
            break;

        case 'todo':
            t = _l('标题_任务');
            g_todo.init();
            break;

        case 'day':
            t = _l('标题_纪念日');
            g_day.init();
            break;

        case 'active':
            t = _l('标题_日活动');
            g_active.init();
            break;
    }
    if(t){
        g_config.lastShow = id;
        local_saveJson('config', g_config);
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

function initNavHeight() {
    g_cache.lastNavMinH = $('.navbar-fixed-bottom').children().height();
    $('.navbar-fixed-bottom').css('height', g_cache.lastNavMinH);
}

var connection;

function initWebsock() {
    connection = new WebSocket(_vars.socket);
    connection.onopen = () => {
        for (var msg of g_cache.query) {
            connection.send(msg);
        }
        g_cache.query = [];
    }

    connection.onmessage = (e) => {
        reviceMsg(JSON.parse(e.data));
    }

    connection.onclose = (e) => {}
}

function queryMsg(data, user = false) {
    if (user) {
        data.user = g_config.user ? g_config.user.name : undefined;
    }
    // console.log('send', data);
    var msg = JSON.stringify(data);
    if (!connection || connection.readyState != 1) {
        if (g_cache.query.indexOf(msg) == -1) {
            g_cache.query.push(msg);
        }
        return initWebsock();
    }
    connection.send(msg);
}



function reviceMsg(data) {
    // console.log('revice', data);
    var type = data.type;
    delete data.type;
    if (g_revices[type]) {
        return g_revices[type](data);
    }
    switch (type) {
        case 'uploadData':
            if (!data.code) {
                return toastPAlert('error md5...', 'alert-danger');
            }
            alert('CODE: ' + data.code);
            break;

        case 'sync':
            if (!data.md5) {
                return toastPAlert('error code...', 'alert-danger');
            }
            if (data.md5 != md5(JSON.stringify(data.data))) {
                return toastPAlert('error md5...', 'alert-danger');
            }
            importData(data.data);
            break;
    }
}


function parseFile(input){
   var reader = new FileReader();
   reader.readAsText(input.files[0]);
   reader.onload = function(e){
    try {
      json = JSON.parse(this.result);
      importData(json);
    }
    catch(err){
      alert('Corrupted data!');
    }
   }
}


function importData(data){
    confirm(_l('是否完全覆盖')).then((d) => {
        var b = d.button == 'ok';
        if(b){
            local_clearAll();
        }
        for(var key in data){
            if(b){
                s = data[key];
            }else{
                var old = JSON.parse(localStorage.getItem(key)) || {};
                s = JSON.stringify(Object.assign(old, JSON.parse(data[key])));
            }
            localStorage.setItem(key, s);
        }
        alert('OK!');
        location.reload();
    })
}

function prompt_Password(){
    var n = new Date().getTime();
    if(n - g_config.lastLogin <= 3600 * 6){
        return $('#page-wrapper').show();
    }
    var pin = $('#pin');
    if(!pin.length) pin = $('<div id="pin"></div>').appendTo('body');
    mobiscroll.numpad('#pin', {
        theme: 'mobiscroll',
        display: 'center',
        headerText: _l('输入密码_标题'),
        lang: 'ja',
        template: 'dddd',
        allowLeadingZero: true,
        placeholder: '-',
        closeOnOverlayTap: false,
        mask: '*',
        buttons: ['set'],
         onSet: function (event, inst) {
            checkPassword(event.valueText);
        }
    });
     $('#pin').mobiscroll('show');

    // prompt(_l('输入密码_标题'), '', {inputPlaceholder: _l('输入密码_文本')}).then((d) => {
    //         if(d.text != g_config.password){
    //             return prompt_Password();
    //         }
    //         g_config.lastLogin = n;
    //         local_saveJson('config', g_config);
    //     $('#page-wrapper').show();
    // });
}

function checkPassword(password){
     var b = password == g_config.password;
    if(b){
        g_config.lastLogin = new Date().getTime() + 6 * 60 * 60 * 1000;
        local_saveJson('config', g_config);
        $('#page-wrapper').show();
    }else{
        
        alertDialog(_l('错误'), `
            <h3 class="md-text-center">`+_l('密码错误')+`</h3>
            <p class="md-text-center">`+_l('忘记密码了吗')+`?</p>
            `, {
            buttons: [{
                text: _l('确定'),
                handler: (event, inst) => {
                    inst.hide();
                    prompt_Password();
                }
            },
            {
                text: _l('忘记密码'),
                handler: (event, inst) => {
                    // TODO 密保找回
                }
            }],
        })
    }
}

function alertDialog(title, html, opt = {}){
    var alert = $('#alert');
    if(!alert.length) alert = $(`<div id="alert">
            <div class="md-dialog">
                `+html+`
            </div>
    </div>`).appendTo('body');
    opt = Object.assign({
        theme: 'mobiscroll',
        display: 'center',
        closeOnOverlayTap: false,
        headerText: title,
        lang: 'ja',
         anchor: $('#widgetDialog-show'), // More info about anchor: https://docs.mobiscroll.com/3-0-0_beta5/widget#!opt-anchor
        buttons: [{
            text: _l('确定'),
            handler: 'set'
        }, {
            text: _l('取消'),
            handler: 'cancel'
        }],
    }, opt);
     mobiscroll.widget('#alert', opt);
     $('#alert').mobiscroll('show');

}

function test() {
            initSetting();
            // showContent('todo');
            
            // showContent('active');
    // doAction(null, 'openSetting');
    // g_chat.openChat('アイディア');
    if(g_config.passwordEnable && g_config.password != ''){
         prompt_Password();
    }else{
        $('#page-wrapper').show();
    }
}

halfmoon._toggleSidebar= halfmoon.toggleSidebar;
halfmoon.toggleSidebar = () => {
    halfmoon._toggleSidebar();
    var btn = $('#closeSidebar');
    
    if ($('#page-wrapper').attr('data-sidebar-hidden') == 'hidden') {
        btn.hide();
    } else {
        setTimeout(() => {
             var left = $('.btn-action').offset().left - 10;
            btn.css({
            left: left,
            width: $(window).width() - left
        }).show();
        }, 500);
        g_emoji.hide();
    }
}

halfmoon._toggleModal= halfmoon.toggleModal;
halfmoon.toggleModal = (id) => {
    halfmoon._toggleModal(id);
    startVibrate(50);
}