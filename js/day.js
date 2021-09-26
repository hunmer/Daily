var g_day = {
    // todo 不指定年的话 超过的话年数+1
    preInit: () => {
        $(`
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,day">
                    <span class="sidebar-icon">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_纪念日_标题') + `
            </a>

            `).appendTo('.sidebar-menu');
    },
    init: () => {
        if (g_day.inited) return;
        g_day.inited = true;
        g_days = local_readJson('days', {
    // 1628611200000: {
    //     name: '开学',
    //     notes: {},
    //         icon: 'img/school.png',
    //         desc: "开学噩梦",
    //     }
});

        $(`<div id='content_day' class="_content hide">
            <div class="mainContent row"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="day_add" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            </div>`).appendTo('.content-wrapper');

        g_day.registerActions();
        g_day.initHtml();
    },
    initHtml: () => {
        var h = '';
        var n = new Date().getTime();
        for (var time of Object.keys(g_days).sort(function(a, b) {
            return g_days[b].pin - g_days[a].pin || Math.abs(a - n) - Math.abs(b - n);
        })) {
            h += g_day.getHtml(time);
        }
        $('#content_day .mainContent').html(h);
    },

    getHTML_create: (time) => {
        return `
       
                    <div class="position-relative mx-auto w-fit mb-10">
                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                          <div class="btn-group dropdown with-arrow" role="group">
                                <div id='img_day_add_icon' class="_icon icon_selecter" data-toggle="dropdown">
                                    <i class="fa fa-edit mx-auto font-size-20" aria-hidden="true" style="line-height: 55px;" data-icon="fa-edit"></i>
                                    <img class="rounded-circle content-fit" style="display:none" src="./img/maki.jpg">
                                </div>
                            <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-icon">
                              <a onclick="g_choose.icon.init();" class="dropdown-item">`+_l('图标')+`</a>
                              <a data-action="day_setIcon_text" class="dropdown-item">`+_l('文字')+`</a>
                              <a data-action="day_setIcon_img" class="dropdown-item">`+_l('图片')+`</a>
                            </div>
                          </div>
                        </div>

                    </div>
                    
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_纪念日_新建_名称_标题') + `</span>
                  </div>
                   <input id="input_day_name" type="text" class="form-control" placeholder="` + _l('弹出_纪念日_新建_名称_默认') + `">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_纪念日_新建_注释_标题') + `</span>
                  </div>
                  <textarea class="form-control" placeholder="` + _l('弹出_纪念日_新建_注释_默认') + `"></textarea>
                </div>

                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_纪念日_日期') + `</span>
                  </div>
                  <input readonly="true" type='text' id='datepicker-start' class="form-control datepicker-here text-center" placeholder="` + _l('弹出_纪念日_日期提示') + `" />
                  <div class="input-group-append">
                    <button class="btn btn-danger" type="button" onclick="$('#datepicker-start').datepicker().data('datepicker').clear();">` + _l('弹出_纪念日_关闭日期选择') + `</button>
                  </div>
                </div>
                <button class="btn btn-primary btn-block" data-action="day_create">` + _l('弹出_纪念日_' + (name != '' ? '修改' : '新建') + '_按钮_确定') + `</button>`;
    },
    registerActions: () => {

        registerAction('day_setIcon_text', (dom, action, params) => {
            prompt('input text/emoji', '😀').then((d) => {
                var s = (d.text == '' ? $('#input_day_name').val() : d.text).substr(0, 2);
                var i = $('#img_day_add_icon i');
                i.attr('data-text', d.text).removeClass(i.attr('data-icon')).html(s).show();
                $('#img_day_add_icon img').hide();
            });
        });

        registerAction('day_setIcon_img', (dom, action, params) => {
            $('#input_img').attr('data-type', 'icon').click();
        });


        registerAction('day_pin', (dom, action, params) => {
            var b = $(dom).toggleClass('text-secondary').hasClass('text-secondary');
            g_days[action[1]].pin = b ? new Date().getTime() : 0;
            local_saveJson('days', g_days);
            g_day.initHtml();
        });
          registerAction('day_delete', (dom, action, params) => {
            confirm(_l('纪念日_是否删除')).then((d) => {
                if (d.button == 'ok') {
                    delete g_days[action[1]];
                    local_saveJson('days', g_days);
                    g_day.initHtml();

                }
            });
        });

        registerAction('day_add', (dom, action, params) => {
            var time = action[1] || '';
            g_day.editingId = time;
            g_cache.closeTopCustom = () => {
                delete g_day.editingId;
            }
            $('#modal-top').find('.modal-title').html(_l('弹出_纪念日_新建'));
            $('#modal-top').attr('data-type', 'day_add').find('.modal-html').html(g_day.getHTML_create(time));
            if (time != '') {
                var data = g_days[time];
                $('#input_day_name').val(data.name);
                $('#modal-top textarea').val(data.desc);
                var i = $('#img_day_add_icon i');
                if (data.icon.substr(0, 5) == 'data:' || ['.jpg', '.png'].indexOf(data.icon.substr(-4).toLowerCase()) != -1) {
                    $('#img_day_add_icon img').attr('src', data.icon).show();
                    i.hide();
                } else
                if (data.icon.substr(0, 3) == 'fa-') {
                    i.removeClass(i.attr('data-icon')).addClass(data.icon).attr('data-icon', data.icon);
                } else {
                    i.removeClass(i.attr('data-icon')).attr('data-icon', null).html(data.icon);
                }
            }
            g_day.initDatepick(time);
            halfmoon.toggleModal('modal-top');
        });

        registerAction('day_create', (dom, action, params) => {
            var input = $('#input_day_name');
            var name = input.val();
            if (name == '') {
                return input.focus();
            }
            input = $('#datepicker-start')
            if (input.val() == '') return input.focus();
            var time = $('#datepicker-start').datepicker().data('datepicker').selectedDates[0].getTime();
            var data = {
                name: name,
                icon: getIconValue($('#img_day_add_icon')),
                desc: $('#modal-top textarea').val(),
            };
            if (g_day.editingId) {
                var old = g_day.editingId;
                data = Object.assign(g_days[old], data);
                delete g_days[old];
            } else {
                data.notes = {};
            }
            g_days[time] = data;
            local_saveJson('days', g_days);
                delete g_day.editingId;
            halfmoon.toggleModal('modal-top');
            g_day.initHtml();
        });
    },

    initDatepick: (start) => {
        $('#datepicker-start').datepicker({
            timepicker: true,
            language: 'ja',
            autoClose: true,
            todayButton: new Date(),
        });
        if (start) {
            $('#datepicker-start').datepicker().data('datepicker').selectDate(new Date(parseInt(start)));
        }

        //g_todo.datapick_ceil();
    },


    getHtml: (time) => {
        var data = g_days[time];
        var t = (time - new Date().getTime()) / 1000;
        var icon = getIconStr(data.icon, name);
        return `
        <div class="col-6 mb-10">
            <div class="card position-relative h-200" >
                <i style="position: absolute;left: 10px;top: 10px;" data-action="day_pin,` + time + `" class="fa fa-star`+(data.pin ? ' text-secondary' : '-o')+`" aria-hidden="true"></i> 
                <div class="dropdown" style="z-index: 2;position: absolute;right: 10px;top: 10px;" >
                    <i data-toggle="dropdown" class="fa fa-ellipsis-h" aria-hidden="true"></i> 
                  <div class="dropdown-menu dropdown-menu-center">
                    <a class="dropdown-item" data-action="day_add,` + time + `">` + _l('纪念日_编辑') + `</a>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-content">
                      <button class="btn btn-block btn-danger" data-action="day_delete,` + time + `" type="button">` + _l('纪念日_删除') + `</button>
                    </div>
                  </div>
                </div>
                <div data-action="daily_card_switch">
                <div class='cardContent contnet_1 show'>
                    <div class="text-center">
                        ` + icon + `
                        <h5>` + data.name + `</h5>

                        <span style="position: absolute;left: 15px;">` +  _l((t > 0 ? '还有' : '已过')) + `</span>
                      <span style="font-size: 3rem;position: absolute;bottom: 10px;right: 10px;">` + getTime1(Math.abs(t)) + `</span>
                    </div>
                    
                </div>
                <div class='cardContent contnet_2 hide mt-5'>
                    <h2 class="card-title">
                        ` + data.name + `
                    </h2>
                    <p class="text-muted">
                        ` + data.desc + `
                    </p>
                    
                </div>
                </div>
            </div>
        </div>`;
 /*<div style="position: absolute;bottom: 10px;right: 10px;">
                        <a class="btn">detail</a>
                    </div>*/

    }
}

g_day.preInit();