var g_list = {
    indexs: {},
    preInit: () => {
        $(`
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,list">
                    <span class="sidebar-icon">
                        <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_列表_标题') + `
            </a>

            `).appendTo('.sidebar-menu');
    },
    init: () => {
        if (g_list.inited) return;
        g_list.inited = true;
        // var data = {
        //     1628611200000: {
        //         name: 'list1',
        //         notes: {
        //             1628611300000: {
        //                 text: "text1",
        //                 desc: '11',
        //             },
        //             1628611400000: {
        //                 text: "text2",
        //                 desc: '22',
        //             }
        //         },
        //         icon: 'img/school.png',
        //         desc: "desc",
        //     }
        // };
        // for (var i = 0; i < 10; i++) {
        //     data[1628611200000].notes[i] = {
        //         text: "text" + i
        //     }
        // }
        // g_lists = data;
        g_lists = local_readJson('lists', {});

        $(`<div id='content_list' class="_content hide">
            <div class="mainContent row"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="list_add" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            </div>`).appendTo('.content-wrapper');

        g_list.registerActions();
        g_list.initHtml();
    },
    initHtml: () => {
        var h = '';
        var n = new Date().getTime();
        for (var time of Object.keys(g_lists).sort(function(a, b) {
                return g_lists[b].pin - g_lists[a].pin || Math.abs(a - n) - Math.abs(b - n);
            })) {
            h += g_list.getHtml(time);
        }
        $('#content_list .mainContent').html(h);
    },

    getHTML_create: (time) => {
        return `
                    <div class="position-relative mx-auto w-fit">
                        <div class="btn-group" role="group" >
                          <div class="btn-group dropdown with-arrow" role="group">
                                <div id='img_list_add_icon' class="_icon icon_selecter" data-toggle="dropdown">
                                    <i class="fa fa-edit mx-auto font-size-20" aria-hidden="true" style="line-height: 55px;" data-icon="fa-edit"></i>
                                    <img class="rounded-circle content-fit" style="display:none" src="./img/maki.jpg">
                                </div>
                            <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-icon">
                              <a onclick="g_choose.icon.init();" class="dropdown-item">` + _l('图标') + `</a>
                              <a data-action="list_setIcon_text" class="dropdown-item">` + _l('文字') + `</a>
                              <a data-action="list_setIcon_img" class="dropdown-item">` + _l('图片') + `</a>
                            </div>
                          </div>
                        </div>

                    </div>
                    
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_列表_新建_名称_标题') + `</span>
                  </div>
                   <input id="input_day_name" type="text" class="form-control" placeholder="` + _l('弹出_列表_新建_名称_默认') + `">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_列表_新建_注释_标题') + `</span>
                  </div>
                  <textarea class="form-control" placeholder="` + _l('弹出_列表_新建_注释_默认') + `"></textarea>
                </div>
                <button class="btn btn-primary btn-block" data-action="list_create">` + _l('弹出_列表_' + (name != '' ? '修改' : '新建') + '_按钮_确定') + `</button>`;
    },
    registerActions: () => {

        registerAction('list_setIcon_text', (dom, action, params) => {
            prompt('input text/emoji', '😀').then((d) => {
                var s = (d.text == '' ? $('#input_day_name').val() : d.text).substr(0, 2);
                var i = $('#img_list_add_icon i');
                i.attr('data-text', d.text).removeClass(i.attr('data-icon')).html(s).show();
                $('#img_list_add_icon img').hide();
            });
        });

        registerAction('list_setIcon_img', (dom, action, params) => {
            $('#input_img').attr('data-type', 'icon').click();
        });


        registerAction('list_pin', (dom, action, params) => {
            var b = $(dom).toggleClass('text-secondary').hasClass('text-secondary');
            g_lists[action[1]].pin = b ? new Date().getTime() : 0;
            local_saveJson('lists', g_lists);
            g_list.initHtml();
        });
        registerAction('list_delete', (dom, action, params) => {
            confirm(_l('列表_是否删除')).then((d) => {
                if (d.button == 'ok') {
                    delete g_lists[action[1]];
                    local_saveJson('lists', g_lists);
                    g_list.initHtml();

                }
            });
        });

        registerAction('list_add', (dom, action, params) => {
            var time = action[1] || '';
            g_list.editingId = time;
            g_cache.closeTopCustom = () => {
                delete g_list.editingId;
            }
            $('#modal-top').find('.modal-title').html(_l('弹出_列表_新建'));
            $('#modal-top').attr('data-type', 'list_add').find('.modal-html').html(g_list.getHTML_create(time));
            if (time != '') {
                var data = g_lists[time];
                $('#input_day_name').val(data.name);
                $('#modal-top textarea').val(data.desc);
                var i = $('#img_list_add_icon i');
                if (data.icon.substr(0, 5) == 'data:' || ['.jpg', '.png'].indexOf(data.icon.substr(-4).toLowerCase()) != -1) {
                    $('#img_list_add_icon img').attr('src', data.icon).show();
                    i.hide();
                } else
                if (data.icon.substr(0, 3) == 'fa-') {
                    i.removeClass(i.attr('data-icon')).addClass(data.icon).attr('data-icon', data.icon);
                } else {
                    i.removeClass(i.attr('data-icon')).attr('data-icon', null).html(data.icon);
                }
            }
            halfmoon.toggleModal('modal-top');
        });



        registerAction('list_loadMore', (dom, action, params) => {
            var par = $(dom).parents('.col-12[data-time]');
            var h = g_list.loadMore(par.attr('data-time'));
            if (h != '') {
                par.find('.content').append(h);
            }
            dom.remove();
        });

        registerAction('list_create', (dom, action, params) => {
            var input = $('#input_day_name');
            var name = input.val();
            if (name == '') {
                return input.focus();
            }
            var time = new Date().getTime();
            var data = {
                name: name,
                icon: getIconValue($('#img_list_add_icon')),
                desc: $('#modal-top textarea').val(),
            };
            if (g_list.editingId) {
                var old = g_list.editingId;
                data = Object.assign(g_lists[old], data);
                delete g_lists[old];
            } else {
                data.notes = {};
            }
            g_lists[time] = data;
            local_saveJson('lists', g_lists);
            delete g_list.editingId;
            halfmoon.toggleModal('modal-top');
            g_list.initHtml();
        });

        registerAction('addNote', (dom, action, params) => {
            var time = action[1],
                div = $('#content_list .mainContent .col-12[data-time="' + time + '"]'),
                msg = action[2],
                editTime = action[3] || new Date().getTime();
            if (msg == '') {
                delete g_lists[time].notes[editTime];
                $(dom).parents('.list_item').parent().remove();
                g_list.indexs[time]--;
                domValueAdd(div.find('.list_cnt')[0], -1);
            } else {
                g_list.indexs[time]++;
                g_lists[time].notes[editTime] = {
                    text: msg
                }
                div.find('.content').prepend(g_list.getListHtml(time, msg, editTime));
                domValueAdd(div.find('.list_cnt')[0], 1);
            }
            local_saveJson('lists', g_lists);
        });
    },

    addNote: (time, input) => {
        doAction(null, 'addNote,' + time + ',' + input.value);
        input.value = '';
    },

    getHtml: (time) => {
        var data = g_lists[time];
        var len = Object.keys(data.notes).length;
        var t = (time - new Date().getTime()) / 1000;
        var icon = getIconStr(data.icon, name);
        var h = `
        <div class="col-12 mb-10" data-time="` + time + `">
            <div class="card position-relative" >
                <i style="position: absolute;left: 10px;top: 10px;" data-action="list_pin,` + time + `" class="fa fa-star` + (data.pin ? ' text-secondary' : '-o') + `" aria-hidden="true"></i> 
                <div class="dropdown" style="z-index: 2;position: absolute;right: 10px;top: 10px;" >
                    <i data-toggle="dropdown" class="fa fa-ellipsis-h" aria-hidden="true"></i> 
                  <div class="dropdown-menu dropdown-menu-center">
                    <a class="dropdown-item" data-action="list_add,` + time + `">` + _l('列表_编辑') + `</a>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-content">
                      <button class="btn btn-block btn-danger" data-action="list_delete,` + time + `" type="button">` + _l('列表_删除') + `</button>
                    </div>
                  </div>
                </div>
                <div class='cardContent'>
                    <div class="text-center">
                        ` + icon + `
                        </div><div class="row " style="align-items: center;" >
                            <div class="col"></div>
                            <div class="col-8"><h5 class="text-center">` + data.name + `</h5></div>
                            <div class="col"><button class="btn btn-sm list_cnt">` + len + `</button></div>
                          </div>
                        <input type="text" class="form-control w-full" placeholder="` + _l('列表_输入_默认') + `" onkeydown="if(event.keyCode == 13 && this.value != '') g_list.addNote(` + time + `, this);">
                        <div class="content mb-10">
                        `;

        g_list.indexs[time] = 0;
        h += g_list.loadMore(time);
        h += `</div></div>
            </div>
        </div>`;
        return h;
    },
    loadMore: (time) => {
        var note;
        var h = '';
        var hasMore = false;
        var keys = Object.keys(g_lists[time].notes);
        var max = keys.length;
        var nt;
        var start = g_list.indexs[time]
        for (var i = 0; i < 5; i++) {
            index = max - i - start - 1;
            nt = keys[index];
            hasMore = index >= 0;
            if (!hasMore) {
                break;
            }
            note = g_lists[time].notes[nt];
            h += g_list.getListHtml(time, note.text, nt);
            g_list.indexs[time]++
        }

        if (hasMore) {
            h += `
             <div class="w-full text-right">
                <button class="btn btn-sm" data-action="list_loadMore">`+ _l('列表_项目_加载更多')+`</button>
            </div>`;
        }

        return h;
    },

    getListHtml: (time, text, nt) => {
        return ` 
            <div>
            <div class="row list_item"  style="align-items: baseline;" >
                <strong class="col text-truncate" title="`+text+`">` + text + `</strong>
                <span class="text-muted">`+getFormatedTime(1, time)+`</span>
                <i class="fa fa-trash-o col-1 text-right" aria-hidden="true" data-action="addNote,` + time + `,,` + nt + `"></i>
            </div><hr /></div>`;
    }
}

g_list.preInit();