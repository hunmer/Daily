var g_active = {
    preInit: () => {
        $(`
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,active">
                    <span class="sidebar-icon">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_时间线_标题') + `
            </a>

            `).appendTo('.sidebar-menu');
    },
    init: () => {

        if (g_active.inited) return;
        g_active.inited = true;
        g_actives = local_readJson('actives', {
            // 2021_9_14: {
            //     1631543192063: {
            //         desc: '',
            //         tags: ['画画'],
            //         end: 1631543193063,
            //     }
            // }
        });

       

        g_tags = local_readJson('tags', {
            tags: {
                画画: {
                    desc: '画画desc',
                    color: 'var(--primary-color)',
                    createAt: 1631543192063,
                    group: ['学习'],
                },
                吃饭: {
                    desc: '吃饭',
                    color: 'var(--danger-color)',
                    createAt: 1631543192063,
                    group: ['日常'],
                },
            },
            groups: {
                日常: {
                    desc: '日常',
                    createAt: 1631543192063,  
                },
                学习: {
                    desc: '热爱学习',
                    createAt: 1631543192063,  
                }
            }
        });

        $(`<div id='content_active' class="_content hide  h-full">
            <div class="row bg-light-lm bg-very-dark-dm p-5">
                <div class="col-auto">
                    <button data-action="active_prevDate" class="btn" type="button">`+_l('活动_前一天')+`</button>
                </div>
                <div class="col text-center">
                    <input data-action="active_setDate" type="text" id="timepicker_actives" class="form-control timepicker text-center mx-auto" style="width: 125px;" readonly placeholder="`+_l('活动_选择日期')+`">
                </div>
                <div class="col-auto  text-right">
                    <button data-action="active_nextDate" class="btn" type="button">`+_l('活动_后一天')+`</button>
                </div>
              </div>
            

            <div class="mainContent mt-10"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="active_add" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            </div>`).appendTo('.content-wrapper');
        g_active.registerActions();
        registerContextMenu('.badge_tag', (dom, event) => {
            doAction(dom, 'tag_add,' + $(dom).text());
        });
        registerContextMenu('.active_alert', (dom, event) => {
            doAction(dom, 'active_add,' + $(dom).attr('data-time'));
        });
        g_active.initLast();
        g_active.initCss();
                    g_active.initBottom();
        g_active.timeline_to();
    },
    initLast: () => {
        return g_active.lastTime;
        var today = new Date();
        var today_last = new Date().setHours(0, 0, 0, 0);
         if (g_config.active_last) {
            var last = new Date(g_config.active_last);
            if(last.getDate() != today.getDate()){ // 天数不同
                g_config.active_last = today_last;
                local_saveJson('config', g_config);
            }
        }
        return g_config.active_last || today_last;
    },
    initCss: () => {
        insertStyle(`
            .timeline_dot {
                position: absolute;
                top: -8px;
                z-index: 2;
                left: 8px;
                border-radius: 50%;
                width: 15px;
                height: 15px;
                border: 3px solid white;
            }

            .timeline_line {
                position: absolute; top:-5px;left: 10px;width: 10px;height: 100px;border-radius: 10px;
            }

            `)

    },
    getHTML_active_create: () => {
        return `
        <div class="position-relative">
        <button class="btn btn-primary" style="position: absolute;left: 10px; top: -50px;" data-action="timepicker_reset">`+_l('活动_时间_重置')+`</button>
        <button class="btn btn-primary" style="position: absolute;right: 10px; top: -50px;" data-action="timepicker_now">`+_l('活动_时间_现在')+`</button>

        <div id="time_picker"></div>


         <div class="bg-light-lm bg-very-dark-dm p-5" id="div_tag">
             <div class="row">
                <div class="col-4">
                    <button data-action="tag_add" class="btn" type="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
                <div class="col-4 text-center" id="div_tag_dropdown">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control w-75 float-right" placeholder="search" oninput="g_active.searchTag(this.value);">
                </div>
            </div>

            <div id="tag_list" class="row mt-10"></div>
        </div>

         <div class="row p-10">
            <div id="time_picker" class="col-12"></div>
            <input type="text" id="active_input" class="form-control col-9" placeholder="`+_l('活动_备注')+`" onkeydown="if(event.keycode == 13) $('[data-action=timeline_addLog]').click()">
            <button class="btn btn-primary col-3" data-action="timeline_addLog">`+_l('活动_保存')+`</button>
       </div>
       </div>`;
    },
    getHTML_create: (edit) => {
        var h = `<div class="d-flex mt-10 mb-10 position-relative" style="justify-content: space-between;">`;
        if(edit != ''){
            h += `<button class="btn btn-danger" style="position: absolute;right: 10px; top: -50px;" data-action="tag_delete"><i class="fa fa-trash-o" aria-hidden="true"></i></button>`;
        }
         for(var color of ['#636e72', '#fd79a8', '#ff7675', '#fab1a0', '#ffeaa7', '#b2bec3', '#6c5ce7', '#0984e3', '#00cec9','#00b894']){
            h += `<div data-action="tag_select_color,`+color+`" class="rounded-circle color-dot" style="background-color: `+color+`;"></div>`;
         }
         h+=`<input type="color" onchange="doAction(this, 'tag_select_color');"></div>`;

        h+= `
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_标签_新建_名称_标题') + `</span>
                  </div>
                   <input id="input_tag_name" type="text" class="form-control" placeholder="` + _l('弹出_标签_新建_名称_默认') + `">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_标签_新建_注释_标题') + `</span>
                  </div>
                  <textarea class="form-control" placeholder="` + _l('弹出_标签_新建_注释_默认') + `"></textarea>
                </div>
                <button class="btn btn-primary btn-block" data-action="tag_create">` + _l('弹出_标签_' + (edit ? '修改' : '新建') + '_按钮_确定') + `</button>`;
                return h;
    },
    cache: {
        color: '',
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
                 d.append('<span class="badge badge-secondary badge-pill p-0" style="position: absolute;bottom: 0px;right: 0px;">'+days[date]+'</span>');
            }
        }
    }},
    timeline_to: (date) => {
        if(!date) date = new Date();
        var s_date = getFormatedTime(4, date);
        g_active.date = date;
        g_active.initHtml(date);
        $('#timepicker_actives').val(s_date);
    },
    initBottom: () => {
        $('.navbar-fixed-bottom').html(`
            <div id="bottom_active" class="row w-full flex-center toolbar p-10 font-size-20">
               <i data-action="active_multiSelect" class="fa fa-check-square-o col-1" aria-hidden="true"></i>
               <i data-action="active_delete" class="fa fa-trash-o col-1 hide" aria-hidden="true"></i>
            </div>`);
    },
    registerActions: () => {
         registerAction('timepicker_reset', (dom, action, params) => {
            g_active.range.setVal([g_active.min, g_active.max]);
         });

           registerAction('timepicker_now', (dom, action, params) => {
            console.log(g_active.range.getVal()[0], g_active.max);
            g_active.range.setVal([g_active.range.getVal()[0], g_active.max]);
         });
        

         registerAction('active_click', (dom, action, params) => {
            if($('[data-action="active_multiSelect"]').hasClass('text-primary')){
                $(dom).toggleClass('active_selected')
            }
        });
        registerAction('active_multiSelect', (dom, action, params) => {
            var b = $(dom).toggleClass('text-primary').hasClass('text-primary');
            $('.active_selected').removeClass('active_selected');
            $('[data-action="active_delete"]').css('display', b ? 'unset' : 'none');
        });
        
        registerAction('tag_delete', (dom, action, params) => {
             var tag = g_active.editingTag;
            confirm(_l('活动_标签_是否删除', tag)).then((d) => {
                if(d.button == 'ok'){
                    delete g_tags.tags[tag];
                    local_saveJson('tags', g_tags);
                    halfmoon.toggleModal('modal-custom-1');
                    $('[data-action="tag_select,'+tag+'"]').parent('div').remove();
                }
            })
        });
        registerAction('active_delete', (dom, action, params) => {
            var doms = $('.active_selected');
            if(doms.length){
                confirm(_l('活动_是否删除', doms.length)).then((d) => {
                    if(d.button == 'ok'){
                        var cnt = 0;
                        for(var d of doms){
                            d = $(d);
                            if(!d.attr('data-empty')){
                                cnt++;
                                var start = d.attr('data-time');
                                var s_date = getFormatedTime(4, start);
                                delete g_actives[s_date][start];
                            }
                            d.remove();
                        }
                        local_saveJson('actives', g_actives);
                        if(cnt > 0){
                            g_active.timeline_to(g_active.date);
                        }
                    }
                })
            }
        });
        registerAction('active_prevDate', (dom, action, params) => {
              g_active.timeline_to(new Date(g_active.date.getTime() - 86400 * 1000));
        });
        registerAction('active_nextDate', (dom, action, params) => {
              g_active.timeline_to(new Date(g_active.date.getTime() + 86400 * 1000));
        });

        registerAction('active_setDate', (dom, action, params) => {
             var enable = [true];
             var days = {}
             for(var date in g_actives){
                days[date] = Object.keys(g_actives[date]).length;
             }
            for (var date in days) {
                var a = date.split('/');
                a[1]--; // 月 - 1
                enable.push(a);
            }
            $('#timepicker_actives').pickadate({
                disable: enable,
                onSet: function(thingSet) {
                    if(thingSet.select){
                        g_active.timeline_to(new Date(thingSet.select));
                    }else{
                        // 翻页
                        g_active.markToDays(days);
                    }
                },
                onOpen: () => {
                    $('.navbar-fixed-bottom').hide();
                   g_active.markToDays(days);
                },
                onClose: () => {
                    $('.navbar-fixed-bottom').show();
                }
            });
            $('#div_inpuit').hide();
        });
        registerAction('timeline_addLog', (dom, action, params) => {
            if (g_active.editingActive) {
                delete g_actives[getFormatedTime(4, g_active.editingActive)][g_active.editingActive];
            }
            g_active.logTime(g_active.range.getVal());
        });
        registerAction('tag_select', (dom, action, params) => {
            $(dom).toggleClass('tag_selected');
        });
        
        registerAction('tag_select_color', (dom, action, params) => {
            var color = action.length > 1 ? action[1] : dom.value;
            $('.color_active').removeClass('color_active');
            $(dom).addClass('color_active');

            g_active.cache.color = color;
        });
        registerAction('group_select', (dom, action, params) => {
            g_active.initTag(action.length > 1 ? action[1] : $(dom).text());
        });
        
        registerAction('active_add', (dom, action, params) => {
            g_cache.closeTopCustom = () => {}
            $('#modal-custom').find('.modal-title').html(_l('弹出_活动_'+(action.length > 1 ? '修改' : '新建')));
            $('#modal-custom').attr('data-type', 'active_add').find('.modal-html').html(g_active.getHTML_active_create());
            g_active.initTag();


            // 补
            if($(dom).attr('data-empty')){
                 g_active.initTimePicker([new Date(parseInt(dom.attr('data-time'))), new Date(parseInt(dom.attr('data-end')))]);
            }else
            if (action.length > 1) {
                var time = parseInt(action[1]);
                g_active.editingActive = time;
                var date = getFormatedTime(4, time);

                var data = g_actives[date][time];
                $('#modal-custom input').val(data.desc);
                for(var tag of data.tags){
                    var d = g_tags.tags[tag] || {desc: '', color: ''};
                    var badge = $('[data-action="tag_select,'+tag+'"]');
                    if(!badge.length) badge = $(g_active.getHtml_tag(tag, d.desc, d.color)).appendTo('#tag_list');
                    badge.addClass('tag_selected');
                }
                 g_active.initTimePicker([new Date(time), new Date(parseInt(data.end))]);
            }else{
                g_active.editingActive = undefined;
                 g_active.initTimePicker();
            }
            halfmoon.toggleModal('modal-custom');
        });


        registerAction('tag_add', (dom, action, params) => {
            var edit = action.length > 1;
            g_cache.closeTopCustom = () => {}
            $('#modal-custom-1').find('.modal-title').html(_l('弹出_标签_'+(edit ? '修改' : '新建')));
            $('#modal-custom-1').attr('data-type', 'tag_add').find('.modal-html').html(g_active.getHTML_create(edit));

            if (edit) {
                g_active.editingTag = action[1];
                var data = g_tags.tags[action[1]];
                $('#input_tag_name').val(action[1]);
                $('#modal-custom-1 textarea').val(data.desc);
                var dot = $('[data-action="tag_select_color,'+data.color+'"]');
                if(dot.length){
                    dot.addClass('color_active');
                }else{
                    $('#modal-custom-1 input[type=color]').addClass('color_active').val(data.color);
                }
            }else{
                g_active.editingTag = undefined;
            }
            halfmoon.toggleModal('modal-custom-1');
        });
         registerAction('tag_create', (dom, action, params) => {
            var input = $('#input_tag_name');
            var name = input.val();
            if (name == '') {
                return input.focus();
            }
            input = $('#datepicker-start')
            if (input.val() == '') return input.focus();
            var data = {
                color: g_active.cache.color,
                desc: $('#modal-custom-1 textarea').val(),
                
            }
            if (g_active.editingTag) {
                var old = g_active.editingTag;
                data = Object.assign(g_tags.tags[old], data);
                delete g_tags.tags[old];
            } else {
                data.createAt = new Date().getTime();
                data.group = [];
            }
            g_tags.tags[name] = data;
            local_saveJson('tags', g_tags);
            delete g_active.editingTag;
            halfmoon.toggleModal('modal-custom-1');
            g_active.initTag();
        });

    },
    searchTag: (s) => {
        for(var badge of $('.badge_tag')){
            $(badge).parent().css('display', badge.innerText.indexOf(s) != -1 ? 'unset' : 'none');
        }
    },
    getHtml_tag: (tag, desc = '', color = '') => {
        return `<div class="col-auto p-10">
                <span data-action="tag_select,`+tag+`" class="badge badge_tag text-light" style="font-weight:bold;background-color: `+color+';" title="'+desc+'">'+tag+`</span>
            </div>`;
    },
    initTag: (group_selected = '') =>{
        var h = '';
         for(var tag in g_tags.tags){
            var d = g_tags.tags[tag];
            if(group_selected != '' && d.group.indexOf(group_selected) == -1){
                continue;
            }
            h += g_active.getHtml_tag(tag, d.desc, d.color);
        }
        $('#div_tag #tag_list').html(h);

        h= `
        <div class="dropdown with-arrow">
          <button class="btn dropdown_btn" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">`+(group_selected || 'All')+`<i class="fa fa-angle-down ml-5" aria-hidden="true"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-center">
               <h6 data-action="group_select," class="dropdown-header">All</h6>
        `;

        for(var group in g_tags.groups){
            // var d = g_tags.groups[tag];
            h += `
            <a data-action="group_select" class="dropdown-item`+(group == group_selected ? ' bg-primary' : '')+`">`+group+`</a>`
        }
        h+=`<div class="dropdown-divider"></div>
            <div class="dropdown-content">
              <button class="btn btn-block" type="button">Button</button>
            </div>
          </div>
        </div>
       `;
        $('#div_tag #div_tag_dropdown').html(h);
   },
    initTimePicker: (range = []) => {
        var initTime = (event, inst) => {
            var times = inst.getVal();
            if(times.length == 2 && times[0] && times[1]){
                $('#modal-custom').find('.modal-title').html(getTime1((times[1].getTime() - times[0].getTime()) / 1000));
            }
                
        }
        var today = new Date();
        var opt = {
            theme: g_config.darkMode ? 'material-dark' : 'material',
            display: 'inline',
            headerText: '开始',
            lang: 'ja',
            width: $(window).width(),
            controls: ['time'],
            rows: 3,
            onChange: (event, inst) => {
                initTime(event, inst);
            },
            onShow: (event, inst) => {
                initTime(event, inst);
            }
        };
       opt.max = today;
        if(!range.length){ // 新建
            opt.min = new Date(g_active.initLast());
            opt.defaultValue = [opt.min, opt.max];
        }else{
            opt.defaultValue = range;
        }

        g_active.min = opt.min;
        g_active.max = opt.max;

        g_active.range = mobiscroll.range('#time_picker', opt);
    },

    logTime: (vals) => {
        var badges = $('.tag_selected');
        if(badges.length == 0){
            toastPAlert(_l('没有选择标签'), 'alert-danger');
            return;
        }
        var start = vals[0].getTime();
        var end = vals[1].getTime();

        var date = getFormatedTime(4, start);
        for(var start1 in g_actives[date]){
            if(start > start1 && end <= g_actives[date][start1].end){
             toastPAlert(_l('错误的时间'), 'alert-danger');
             return;
            }
        }

        g_config.active_last = end;
        local_saveJson('config', g_config);

        if (!g_actives[date]) g_actives[date] = {};

        var data = {
            tags: [],
            end: end,
        }
        for(var badge of badges){
            data.tags.push(badge.innerText);
        }
        var desc = $('#active_input').val();
        if(desc != ''){
            $('#active_input').val('');
            data.desc = desc;
        }
        console.log(data);
        g_actives[date][start] = data;
        local_saveJson('actives', g_actives);
        halfmoon.toggleModal('modal-custom');
       g_active.timeline_to();

    },
    initHtml: (date) => {
        var h = '';
        var s_date = getFormatedTime(4, date);
        g_active.lastTime = date.setHours(0, 0, 0, 0);
        if (g_actives[s_date]) {
            for (var time of Object.keys(g_actives[s_date]).sort(function(a, b) {
                return a-b;
            })) {
                h = g_active.getHtml(time, g_actives[s_date][time]) + h;
            }
        }
        $('#content_active .mainContent').html(h);
    },
    getHtml: (time, data, empty = false) => {
        var h = `
        <div data-action="active_click" class="position-relative mb-10 active_alert" data-time="`+time+`" data-end="`+data.end+`" `+(empty ? 'data-empty=true' : '')+`>
            <div class="timeline_dot">
            </div>
             <div class="bg-`+(empty ? 'danger' : 'primary')+` timeline_line">
            </div>
            <div class="alert alert-`+(empty ? 'danger' : 'primary')+`" style="position: relative;left: 35px;    max-width: calc(100% - 40px);">
                  <h4 class="alert-heading">`+getFormatedTime(0, time)+ ' - ' + getFormatedTime(0, data.end)+`</h4>
                  <span class="text-muted float-right">`+getTime1((data.end - time) / 1000)+`</span>
                  `+(data.desc || '')+`
                  <div class="active_alert_tags">`;
        for(var tag of data.tags){
            var d = g_tags.tags[tag] || {color: 'darkgrey'}
            h += `<span class="badge mr-10 text-light" style="background-color: `+d.color+`">`+tag+`</span>`;
        }
        h+=`</div></div>
        </div>`;
        if(!empty){
             if(Math.abs(time - g_active.lastTime) >= 5 * 60 * 1000){
                h += g_active.getHtml(g_active.lastTime, {
                    end: time,
                    desc: _l('活动_补充文本'),
                    tags: []
                }, true);
            }
        }
        g_active.lastTime = data.end;

        return h;
    }
}

g_active.preInit();