var g_chat = {
    lastData: '',
    fullscreen: false,
    lastMsg: [],
    dates: [],
    edit: {},
    preInit: () => {
        $(`
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,chatList">
                    <span class="sidebar-icon">
                        <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_聊天_标题') + `
            </a>`).appendTo('.sidebar-menu');
    },
    showMenu: (show = true) => {
        g_chat.rm.css('display', show ? 'unset' : 'none');
        halfmoon.deactivateAllDropdownToggles();
                startVibrate(100);

    },
    init: () => {
        if (g_chat.inited) return;
        g_chat.inited = true;
        g_chats = local_readJson('chats', {
    // 日常: {
    //      createAt: 1628611200000,
    //      icon: 'fa-plus',
    //      desc: "早上八点前起床",
    //      enable: true,
    //      msgs: {
    //          1628611300000: {
    //              text: '你好啊'
    //          }
    //      }
    // }
});
for(var name in g_chats){
    local_saveJson('chat_'+name, g_chats[name]);
}
g_chats = {};
local_saveJson('chats', {});


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
            <div id="div_inpuit" class="theme w-full pb-10 mb-10 border-bottom" style="z-index: 9999"></div>
            <div class="mainContent" style="margin-top: 50px;"></div>
            <div class="ftb br">

                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="back" class="btn btn-square btn-primary rounded-circle btn-lg shadow" role="button"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>`).appendTo('.content-wrapper');

        g_chat.registerActions();
        g_chat.initChannels();
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
                     <button class="btn btn-primary mt-10" data-action="chat_msg_share" type="button">
                    <i class="fa fa-share" aria-hidden="true"></i>
                    ` + _l('分享') + `</button>
                    <button class="btn btn-danger mt-10" data-action="chat_msg_delete" type="button">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    ` + _l('删除') + `</button>

                </div>


                </div>
            </div>
        `).appendTo('body');
        g_emoji.initHistoryEmoji();

        registerContextMenu('.chat_list', (dom, event) => {
            doAction(null, 'chatList_add,' + dom.attr('data-name'));
        });
        registerContextMenu('.msg .main', (dom, event) => {
            var selecteds = $('.msg_selected');
            if (selecteds.length > 0) {
                g_chat.rm_showing = [];
                for (var d of selecteds) {
                    g_chat.rm_showing.push($(d).attr('data-time'))
                }
            } else {
                g_chat.rm_showing = [dom.parent('[data-time]').attr('data-time')];
            }

            $('[data-action="chat_msg_copy"],[data-action="chat_msg_edit"]').css('display', selecteds.length ? 'none' : 'unset');

            g_chat.showMenu();

            var div = $('#msg_rm');
            var i = div.width() / 2;
            var x = event.pageX;
            var mw = $(window).width();
            if (x + i > mw) {
                x = mw - div.width() - 10;
            } else {
                x -= i;
            }

            // var y = event.pageY + 20;
            var y = event.pageY;
            var h = div.height();
            var mh = $(window).height();
            if (mh - y < h) {
                y -= h;
            } else {
                y -= h / 2;
            }

            var par = dom.parent('[data-time]');
            var data = g_chat.getValue(par.attr('data-time'),par.attr('data-name') );
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
                  <td class="text-right">` + d[date][name] + `</td>
                </tr>`;
                i++;
            }
        }

        if (table) {
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
                      <th data-action="ranking_sort,msgs" class="text-right text-primary">` + _l('排行_消息数') + `<i class="fa fa-arrow-up" aria-hidden="true"></i></th>
                    </tr>
                  </thead>
                  <tbody>` + h + '</tbody></table>');
            if (!closeModal('modal-custom', 'ranking')) {
                halfmoon.toggleModal('modal-custom');
            }
        } else {
            closeModal('modal-custom', 'ranking', () => {
                $('#modal-custom tbody').html(h);
            })
        }

    },
    // 取频道信息
    getChannel: (name) => {
        return window['chat_' + name];
    },
    // 删除频道
    removeChannle: (name) => {
        delete window['chat_' + name];
        delete g_chat.lastMsg[name];
        local_remove('chat_' + name);
        $('.chat_list[data-name="' + name + '"]').remove();
    },
    // 取消息
    getValue: (time, name) => {
        if (name == undefined) name = g_chat.name;
        return window['chat_' + name].msgs[time];
    },
    replaceWith: (div, html) => {
        var b = div.hasClass('msg_selected');
        var html = $(html);
        div.replaceWith(html);
        if (b) {
            html.addClass('msg_selected');
        }
    },
    updateChannle: (name = '', toTop = false) => {
        if (name == '') name = g_chat.name;
        var div = $('.chat_list[data-name="' + name + '"]');
        if (toTop) {
            div.prependTo('#content_chatList');
        }
        g_chat.replaceWith(div, g_chat.getHtml(g_chat.lastMsg[name], name));
    },
    // 更新频道的最后一条消息
    initLast: (name) => {
        var data = g_chat.getChannel(name);
        var times = Object.keys(data.msgs);
        var detail = {
            icon: data.icon,
            times: times,
            pin: data.pin || 0,
            createAt: data.createAt,
            // times: Object.keys(data.msgs).sort((a, b) => {return b-a}),
        }

        var time = detail.times[times.length - 1];
        if (time) {
            detail.lastMsg = data.msgs[time];
        } else {
            detail.lastMsg = {};
        }
        g_chat.lastMsg[name] = detail;
        return g_chat.lastMsg[name];
    },
    // 设置消息
    setValue: (time, data, name) => {
        if (name == undefined) name = g_chat.name;
        if (data == undefined) {
            delete window['chat_' + name].msgs[time];
            var i = g_chat.lastMsg[name].times.indexOf(time);
            if (i != -1) {
                g_chat.lastMsg[name].times.splice(i, 1);
            }
            g_chat.initLast(name);
            g_chat.updateChannle(name);
        } else {
            window['chat_' + name].msgs[time] = data;
        }
        local_saveJson('chat_' + name, window['chat_' + name]);
    },
    // 设置消息样式
    setTextStyle: (time, style, enable) => {

        g_chat.showMenu(false);

        var par = $('.msg[data-time="' + time + '"]');
        var name = par.attr('data-name');
        var time = par.attr('data-time');
        var data = g_chat.getValue(time, name);
        if (enable == undefined) {
            enable = !data[style];
        }
        data[style] = enable;
        g_chat.setValue(time, data, name);
        g_chat.replaceWith(par, g_chat.getHTML_msgs(time, data, true));
    },
    setTextColor: (time, color) => {
        g_chat.showMenu(false);

        var par = $('.msg[data-time="' + time + '"]');
        var time = par.attr('data-time');
        var name = par.attr('data-name');
        var data = g_chat.getValue(time, name);

        if (color == 'default') {
            delete data['color'];
        } else {
            data['color'] = color;
        }
        g_chat.setValue(time, data, name);

        g_chat.replaceWith(par, g_chat.getHTML_msgs(time, data, true));
    },

    // pin 文字/图片 到消息
    pin_to_msg: (time, value) => {
        var dom = $('.msg[data-time="' + time + '"]');
        var name = dom.attr('data-name');

        var data = g_chat.getValue(time, name);

        if (value == '') {
            delete data.emoji;
        } else {
            data.emoji = value;
        }
        g_chat.setValue(time, data, name);
        g_chat.replaceWith(dom, g_chat.getHTML_msgs(time, data, true));
    },

    timeline_to: (date, contentOnly = false) => {
        g_chat.name = undefined;
            var h = '';
            var b = $('[data-action="msg_sort"]').hasClass('text-primary');
            var datas = g_chat.countMsg(date, false, []);
            for(var t of Object.keys(datas).sort((a, b) => {return b-a})){
                if(b){
                    h= g_chat.getHTML_msgs(t, datas[t]) + h;
                }else{
                    h+=g_chat.getHTML_msgs(t, datas[t]);
                }
            }
             g_chat.setChatHtml(h);
            if(contentOnly) return;
            g_chat.initChatUI();
            if(contentOnly) return;
            g_chat.date =date;
            g_chat.setBadge(date, Object.keys(datas).length);
            $('.navbar-brand').html(date);
            $('.navbar-nav').html(`
                <i class="fa fa-arrow-left mr-10 font-size-20" aria-hidden="true" data-action="timeline_prev"></i>
                <i class="fa fa-arrow-right mr-10 font-size-20" aria-hidden="true" data-action="timeline_next"></i>
                 <input type="text" id="timepicker_timeline" class="form-control timepicker text-center" style="width: 125px;" readonly placeholder="日付を選択">
            `);
            var enable = [true];
            var days = g_chat.getDays();
            g_chat.days = Object.keys(days);
            for (var date in days) {
                var a = date.split('/');
                a[1]--; // 月 - 1
                enable.push(a);
            }
            $('#timepicker_timeline').pickadate({
                disable: enable,
                onSet: function(thingSet) {
                    if(thingSet.select){
                        g_chat.timeline_to(getFormatedTime(4, new Date(thingSet.select)));
                    }else{
                        // 翻页
                        g_chat.markToDays(days);
                    }
                },
                onOpen: () => {
                    $('.navbar-fixed-bottom').hide();
                   g_chat.markToDays(days);
                },
                onClose: () => {
                    $('.navbar-fixed-bottom').show();
                }
            });
            $('#div_inpuit').hide();
    },

    markToDays: (days) => {
         for(var date in days){
            var time = new Date(date).getTime();
            var d = $('.picker__day[data-pick="'+time+'"]');
            if(d.length){
                var badge = d.css('position', 'relative').find('.badge');
                if(badge.length){
                    badge.html(days[date]);
                }else{
                     d.append('<span class="badge badge-primary badge-pill" style="position: absolute;bottom: 0px;right: 0px;">'+days[date]+'</span>');
                }
            }
        }
       
    },


    registerActions: () => {
        
         registerAction('msg_sort', (dom, action, params) => {
            $(dom).toggleClass('text-primary');
            if(g_chat.name == undefined){
                g_chat.timeline_to(g_chat.date, true);
            }else{
                g_chat.openChat(g_chat.name, true);
            }
        });
        registerAction('timeline_prev', (dom, action, params) => {
            var i = g_chat.days.indexOf(g_chat.date);

            if(i > 0){
                g_chat.timeline_to(g_chat.days[i-1]);
            }else{

                toastPAlert(_l('时间线_第一页'), 'alert-secondary');
            }
        });
        registerAction('timeline_next', (dom, action, params) => {
            var i = g_chat.days.indexOf(g_chat.date);
            if(g_chat.days.length - i > 1){
                g_chat.timeline_to(g_chat.days[i+1]);
            }else{
                toastPAlert(_l('时间线_最后一个'), 'alert-secondary');
            }
        });
        registerAction('timeline_to', (dom, action, params) => {
            g_chat.timeline_to(action.length > 1 ? action[1] : getFormatedTime(4));
        });

        // 消息多选

        registerAction('msg_multiSelect', (dom, action, params) => {
            $(dom).toggleClass('text-primary');
            $('.msg_selected').removeClass('msg_selected');
        });


        // 消息点击
        registerAction('event_#msg', (dom, action, params) => {
            if ($('[data-action="msg_multiSelect"]').hasClass('text-primary')) {
                $(dom).toggleClass('msg_selected');
                return;
            }
            var img = $(dom).find('[data-audio]');
            if (img.length) {
                g_emoji.playAudio(img.attr('data-audio'));
            }
        });

        registerAction('emoji_select', (dom, action, params) => {
            g_chat.showMenu(false);
            if (action.length > 1 || g_chat.rm_showing.length == 1) {
                g_chat.pin_to_msg(action.length > 1 ? action[1] : g_chat.rm_showing[0], action.length > 1 ? '' : dom.nodeName == 'IMG' ? dom.src : $(dom).html());
                return;
            }
            for (var id of g_chat.rm_showing) {
                g_chat.pin_to_msg(id, dom.nodeName == 'IMG' ? dom.src : $(dom).html());
            }
        });
        registerAction('ranking_sort', (dom, action, params) => {
            $('#table_ranking').find('.fa-arrow-up').hide().parent().removeClass('text-primary');
            $(dom).find('.fa-arrow-up').show().parent().addClass('text-primary');
            g_cache.ranking_sort = action[1];
            g_chat.showRanking(g_cache.rankingDate, false);
        });
        registerAction('ranking', (dom, action, params) => {
            toastPAlert('loading...', 'alert-secondary');
            g_voice.play('loading');
            queryMsg({ type: 'ranking' });
        });
        registerAction('ranking_chooseData', (dom, action, params) => {
            if (!g_cache.ranking) {
                return queryMsg({ type: 'ranking' });
            }
            var enable = [true];
            for (var date in g_cache.ranking) {
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
            g_chat.showMenu(false);


            copyText($('.msg[data-time="' + g_chat.rm_showing[0] + '"]').find('.alert-text').text());
        });
        registerAction('chat_msg_share', (dom, action, params) => {
            g_chat.showMenu(false);
            shareContent($('.msg[data-time="' + g_chat.rm_showing[0] + '"]').find('.alert-text').text());
        });
        registerAction('chat_msg_edit', (dom, action, params) => {
            $('#div_inpuit').show();
            var par = $('.msg[data-time="' + g_chat.rm_showing[0] + '"]');
            var time = par.attr('data-time');
            var old = par.find('.alert-text').html();
            g_chat.edit = {
                time: time,
                channle: par.attr('data-name'),
                text: old
            }
            g_chat.editor.txt.html(old);
            g_chat.showMenu(false);

            g_chat.editor.cmd.do('insertHTML', ''); // 聚焦
        });



        registerAction('chat_msg_style', (dom, action, params) => {
            var active = $(dom).toggleClass('btn-primary').hasClass('btn-primary');
            for (var id of g_chat.rm_showing) {
                g_chat.setTextStyle(id, action[1], active);
            }
        });
        registerAction('chat_msg_color', (dom, action, params) => {
            for (var id of g_chat.rm_showing) {
                g_chat.setTextColor(id, action[1]);
            }


        });
        registerAction('chat_msg_delete', (dom, action, params) => {
            confirm(_l('是否删除消息', g_chat.rm_showing.length)).then((d) => {
                if (d.button == 'ok') {
                    g_chat.showMenu(false);

                    for (var id of g_chat.rm_showing) {
                        var par = $('.msg[data-time="' + id + '"]');
                        var h6 = par.next();
                        if (h6.hasClass('date') && !par.prev().hasClass('msg')) { // 删除的是最后一个
                            g_chat.dates.splice(g_chat.dates.indexOf(h6.attr('data-date')), 1);
                            h6.remove();

                        }
                        g_chat.setValue(par.attr('data-time'), undefined, par.attr('data-name'));
                        par.remove();
                    }

                }
            })
        });
        registerAction('chatList_remove', (dom, action, params) => {
            confirm(_l('是否删除频道')).then((d) => {
                if (d.button == 'ok') {
                    g_chat.removeChannle(g_chat.name);
                    $('[data-action="toTab,chatList"]')[0].click();
                }
            });
        });
        registerAction('chat_openChat', (dom, action, params) => {
            g_chat.openChat($(dom).attr('data-name'));
        });

        registerAction('channle_setIcon_text', (dom, action, params) => {
            prompt('input text/emoji', '😀').then((d) => {
                var s = (d.text == '' ? g_chat.editName : d.text).substr(0, 2);
                var i =  $('#chatList_add_icon i');
               i.attr('data-text', d.text).removeClass(i.attr('data-icon')).html(s).show();
                $('#chatList_add_icon img').hide();
            });
        });

        registerAction('channle_setIcon_img', (dom, action, params) => {
                $('#input_img').attr('data-type', 'icon').click();
        });
        registerAction('channle_pin', (dom, action, params) => {
            var d = $(dom);
            var b = d.toggleClass('btn-danger').hasClass('btn-danger');
            if(b){
                d.html('pin');
            }else{
                d.html('unpin');
            }
        });

        registerAction('chatList_add', (dom, action, params) => {
            var edit = action.length > 1;
            g_cache.closeCustom = () => {
                g_chat.editName = undefined;
            }
                g_chat.editName = edit ? action[1] : undefined;

            $('#modal-custom').find('.modal-title').html(_l('弹出_频道_' + (edit ? '修改' : '新建')));
            $('#modal-custom').attr('data-type', 'chatList_add').find('.modal-html').html(`
                <div class="mb-10 position-relative">
                    <button class="btn btn-rounded btn-sm btn-danger" data-action="channle_pin" style="position: absolute;right: 0;top: 0;">`+_l('pin')+`</button>
                    <div class="position-relative mx-auto w-fit">
                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                          <div class="btn-group dropdown with-arrow" role="group">
                                <div id='chatList_add_icon' class="_icon icon_selecter" data-toggle="dropdown">
                                    <i class="fa fa-edit mx-auto font-size-20" aria-hidden="true" style="line-height: 55px;" data-icon="fa-edit"></i>
                                    <img class="rounded-circle content-fit" style="display: none;" src="./img/maki.jpg">
                                </div>
                            <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-icon">
                              <a onclick="g_choose.icon.init();" class="dropdown-item">`+_l('图标')+`</a>
                              <a data-action="channle_setIcon_text" class="dropdown-item">`+_l('文字')+`</a>
                              <a data-action="channle_setIcon_img" class="dropdown-item">`+_l('图片')+`</a>
                            </div>
                          </div>
                        </div>

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
                var data = g_chat.getChannel(action[1]);
                $('#chatList_input_name').val(action[1]);
                $('#chatList_input_desc').val(data.desc);
                if(data.pin){
                    $('[data-action="channle_pin"]').removeClass('btn-danger').html(_l('unpin'));
                }
                var i = $('#chatList_add_icon i');
                if(data.icon.substr(0, 5) == 'data:' || ['.jpg', '.png'].indexOf(data.icon.substr(-4).toLowerCase()) != -1 ){
                    $('#chatList_add_icon img').attr('src', data.icon).show();
                    i.hide();
                }else
                if(data.icon.substr(0, 3) == 'fa-'){
                    i.removeClass(i.attr('data-icon')).addClass(data.icon).attr('data-icon', data.icon);
                }else{
                    i.removeClass(i.attr('data-icon')).attr('data-icon', null).html(data.icon);
                }
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
            if (g_chat.getChannel(name) && !edit) {
                return alert(_l('弹出_频道_新建_已存在'));
            }
            var data = {
                icon: getIconValue($('#chatList_add_icon')),
                desc: $('#modal-custom textarea').val(),
                pin: $('[data-action="channle_pin"]').hasClass('btn-danger') ? 0 : new Date().getTime()
            }
            if (edit) {
                data = Object.assign(g_chat.getChannel(action[1]), data);

                if (name != action[1]) {
                    g_chat.removeChannle(action[1]);
                    var to = name;
                }
            } else {
                data.enable = true;
                data.msgs = {};
                data.createAt = new Date().getTime();
            }

            halfmoon.toggleModal('modal-custom');
            g_chat.initChannel(name, data, true);
            g_chat.initHtml();
            g_chat.editName = undefined;
            if (to) {
                g_chat.openChat(to);
            } 
        });
        registerAction('chat_searchTag', (dom, action, params) => {});
        registerAction('chat_sendMsg', (dom, action, params) => {
            var m = g_chat.editor.txt.html();
            if (m != '') {

                g_emoji.hide();
               var s = getEditorHtml(m);
                g_chat.editor.txt.clear();

                if (g_chat.edit.time) { // 编辑消息
                    name = g_chat.edit.channle;
                    if(s == g_chat.edit.text){
                        return;
                    }

                    var time = g_chat.edit.time;
                    var data = g_chat.getValue(time,name);
                    data.text = s;
                    g_chat.setValue(time, data, name);
                    g_chat.replaceWith($('.msg[data-time="' + time + '"]'), g_chat.getHTML_msgs(time, data, true));

                    if( g_chat.name == undefined){
                        $('#div_inpuit').hide();

                    }

                } else {
                    name = g_chat.name;
                    var data = {
                        text: s
                    }
                    var time = new Date().getTime();
                    g_chat.setValue(time, data);
                    var s1 = $(g_chat.getHTML_msgs(time, data, false));
                    if($('[data-action="msg_sort"]').hasClass('text-primary')){
                        $('#content_chat .mainContent').append(s1);
                        toBottom();
                    }else{
                        $('#content_chat .mainContent').prepend(s1);

                    }
                    g_chat.lastMsg[name].times.push(time);
                }
                g_chat.lastMsg[name].lastMsg = data;
                g_chat.editor.history.content.cache.data.data = []; // 清除历史
                $('[data-title="撤销"]').removeClass('w-e-active');
                toTop();
                g_chat.edit = {};
                startVibrate(25);
            }
        });

    },
    getDays: (channel) => {

        var res = [];
         var channels;
        if (channel) {
            channels = [channel];
        } else {
            channels = Object.keys(g_chat.lastMsg);
        }
        for (var name of channels) {
            for (var time of g_chat.lastMsg[name].times) {
                var date = getFormatedTime(4, new Date(parseInt(time)));
                if(res[date] == undefined) res[date] = 0;
                res[date]++;
            }
        }
        return res;
    },
    countMsg: (s_data, channel, list = false) => {
        var cnt = 0;
        var channels;
        if (channel) {
            channels = [channel];
        } else {
            channels = Object.keys(g_chat.lastMsg);
        }
        for (var name of channels) {
            for (var time of g_chat.lastMsg[name].times) {
                if (getFormatedTime(4, new Date(parseInt(time))) == s_data) {
                    if(list){
                        var d = g_chat.getValue(time, name);
                        d.name = name;
                        list[time] = d;
                    }
                    cnt++;
                }
            }
        }

        return list || cnt;
    },
    initChannel: (name, data, save = false) => {
        window['chat_' + name] = data;
        if (save) {
            local_saveJson('chat_' + name, data);
        }
        return g_chat.initLast(name);
    },
    initChannels: () => {
        var arr = [];
        for (var k of local_getList()) {
            if (k.indexOf(g_localKey + 'chat_') == 0) {
                var name = k.replace(g_localKey + 'chat_', '');
                g_chat.initChannel(name, local_readJson('chat_' + name, {}))
            }
        }
    },
    initHtml: () => {
        var h = '';
        for (var name of Object.keys(g_chat.lastMsg).sort(function(a, b) {
            var lastb = g_chat.lastMsg[b].times.length ? g_chat.lastMsg[b].times[g_chat.lastMsg[b].times.length-1] : g_chat.lastMsg[b].createAt;
            var lasta = g_chat.lastMsg[a].times.length ? g_chat.lastMsg[a].times[g_chat.lastMsg[a].times.length-1] : g_chat.lastMsg[a].createAt;
                return g_chat.lastMsg[b].pin - g_chat.lastMsg[a].pin || lastb - lasta;
            })) {
            h += g_chat.getHtml(g_chat.lastMsg[name], name);
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
        $('.navbar-fixed-bottom').html(`
            <div id="bottom_chatList" class="row w-full toolbar">
                <div class="col-9 flex-center mx-auto font-size-20" >

                </div>
                <div class='col'>
                    <a class="badge-group" data-action="timeline_to">
                      <span class="badge bg-dark text-white">` + getFormatedTime(2) + `</span>
                      <span class="badge badge-primary">` + g_chat.countMsg(getFormatedTime(4)) + `</span>
                    </a>
                </div>

            </div>`);

    },
    getHTML_msgs: (time, data, replace = true) => {
        var h = '';

        // <font color="#c24f4a">wwwwwwwwwwwww</font>
        var s = data.text;
        var date = new Date(Number(time));
        if (s.indexOf('color="') != -1) {
            s = $(s).text(); // 提取标签内文本
            var s1 = data.text.replace(s, '{str}');
        }
        for (var tag of cutStrings1(s, '#', true)) {
            s = s.replaceAll('#' + tag, '<a data-action="chat_searchTag">#' + tag + '</a>');
        }
        if (s1) {
            s = s1.replace('{str}', s); // 换回去
            delete s1;
        }
        h += `<div class="msg ns row justify-content-end mb-10 mr-10" data-time="` + time + `" data-action="event_#msg"`+(data.name?' data-name="'+data.name+'"':'')+`>

                    <div class="col-auto align-self-end mr-10">
                        <span class='time text-muted text-right'>` + getFormatedTime(0, date) + `</span>
                    </div>
                <div class="alert` + (data.color ? ' alert-' + data.color : '') + ` main filled-dm mb-5 mr-10 col-auto shadow-sm" role="alert">
                ` + g_chat.initMessagePin(time, data.emoji) + `
                
                  <span class="alert-text text-break msg_text">` + g_chat.getStyle(data, s) + `</span>
                </div>
            </div>`;

        var s_data = getFormatedTime(4, date);
        if (!replace && g_chat.dates.indexOf(s_data) == -1) {
            g_chat.dates.push(s_data);
            var s = `<h6 class='text-muted text-center d-block mt-20 date' data-date="`+s_data+`">` + s_data + `</h6>`;
            if($('[data-action="msg_sort"]').hasClass('text-primary')){
                h = s + h;
            }else{
                h += s;
            }
        }

        // <h4 class="alert-heading"></h4>
        //  <img src="img/maki.jpg" class="user-icon">
        return h;
    },

    initMessagePin: (time, s) => {
        if (s != undefined && s != '') {
            if (s.substr(0, 1) == '{' && s.substr(-1) == '}') {
                var d = JSON.parse(s);
                return '<img class="emoji-pin" style="width: 50px;margin: 5px;height:50px;" src="' + d.img + '" data-src="' + d.img + '" data-action="emoji_select,' + time + '"' + (d.audio ? ' data-audio="' + d.audio + '"' : '') + '>';
            }
            return s.indexOf('http') != -1 ? '<img class="emoji-pin" style="width: 23px;margin: 5px;height:23px;" src="' + s + '" data-action="emoji_select,' + time + '">' : '<span class="emoji-pin" data-action="emoji_select,' + time + '">' + s + '</span>';
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

    setChatHtml: (html) => {
         for (var img of $('#content_chat .mainContent').html(html)) {
            reloadImage(img);
        }
    },

    initChatUI: () => {
        $('#div_inpuit').html(`
                <div class='col-12'>
                    <div id="toolbar-container" class="w-full"></div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-1">
                       
                     </div>
               

                    <div id="msg" class="w-full text-center form-control col-10 mx-auto" style="height: 80px;padding-right: 35px;padding-left: 5px;border-bottom-right-radius: 50px !important;">
                    </div>
                    <div class="col-1">

                     <a data-action="chat_sendMsg" class="btn btn-square btn-primary rounded-circle btn-lg shadow" style="position: absolute;bottom: 2px; right: 18px;font-size: 2rem;"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>
                    </div>
            </div>`);
        g_chat.editor = new wangEditor("#toolbar-container", "#msg");
        g_chat.editor.config.menus = [
            // 'emoticon',
            'bold',
            'list',
            'foreColor',
            'todo',
            'italic',
            'underline',
            'strikeThrough',
            'head',
            'undo',
            'image',
        ];
        g_chat.randomPlaceHolder();
        g_chat.editor.config.uploadImgShowBase64 = true;

        g_chat.editor.config.customUploadImg = function(resultFiles, insertImgFn) {
            lrz(resultFiles[0], { width: 800, quality: 0.5 })
                .then(function(rst) {
                    insertImgFn(rst.base64)
                })
                .catch(function(err) {
                    alert('图片读取错误');
                });
        }
        // TODO 对网络图片进行大小限制

        g_chat.editor.config.onchange = function(newHtml) {
            if (g_chat.fullscreen) return;
            var h = newHtml.trim() == '' ? 0 : $('#msg .w-e-text')[0].scrollHeight;
            if (h < 80) h = 80;
            $('#msg').css('height', h);
        }

        g_chat.editor.txt.eventHooks.keydownEvents.splice(0, 0, (event) => {
            if (event.ctrlKey && event.keyCode == 13) {
                event.preventDefault(true);
                $('[data-action="chat_sendMsg"]').click();
            }
        });

        g_chat.editor.config.focus = false


        g_chat.editor.create();

        $('#toolbar-container .w-e-toolbar').prepend(`<div data-action="show_stricker,#msg" class="w-e-menu" data-title="">
                <i class="w-e-icon-happy"></i>
            </div>`);

        showContent('chat');
        g_chat.randomPlaceHolder();
      
        g_cache.date_scroll = '';
        
        $('.navbar-fixed-bottom').html(`
            <div id="bottom_chatList" class="row w-full flex-center toolbar p-10 font-size-20">
               <i data-action="msg_multiSelect" class="fa fa-check-square-o col-1" aria-hidden="true"></i>
               <i data-action="msg_sort" class="fa fa-sort col-1" aria-hidden="true"></i>
            </div>`);
        $('.content-wrapper').scroll();
        toTop();
    },

    openChat: (name, contentOnly = false) => {
    	g_config.lastChanel = name;
    	local_saveJson('config', g_config);
    	
        g_chat.name = name;
        g_chat.lastData = '';
         g_chat.dates = [];
       g_chat.edit = {};
        var h = '';
        // todo 多种消息支持，根据类型执行不同的函数得出不同的Html
         var b = $('[data-action="msg_sort"]').hasClass('text-primary');
         var s;
        for (var time of g_chat.lastMsg[name].times) {
            s = g_chat.getHTML_msgs(time, window['chat_' + name].msgs[time], false);
            if(b){
                h += s;
            }else{
                h = s + h;
            }
        }
        g_chat.setChatHtml(h);
        if(contentOnly) return;
        g_chat.initChatUI();

        if (time) {
            g_chat.nav_check(time, name);
        }
          $('.navbar-brand').html(`<i data-action="habbit_dots" class="fa ` + g_chat.lastMsg[name].icon + ` mr-10" aria-hidden="true"></i>` + name);
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
                ` + _l('删除频道') + `
              </a>
            </div>
          </div>
        </li>
        `);
            $('#div_inpuit').show();

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
        $('#msg .placeholder').html(a[randNum(0, a.length - 1)]);
    },

    setBadge: (date, count) => {
         $('.navbar-nav .badge-group').css('display', 'contents').find('.badge').html(date).next().html(count);
     },

    // 消息界面右上角显示的一日统计
    nav_check: (time, channel) => {
        var date = new Date(parseInt(time));
        var s_date = getFormatedTime(4, date);
        if (s_date != g_cache.date_scroll) {
            g_cache.date_scroll = s_date;
           g_chat.setBadge(getFormatedTime(2, date), g_chat.countMsg(s_date, channel));

        }
    },

    getHtml: (data, name) => {
        var len = data.times.length;
        var icon = getIconStr(data.icon, name);
        
        return `<div class="alert filled-lm chat_list shadow-sm" role="alert" data-action="chat_openChat" data-name="` + name + `">
                    <div class="_icon position-relative">
                        `+(data.pin ? `<span class="badge badge-pill badge-primary badge-danger" style="padding: 1px 5px;position: absolute;bottom: 0;right: 0;z-index: 2;"><i class="fa fa-thumb-tack" aria-hidden="true" ></i></span>` : '')+`
                        `+icon+`
                    </div>
                    <div style="margin-left: 20px;">
                      <h4 class="alert-heading text-truncate" style="padding-right: 40px;">` + name + `</h4><span class="last-text" style="padding-right: 30px;">
                      ` + (data.lastMsg.text || _l('什么都没写')) + `</span>
                  </div>
                    <span class="text-muted rt">` + time_getRent( data.times.length ? data.times[data.times.length - 1] : data.createAt)+ `</span>
                    ` + (len > 0 ? '<span class="badge badge-primary rb">' + len + '</span>' : '') + `
                </div>`;
    }
}
g_chat.preInit();