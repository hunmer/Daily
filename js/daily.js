var g_daily = {
    preInit: () => {
        $(`
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,daily">
                    <span class="sidebar-icon">
                        <i class="fa fa-inbox" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_日常_标题') + `
            </a>
            `).appendTo('.sidebar-menu');
    },
    init: () => {
        if (g_daily.inited) return;
        g_daily.inited = true;
        g_dailys = local_readJson('dailys', {
    // 1631370956990: {
    //   name: '喝水',
    //   icon: 'img/book_reading.png',
    //   desc: "每日喝水",
    //   tags: ["日常"],
    //   progress: {
    //     1631368203153: {
    //       text: "a",
    //       value: 5,
    //     }
    //   },
    //   maxProgress: 3,
    //   range: 86400,
    //   resetAt: 1631368203153 + 86400 * 1000,
    // }
  });
        $(`<div id='content_daily' class="_content hide h-full">
        <div class="mainContent row"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="daily_add" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>

        </div>`).appendTo('.content-wrapper');

        g_daily.registerActions();
        g_daily.initHtml();
    },
    initHtml: () => {
        var h = '';
          for (var time of Object.keys(g_dailys).sort(function(a, b) {
            return g_dailys[b].pin - g_dailys[a].pin || b - a;
        })) {
            h += g_daily.getHtml(time);
        }
        $('#content_daily .mainContent').html('<div class="row w-full">' + h + '</div>');
    },
    addProgress: (time, add) => {
        add = parseInt(add);
        if(isNaN(add)) return;
        if (add == 0) return;
        var div = $('[data-time="' + time + '"]');
        // var max = g_dailys[time]['maxProgress'] - g_daily.getNowProgress(time).value;
        // if (add > max) add = max;

        var now = new Date().getTime();
        g_dailys[time]['progress'][now] = {
            text: '',
            value: add,
        }

        local_saveJson('dailys', g_dailys);
        div.replaceWith(g_daily.getHtml(time));
        startVibrate(25);
    },
    getHTML_create: (time) => {
        return `
            <div class="position-relative mx-auto w-fit mb-10">
                        <div class="btn-group" role="group">
                          <div class="btn-group dropdown with-arrow" role="group">
                                <div id='img_daily_add_icon' class="_icon icon_selecter" data-toggle="dropdown">
                                    <i class="fa fa-edit mx-auto font-size-20" aria-hidden="true" style="line-height: 55px;" data-icon="fa-edit"></i>
                                    <img class="rounded-circle content-fit" style="display:none" src="./img/maki.jpg">
                                </div>
                            <div class="dropdown-menu dropdown-menu-center" aria-labelledby="dropdown-toggle-btn-icon">
                              <a onclick="g_choose.icon.init();" class="dropdown-item">` + _l('图标') + `</a>
                              <a data-action="day_setIcon_text" class="dropdown-item">` + _l('文字') + `</a>
                              <a data-action="day_setIcon_img" class="dropdown-item">` + _l('图片') + `</a>
                            </div>
                          </div>
                        </div>
                        </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_日常_新建_名称_标题') + `</span>
                  </div>
                   <input id="input_daily_name" type="text" class="form-control" placeholder="` + _l('弹出_日常_新建_名称_默认') + `">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_日常_新建_注释_标题') + `</span>
                  </div>
                  <textarea class="form-control" placeholder="` + _l('弹出_日常_新建_注释_默认') + `"></textarea>
                </div>
               
               <div class="row mb-10">
                 <div class="input-group col">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_日常_总进度_标题') + `</span>
                  </div>
                   <input id="input_daily_maxProgress" type="number" class="form-control" placeholder="` + _l('弹出_日常_总进度_默认') + `">
                </div>
                <div class="input-group col">
                   <input id="input_daily_range" type="number" class="form-control" placeholder="` + _l('弹出_日常_刷新间隔_默认') + `" >
                   <div class="input-group-append">
                    <span class="input-group-text">` + _l('弹出_日常_刷新间隔_单位') + `</span>
                  </div>
                </div>
              </div>

                <button class="btn btn-primary btn-block" data-action="daily_create">` + _l('弹出_日常_' + (name != '' ? '修改' : '新建') + '_按钮_确定') + `</button>`;
    },
    registerActions: () => {
      registerAction('daily_pin', (dom, action, params) => {
            var b = $(dom).toggleClass('text-secondary').hasClass('text-secondary');
            g_dailys[action[1]].pin = b ? new Date().getTime() : 0;
            local_saveJson('dailys', g_dailys);
            g_daily.initHtml();
        });

        registerAction('daily_addProgress', (dom, action, params) => {
            var time = $(dom).parents('[data-time]').attr('data-time');
            var i;
            if (action.length == 1) {
                prompt(_l('输入进度'), 10, {numberOnly: 1}).then((d) => {
                    if (d.text != '') {
                        g_daily.addProgress(time, d.text)
                    }
                });
            } else {
                g_daily.addProgress(time, action[1]);
            }
        });

        registerAction('progress_delete', (dom, action, params) => {
            confirm(_l('日常_是否删除')).then((d) => {
                if (d.button == 'ok') {
                    delete g_dailys[action[1]];
                    local_saveJson('dailys', g_dailys);
                    g_daily.initHtml();
                }
            });
        });

        registerAction('daily_add', (dom, action, params) => {
            var time = action[1] || '';
            g_daily.editingId = time;
            g_cache.closeTopCustom = () => {
                delete g_daily.editingId;
            }
            $('#modal-top').find('.modal-title').html(_l('弹出_日常_新建'));
            $('#modal-top').attr('data-type', 'day_add').find('.modal-html').html(g_daily.getHTML_create(time));
            if (time != '') {
                var data = g_dailys[time];
                $('#input_daily_name').val(data.name);
                $('#modal-top textarea').val(data.desc);
                $('#input_daily_maxProgress').val(data.maxProgress);
                $('#input_progress_daily').val(data.daily);
                $('#input_daily_range').val(data.range / 86400);
                var i = $('#img_daily_add_icon i');
                if (data.icon.substr(0, 5) == 'data:' || ['.jpg', '.png'].indexOf(data.icon.substr(-4).toLowerCase()) != -1) {
                    $('#img_daily_add_icon img').attr('src', data.icon).show();
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

        registerAction('daily_create', (dom, action, params) => {
            var a = checkInputValue([$('#input_daily_name'), $('#input_daily_maxProgress'), $('#input_daily_range')]);
            if (!a) return;
            var data = {
                name: a[0],
                desc: $('#modal-top textarea').val(),
                maxProgress: a[1],
                icon: getIconValue($('#img_daily_add_icon')),
                range: a[2] * 86400,
            };

            var key;
            if (g_daily.editingId) {
                key = g_daily.editingId;
                data = Object.assign(g_dailys[g_daily.editingId], data);
            } else {
                key = new Date().getTime();
                data.progress = {};
            }
            g_dailys[key] = data;
            local_saveJson('dailys', g_dailys);

            delete g_daily.editingId;
            halfmoon.toggleModal('modal-top');
            g_daily.initHtml();
        });

        registerAction('day_setIcon_text', (dom, action, params) => {
            prompt('input text/emoji', '😀').then((d) => {
                var s = (d.text == '' ? $('#input_day_name').val() : d.text).substr(0, 2);
                var i = $('#img_daily_add_icon i');
                i.attr('data-text', d.text).removeClass(i.attr('data-icon')).html(s).show();
                $('#img_daily_add_icon img').hide();
            });
        });

        registerAction('day_setIcon_img', (dom, action, params) => {
            $('#input_img').attr('data-type', 'icon').click();
        });

    },

    getNowProgress: (data, time) => {
        if (typeof(data) != 'object') {
            time = data;
            data = g_dailys[data];
        }

        var date = new Date();
        var now = date.getTime();
        var value = 0;
        var cnt = 0;

        if (now >= data.resetAt) { // 超过重置时间
            var d = new Date();
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            g_dailys[time].resetAt = d.getTime() + data.range;
            local_saveJson('dailys', g_dailys);
            console.log('超过重置时间');
        } else {
            for (var t in data.progress) {
                if ((now - t) / 1000 <= data.range) {
                    cnt++;
                    value += data.progress[t].value;
                }
            }
        }
        return { value: value, cnt: cnt };
    },

    getHtml: (time) => {
        var data = g_dailys[time];
        var progress = g_daily.getNowProgress(data, time);
        var p = progress.value / data.maxProgress * 100;

        // 获取连续打卡
        var times = Object.keys(data.progress);
        var last = new Date().getTime();
        var signed = [];
        for(var i=times.length-1;i>=0;i--){
          if(last - times[i] <= 86400 * 1000){
            var date = getFormatedTime(4, times[i]);
            if(signed.indexOf(date) == -1){
              signed.push(date);
            }
            last = times[i];
          }else{
            break;
          }
        }

        return `
        <div class="col-6 h-200 mb-10" data-time="` + time + `">
            <div class="card position-relative h-full">
            <h2 data-toggle="tooltip" data-title="`+signed.join(' , ')+`" data-placement="bottom" class="text-muted" style="position: absolute;bottom: -22px;right: 5px;">` + signed.length + `</h2>
            <i style="position: absolute;left: 10px;top: 10px;" data-action="daily_pin,` + time + `" class="fa fa-star`+(data.pin ? ' text-secondary' : '-o')+`" aria-hidden="true"></i> 
              <div class="dropdown" style="z-index: 2;position: absolute;right: 10px;top: 10px;" >
                  <i data-toggle="dropdown" class="fa fa-ellipsis-h" aria-hidden="true"></i> 
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" data-action="daily_add,` + time + `">` + _l('日常_编辑') + `</a>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-content">
                      <button class="btn btn-block btn-danger" data-action="progress_delete,` + time + `" type="button">` + _l('日常_删除') + `</button>
                    </div>
                  </div>
                </div>
            <div class="h-full ">
                 

                <div class='cardContent contnet_1 show'>
                    <div class="text-center">
                    ` + getIconStr(data.icon, name) + `
                        <h5 data-action="daily_card_switch">` + data.name + `</h5>
                    </div>
                    <div class="progress h-25 w-full position-relative">
                      <h5 class="` + (p > 50 ? 'text-light' : 'text-muted') + ` text-center" data-action="daily_addProgress" style="position: absolute;width: 100%;top: 3px;">` + progress.value + '/' + data.maxProgress + `</h5>
                      <i data-action="daily_addProgress,-1" class="fa fa-minus text-muted" aria-hidden="true" style="position: absolute;left: 7px;top: 3px;font-size: 2rem;"></i>

                        <div class="progress-bar w-three-quarter rounded-0 bg-primary" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ` + p + `% !important;"></div>
                        <i data-action="daily_addProgress,1" class="fa fa-plus text-muted" aria-hidden="true" style="position: absolute;right: 7px;top: 3px;font-size: 2rem;"></i>
                    </div>
                </div>
                <div class='cardContent contnet_2 hide h-full mt-10' data-action="daily_card_switch">
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
    }
}

g_daily.preInit();