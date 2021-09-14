var g_progress = {
    preInit: () => {
        $(`
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,progress">
                    <span class="sidebar-icon">
                        <i class="fa fa-blind" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_进度_标题') + `
            </a>
            `).appendTo('.sidebar-menu');
    },
    init: () => {
        if (g_progress.inited) return;
        g_progress.inited = true;
          g_progressData = local_readJson('progress', {
          //   1631370956980: {
          //     name: '女の子のカラダの描き方',
          //     desc: "女の子のカラダの描き方",
          //     tags: ["语言", "阅读", "翻译"],
          //     endAt: 1631380956980,
          //     progress: {
          //       1631377505125: {
          //         text: "b",
          //         value: 10,
          //       },
          //       1631377626806: {
          //         text: "b",
          //         value: 5,
          //       },
          //     },
          //     maxProgress: 175,
          //     daily: 30,
          //     range: 86400,
          //   },
            
          // });
        });
                  
        $(`<div id='content_progress' class="_content hide h-full">
        <div class="mainContent row"></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="progress_add" class="btn btn-square btn-primary rounded-circle btn-lg" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>

        </div>`).appendTo('.content-wrapper');

        g_progress.registerActions();
        g_progress.initHtml();
    },
    initHtml: () => {
        var h = '';
        for (var time in g_progressData) {
            h += g_progress.getHtml(time);
        }
        $('#content_progress .mainContent').html('<div class=" w-full">' + h + '</div>');
    },
    addProgress: (time, add) => {
        add = parseInt(add);
        if(isNaN(add)) return;
        var div = $('[data-time="' + time + '"]');
        var max = g_progressData[time]['maxProgress'];
        if(max > 0){
          max = max - g_progress.getNowProgress(time).value;
          if (add > max) add = max;
        }
        if (add == 0) return;


        var now = new Date().getTime();
        g_progressData[time]['progress'][now] = {
            text: '',
            value: add,
        }
        local_saveJson('progress', g_progressData);
        div.replaceWith(g_progress.getHtml(time));
        startVibrate(25);
    },
    getHTML_create: (time) => {
        return `
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_进度_' + (time != '' ? '修改' : '新建') + '_名称_标题') + `</span>
                  </div>
                   <input id="input_day_name" type="text" class="form-control" placeholder="` + _l('弹出_进度_新建_名称_默认') + `">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_进度_新建_注释_标题') + `</span>
                  </div>
                  <textarea class="form-control" placeholder="` + _l('弹出_进度_新建_注释_默认') + `"></textarea>
                </div>
               
               <div class="row mb-10">
                 <div class="input-group col">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_进度_总进度_标题') + `</span>
                  </div>
                   <input id="input_progress_maxProgress" type="number" class="form-control" placeholder="` + _l('弹出_进度_总进度_默认') + `">
                </div>
                <div class="input-group col">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_进度_每日进度_标题') + `</span>
                  </div>
                   <input id="input_progress_daily" type="number" class="form-control" placeholder="` + _l('弹出_进度_每日进度_默认') + `" >
                </div>

                <div class="input-group col-3">
                   <input id="input_progress_range" type="number" class="form-control" placeholder="` + _l('弹出_进度_刷新间隔_默认') + `" >
                   <div class="input-group-append">
                    <span class="input-group-text">` + _l('弹出_进度_刷新间隔_单位') + `</span>
                  </div>
                </div>
              </div>

                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_进度_日期') + `</span>
                  </div>
                  <input readonly="true" type='text' id='datepicker-start' class="form-control datepicker-here text-center" placeholder="` + _l('弹出_进度_日期提示') + `" />
                  <div class="input-group-append">
                    <button class="btn btn-danger" type="button" onclick="$('#datepicker-start').datepicker().data('datepicker').clear();">` + _l('弹出_进度_关闭日期选择') + `</button>
                  </div>
                </div>
                <button class="btn btn-primary btn-block" data-action="progress_create">` + _l('弹出_进度_' + (time != '' ? '修改' : '新建') + '_按钮_确定') + `</button>`;
    },
      initDatepick: (start) => {
        $('#datepicker-start').datepicker({
            timepicker: true,
            language: 'ja',
            autoClose: true,
            minDate: new Date(),
            todayButton: new Date(),
        });
        if (start) {
            $('#datepicker-start').datepicker().data('datepicker').selectDate(new Date(parseInt(start)));
        }
    },
    registerActions: () => {
        registerAction('progress_addProgress', (dom, action, params) => {
            var time = $(dom).parents('[data-time]').attr('data-time');
            var i;
            if (action.length == 1) {
                prompt(_l('输入进度'), 10, {numberOnly: 1}).then((d) => {
                    if (d.text != '') {
                        g_progress.addProgress(time, d.text)
                    }
                });
            } else {
                g_progress.addProgress(time, action[1]);
            }
        });

        registerAction('progress_delete', (dom, action, params) => {
            confirm(_l('进度_是否删除')).then((d) => {
                if (d.button == 'ok') {
                    delete g_progressData[action[1]];
                     local_saveJson('progress', g_progressData);

    
                    g_progress.initHtml();
                }
            });
        });

        registerAction('progress_add', (dom, action, params) => {
            var time = action[1] || '';
            g_progress.editingId = time;
            g_cache.closeTopCustom = () => {
                delete g_progress.editingId;
            }
            $('#modal-top').find('.modal-title').html(_l('弹出_进度_新建'));
            $('#modal-top').attr('data-type', 'day_add').find('.modal-html').html(g_progress.getHTML_create(time));
            if (time != '') {
                var data = g_progressData[time];
                $('#input_day_name').val(data.name);
                $('#modal-top textarea').val(data.desc);
                $('#input_progress_maxProgress').val(data.maxProgress);
                $('#input_progress_daily').val(data.daily);
                $('#input_progress_range').val(data.range / 86400);
            }
            g_progress.initDatepick(time);
            halfmoon.toggleModal('modal-top');
        });

        registerAction('progress_create', (dom, action, params) => {
          var a = checkInputValue([$('#input_day_name'), $('#input_progress_maxProgress'), $('#input_progress_daily'), $('#input_progress_range')]);
          if(!a) return;
            var picker = $('#datepicker-start')
            if (picker.val() == '') return picker.focus();

            var data = {
                name: a[0],
                desc: $('#modal-top textarea').val(),
                maxProgress: a[1],
                daily: a[2],
                range: a[3] * 86400,
                endAt: picker.datepicker().data('datepicker').selectedDates[0].getTime(),
            };
            var key;
            if (g_progress.editingId) {
                key = g_progress.editingId;
                data = Object.assign(g_progressData[g_progress.editingId], data);
            } else {
              key =  new Date().getTime();
                data.progress = {};
            }
            g_progressData[key] = data;
            local_saveJson('progress', g_progressData);
            
            delete g_progress.editingId;
            halfmoon.toggleModal('modal-top');
            g_progress.initHtml();
        });
    },

    getNowProgress: (data, range = false) => {
        if (typeof(data) != 'object') {
            data = g_progressData[data];
        }

        var date = new Date();
        var now = date.getTime();
        var value = 0;
        var cnt = 0;

        for (var t in data.progress) {
          if(range && now - t > range) continue;
            value += data.progress[t].value;
            cnt++;
        }
        return { value: value, cnt: cnt };
    },
    getHtml: (time) => {
        var data = g_progressData[time];
        var progress = g_progress.getNowProgress(data);
        var times = Object.keys(data.progress);
        var last = times.length > 0 ? times[times.length - 1] : 0;
        var now = new Date().getTime();
        var max = data['maxProgress'] ;
        var np = max > 0 ? parseInt(progress.value / max * 100) : 50;
        var c = (data['endAt'] - now) / 1000;
        var h = `<details class="collapse-panel" data-time="` + time + `" open>
          <summary class="collapse-header">
              <strong>` + data.name + `</strong>
             <span class="badge badge-pill badge-primary float-right"> <strong>` + progress.cnt + `</strong></span>
              <br />

              <span class="text-muted">` + (!last ? _l('进度_无记录') : _l('进度_记录', time_getRent(last))) + `</span>
              <span class="text-muted float-right">` + _l(c > 0 ? '进度_剩余' : '进度_超过', getTime1(Math.abs(c))) + `</span>
          </summary>
          <div class="collapse-content position-relative">
                <div class="dropdown" style="z-index: 2;position: absolute;right: 10px;top: 10px;" >
                    <i data-toggle="dropdown" class="fa fa-ellipsis-h" aria-hidden="true"></i> 
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" data-action="progress_add,` + time + `">` + _l('进度_编辑') + `</a>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-content">
                      <button class="btn btn-block btn-danger" data-action="progress_delete,` + time + `" type="button">` + _l('进度_删除') + `</button>
                    </div>
                  </div>
                </div>
              <div>
                  <span data-action="progress_addProgress,1" class="badge badge-primary">+1</span>
                  <span data-action="progress_addProgress,3" class="badge badge-success">+3</span>
                  <span data-action="progress_addProgress,5" class="badge badge-secondary">+5</span>
                  <span data-action="progress_addProgress,-1" class="badge badge-danger">-1</span>
                  <span data-action="progress_addProgress" class="badge">+</span>
              </div>
              <div class="row w-full flex-center">
              <span class="text-muted col-1 mt-10 font-size-20">` + progress.value + `</span>
              <div class="progress h-25 mt-10 col-10">
                <div class="progress-bar w-three-quarter rounded-0" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: ` + np + `% !important;">` + np + `%</div>`;
        var v = g_progress.getNowProgress(data, data.range);
        var i = data.daily - v.value;
        if(max <= 0){
          i1 = 50 - parseInt(i / data.daily * 50);
        }else
        if (i > 0) {
            i1 = parseInt(i / max * 100);
        }
        h += `<div class="progress-bar rounded-0 bg-secondary" role="progressbar" style="width: ` + i1 + `% !important;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" title="` + i + `"><span class="text-dark">` + i1 + `%</span></div>`;
        h += `</div><span class="text-muted col-1 mt-10 font-size-20">` + (max > 0 ? max : '∞') + `</span>
                </div>
          </div></details>`;
        return h;
    }
}

g_progress.preInit();