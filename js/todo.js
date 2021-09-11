var g_todo = {
    preInit: () => {
        $(`<h5 class="sidebar-title">` + _l('侧栏_代办_标题') + `</h5>
            <div class="sidebar-divider"></div>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,todo">
                    <span class="sidebar-icon">
                        <i class="fa fa-list-alt" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_代办_进入') + `
            </a>`).appendTo('.sidebar-menu');
    },
    init: () => {
        if (g_todo.inited) return;
        g_todo.inited = true;
        $(`<div id='content_todo' class="_content p-10 hide animated fadeIn" animated='fadeIn'>
            <div class="mainContent"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                    <a href="javascript: g_todo.initHtml()" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-refresh" aria-hidden="true"></i></a>
                        <a data-action="todo_add" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>

                    </div>
                </div>
            </div>
            </div>`).appendTo('.content-wrapper');
        g_todo.registerActions();
        g_todo.initHtml();
        // showContent('todo');

        $('body').on('change', '#content_todo details input[type=checkbox]', (event) => {
            var dom = $(event.target);
            var finish = dom.prop('checked');
            var time = dom.parent().attr('data-time');
            g_todos[time].finish = finish;
            g_todos[time].giveUp = false;
            local_saveJson('todos', g_todos);
            var lable = dom.next();
            var h = g_todos[time].name;
            if (finish) {
                h = '<del>' + h + '</del>';
            }
            lable.html(h);
        })
        registerContextMenu('#content_todo details div[data-time]', (dom) => { doAction(dom[0], 'todo_list_item_detail') });;
    },
    subTask_click: (dom) => {
        var finish = dom.prop('checked');
        var time = dom.parent().attr('data-time');
        var date = g_todos[g_todo.viewing_subTask].subTask[time];
        date.finish = finish;
        local_saveJson('todos', g_todos);
        var lable = dom.next();
        var h = date.name;
        if (finish) {
            h = '<del>' + h + '</del>';
        }
        lable.html(h);
    },

    getHtml_task: (action, button) => {
        return `<div class="input-group mb-10">
                     <select class="form-control flex-reset w-auto">
                                    <option value="" disabled>` + _l('弹出_代办_新建_选择框_标题') + `</option>
                                    <option value="danger">` + _l('priority_danger') + `</option>
                                    <option value="secondary">` + _l('priority_secondary') + `</option>
                                    <option value="primary">` + _l('priority_primary') + `</option>
                                    <option value="default" selected>` + _l('priority_default') + `</option>
                                   </select>
                  <input id="input_task_name" type="text" class="form-control" placeholder="` + _l('弹出_代办_新建_名称_默认') + `">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_代办_新建_注释_标题') + `</span>
                  </div>
                  <textarea class="form-control" placeholder="` + _l('弹出_代办_新建_注释_默认') + `"></textarea>
                </div>

                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_代办_开始日') + `</span>
                  </div>
                  <input readonly="true" type='text' id='datepicker-start' class="form-control datepicker-here text-center" placeholder="` + _l('弹出_代办_开始日') + `" />
                  <div class="input-group-append">
                    <button class="btn btn-danger" type="button" onclick="$('#datepicker-start').datepicker().data('datepicker').clear();">` + _l('弹出_代办_关闭日期选择') + `</button>
                  </div>
                </div>
                <div class="input-group  mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_代办_结束日') + `</span>
                  </div>
                  <input readonly="true" type='text' id='datepicker-end' class="form-control datepicker-here text-center" placeholder="` + _l('弹出_代办_结束日') + `" />
                  <div class="input-group-append">
                    <button class="btn btn-danger" type="button" onclick="$('#datepicker-end').datepicker().data('datepicker').clear();">` + _l('弹出_代办_关闭日期选择') + `</button>
                  </div>
                </div>

                <button class="btn btn-primary btn-block" data-action="` + action + `">` + button + `</button>`;
    },

    datapick_ceil: () => {
        var end =  $('#datepicker-end').datepicker().data('datepicker').selectedDates;
        if(end.length == 0){
            return
        }
        var start =  $('#datepicker-start').datepicker().data('datepicker').selectedDates;
        if(start.length == 0){
            start[0] = new Date();
        }
       var i = end[0].getTime() - start[0].getTime();
       $('#datepicker-ceil').html(getTime(i / 1000));
    },

    initDatepick: (start, end) => {
        $('#datepicker-start').datepicker({
            minDate: new Date(),
            timepicker: true,
            language: 'ja',
            autoClose: true,
            todayButton: new Date(),
            clearButton: true,
            onSelect: (formattedDate, date, inst) => {
                $('#datepicker-end').datepicker().data('datepicker').update('minDate', date);
                 g_todo.datapick_ceil();

            }
        });

        $('#datepicker-end').datepicker({
            minDate: new Date(),
            timepicker: true,
            language: 'ja',
            autoClose: true,
            todayButton: new Date(),
            clearButton: true,
            onSelect: (formattedDate, date, inst) => {
                $('#datepicker-start').datepicker().data('datepicker').update('maxDate', date);
                 g_todo.datapick_ceil();

            }
        });
        if (start) {
            $('#datepicker-start').datepicker().data('datepicker').selectDate(new Date(parseInt(start)));
        }
        if (end) {
            $('#datepicker-end').datepicker().data('datepicker').selectDate(new Date(parseInt(end)));
        }
        g_todo.datapick_ceil();
    },

    event_subTask_input_keydown: (e) => {
        var input = e.srcElement;
        if (input.previousElementSibling.value == 'create' && e.keyCode == 13) {
            var name = input.value;
            e.preventDefault(true);

            for (var t in g_todos[g_todo.viewing_subTask].subTask) {
                if (g_todos[g_todo.viewing_subTask].subTask[t].name == name) {
                    return toastPAlert(_l('代办_子任务_已存在'), 'alert-danger');
                }
            }
            input.value = '';
            var time = new Date().getTime();
            var data = {
                name: name,
                finish: false
            };
            g_todos[g_todo.viewing_subTask].subTask[time] = data;
            local_saveJson('todos', g_todos);
            $('#todo_task_subTask').append(g_todo.subTask_getHtml(time, data));
        }

    },

    event_subTask_input_oninput: (e) => {
        var input = e.srcElement;
        if (input.previousElementSibling.value == 'search') {
            var name = input.value;
            for (var d of $('#todo_task_subTask [data-time]')) {
                var label = $(d).find('label');
                if (name != '' && label.text().indexOf(name) != -1) {
                    label.html(label.text().replaceAll(name, '<font color="red">' + name + '</font>'));
                    $(d).prependTo('#todo_task_subTask');
                } else {
                    label.html(label.attr('data-name'));
                }
            }
        }

    },



    subTask_getHtml: (time, v) => {
        var id = 'checkbox-' + time;
        return `
        <div data-time="` + time + `" class="custom-checkbox m-10">
            <input type="checkbox" id="` + id + `" onchange="g_todo.subTask_click($(this))" value=""` + (v.finish ? ' checked' : '') + `>
            <label for="` + id + `" data-name="` + v.name + `">` + (v.finish ? '<del>' : '') + v.name + (v.finish ? '</del>' : '') + `</label>
            <span class="badge badge-primary float-right">` + new Date(parseInt(time)).format("yy-MM-dd hh:mm") + `</span>
            <i data-action="todo_task_subTask_delete,` + time + `" class="fa fa-trash-o text-danger" aria-hidden="true"></i>
        </div>`;
    },

    registerActions: () => {
        // 子任务
        registerAction('todo_task_subTask_delete', (dom, action, params) => {
           delete g_todos[g_todo.viewing_subTask].subTask[action[1]];
            local_saveJson('todos', g_todos);
            $(dom).parent().remove();
        });
        registerAction('todo_task_subTask', (dom, action, params) => {
            g_todo.viewing_subTask = action[1];

            var h = `
            <div class="input-group">
              <select class="form-control flex-reset w-100">
                <option value="" disabled>` + _l('代办_子任务_下拉_类型') + `</option>
                <option value="create" selected>` + _l('代办_子任务_下拉_创建') + `</option>
                <option value="search">` + _l('代办_子任务_下拉_搜索') + `</option>
              </select>
              <input type="text" class="form-control" placeholder="..." onkeydown="g_todo.event_subTask_input_keydown(event)" oninput="g_todo.event_subTask_input_oninput(event)">
            </div>
            <div id="todo_task_subTask">
            `;
            var data = g_todos[action[1]];
            for (var time in data.subTask) {
                h += g_todo.subTask_getHtml(time, data.subTask[time]);
            }
            h += '</div>';
            g_cache.closeCustom = () => {
                // 关闭子任务列表后更新列表中未完成的子任务显示
                var list = $('#content_todo details div[data-time="' + g_todo.viewing_subTask + '"]');
                list.replaceWith(g_todo.getTaskHtml(g_todo.viewing_subTask, list.attr('data-type')));
            }
            $('#modal-custom').find('.modal-title').html(_l('弹出_代办_子任务', data.name));
            $('#modal-custom').attr('data-type', 'todo_task_subTask').find('.modal-html').html(h);
            halfmoon.toggleModal('modal-custom');
        });
        // 删除任务
        registerAction('todo_task_delete', (dom, action, params) => {
            confirm(_l('代办_删除任务')).then((d) => {
                if (d.button == 'ok') {
                    delete g_todos[action[1]];
                    local_saveJson('todos', g_todos);
                    var div = $('#content_todo details div[data-time="' + action[1] + '"]');
                    var list = $('#content_todo details[data-type="' + div.attr('data-type') + '"]');
                    var d = list.find('.task_cnt');
                    var cnt = d.attr('data-value') - 1;
                    d.html(cnt > 0 ? _l('任务总数', cnt) : _l('无任务')).attr('data-value', cnt);
                    if(cnt == 0){
                        list.find('.collapse-content').html('<p class="text-muted text-center">' + _l('任务_列表_无任务') + '</p>');
                    }
                    div.remove();
                }
            })
        });
        // 放弃任务
        registerAction('todo_task_giveUp', (dom, action, params) => {
            g_todos[action[1]].giveUp = $(dom).toggleClass('text-danger').hasClass('text-danger');
            local_saveJson('todos', g_todos);
        });
        // 清空类别
        registerAction('todo_clear', (dom, action, params) => {
            var l = g_todo.getTasks();
            var cnt = l[action[1]].length;
            if (cnt > 0) {
                confirm(_l('代办_清空列别', cnt)).then((d) => {
                    if (d.button == 'ok') {
                        for (var t of l[action[1]]) {
                            delete g_todos[t];
                        }
                        local_saveJson('todos', g_todos);
                        g_todo.initHtml();
                    }
                })
            }

        });
        registerAction('todo_add', (dom, action, params) => {
            g_cache.closeTopCustom = () => {}
            $('#modal-top').find('.modal-title').html(_l('弹出_代办_新建'));
            $('#modal-top').attr('data-type', 'chatList_add').find('.modal-html').html(g_todo.getHtml_task('todo_create', _l('弹出_代办_新建_按钮_确定')));
            g_todo.initDatepick();
            halfmoon.toggleModal('modal-top');
        });
        registerAction('todo_list_item_detail', (dom, action, params) => {
            var time;
            if (action.length > 2) {
                time = action[1];
            } else
            if (!$(dom).attr('data-time')) {
                time = $(dom).parents('[data-time]').attr('data-time');
            } else {
                time = $(dom).attr('data-time')
            }
            var data = g_todos[time];
            g_cache.closeTopCustom = () => {

            }
            $('#modal-top').find('.modal-title').html(_l('弹出_代办_修改'));
            var d = $(g_todo.getHtml_task('todo_create,' + time, _l('弹出_代办_修改_按钮_确定')));
            d.find('option[value="' + (data.priority || 'default') + '"]').prop('checked', true);
            d.find('#input_task_name').val(data.name);
            d.find('textarea').val(data.desc);

            $('#modal-top').attr('data-type', 'todo_list_item_detail').find('.modal-html').html(d);
            g_todo.initDatepick(data.start, data.end);
            halfmoon.toggleModal('modal-top');
        });

        registerAction('todo_create', (dom, action, params) => {
            var input = $('#input_task_name');
            var name = input.val();
            if (name == '') {
                return input.focus();
            }
            if (action.length == 1) {
                action[1] = new Date().getTime();
            }
            var data = {
                name: name,
                desc: $('#modal-top textarea').val(),
                priority: $('#modal-top select').val(),
                notes: {},
                subTask: {},
            }
            if ($('#datepicker-start').val() != '') {
                data.start = $('#datepicker-start').datepicker().data('datepicker').selectedDates[0].getTime();
            }
            if ($('#datepicker-end').val() != '') {
                data.end = $('#datepicker-end').datepicker().data('datepicker').selectedDates[0].getTime();
            }
            g_todos[action[1]] = data;
            local_saveJson('todos', g_todos);
            halfmoon.toggleModal('modal-top');
            g_todo.initHtml();
        });
    },

    getTasks: () => {
        var now = new Date().getTime();
        var l = {
            未完成: [],
            已完成: [],
            已过期: [],
            已放弃: [],
            未开始: [],
        }
        // 未完成(今日 明日 任意选择) 已完成 已过期 已放弃
        for (var time in g_todos) {
            var v = g_todos[time];
            if (v.finish) {
                l['已完成'].push(time);
            } else
            if (v.giveUp) {
                l['已放弃'].push(time);
            } else
            if (v.end && now >= v.end) {
                l['已过期'].push(time);
            } else
            if (v.start && now < v.start) {
                l['未开始'].push(time);
            } else {
                l['未完成'].push(time);
            }
        }
        return l;
    },

    initHtml: () => {
        var l = g_todo.getTasks();
        var h = '<div class="collapse-group w-full">';
        for (var type in l) {
            var cnt = l[type].length;
            h += `<details data-type="` + type + `" class="collapse-panel"` + (type == '未完成' && cnt > 0 ? ' open' : '') + `>
                    <summary class="collapse-header">
                        <strong class="font-size-20">` + _l(type) + `</strong>
                        <div class="dropdown" style="z-index: 2;position: absolute;right: 20px;" >
                            <i data-toggle="dropdown"  class="fa fa-ellipsis-h" aria-hidden="true" onclick="event.preventDefault(true);doAction(this, 'todo_list_more,` + time + `')"></i> 
                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item">` + _l('代办_统计') + `</a>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-content">
                              <button class="btn btn-block btn-danger" data-action="todo_clear,` + type + `" type="button">` + _l('代办_删除') + `</button>
                            </div>
                          </div>
                        </div>

                        <br />
                        <span class="text-muted task_cnt" data-value="` + cnt + `">` + (cnt > 0 ? _l('任务总数', cnt) : _l('无任务')) + `</span>
                    </summary>
                    <div class="collapse-content">`;
            // ，预计需要<span class='badge badge-primary text-center m-5'>2小时</span>
            for (var time of l[type]) {
                h += g_todo.getTaskHtml(time, type);
            }
            if (cnt == 0) {
                h += '<p class="text-muted text-center">' + _l('任务_列表_无任务') + '</p>'
            }
            h += '</details>';
        }
        $('#content_todo .mainContent').html(h + '</div>');
    },
    getTaskHtml: (time, type) => {
        var now = new Date().getTime();
        var v = g_todos[time];
        var id = 'checkbox-' + time;
        var sub = 0;
        for (var sub_time in v.subTask) {
            if (!v.subTask[sub_time].finish) {
                sub++;
            }
        }
        return `<div data-type="` + type + `" data-time="` + time + `" class="custom-checkbox" ` + (v.end >= now ? 'disabled' : '') + `>
                    <input type="checkbox" id="` + id + `" value=""` + (type == '已完成' ? ' checked' : '') + `>
                    <label for="` + id + `" title="`+v.desc+`">` + (v.finish ? '<del>' : '') + v.name + (v.finish ? '</del>' : '') + `</label>
                    ` + g_todo.getPriority(v.priority, true) + g_todo.getDateBadge(type, v, now) + `
<div class="flex-center row border-bottom pb-10" style="margin: 20px;">
                    <i data-action="todo_list_item_detail,` + time + `" class="fa fa-edit col" aria-hidden="true"></i>
                    <i data-action="todo_task_subTask,` + time + `" class="fa fa-tasks col" aria-hidden="true">` + (sub ? '<span class="badge badge-primary ml-5">' + sub + '</span>' : '') + `</i>

                    <i data-action="todo_task_giveUp,` + time + `" class="fa fa-ban col` + (v.giveUp ? ' text-danger' : '') + `" aria-hidden="true"></i>
                    <i data-action="todo_task_delete,` + time + `" class="fa fa-trash-o text-danger col" aria-hidden="true"></i>
                  </div>
                    </div>
                   
         `;
    },
    getDateBadge: (type, v, now) => {
        switch (type) {
            case '未完成':
                if (v.end > 0) {
                    return '<span class="badge badge-primary mr-10 float-right">' + _l('代办_将会过期', getTime((v.end - now) / 1000)) + '</span>';
                }
                break;
            case '未开始':
                return '<span class="badge badge-secondary mr-10 float-right">' + _l('代办_即将开始', getTime((v.start - now) / 1000)) + '</span>';
        }
        return '';
    },
    getPriority: (priority, right = false) => {
        return '<span class="badge badge-' + priority + (right ? ' float-right' : '') + '">' + _l('priority_' + priority) + '</span>'
    }
}

g_todo.preInit();