/*
    TODO
允许用户在计时阶段记录图片或者文本，单击记录会按照时间线显示图片与文本

今日昨天共记录时间

*/

var g_cd = {
    timer: 0,
    stoped: 0,
    paused: false,
    init: () => {
        g_cd.con = $(`<div id='content_time' class="_content p-10 hide">
                <div class="w-full text-center">
                <strong data-action="time_clockClick">00:00</strong>
                <span class="text-muted cnt hide">1/3</span>
                </div>
                    <div class="input-group">
                      <select class="form-control flex-reset w-100"> 
                        <option value="" disabled>`+_l('计时类型')+`</option>
                        <option value="add" selected>`+_l('正计时')+`</option>
                        <option value="reduce">`+_l('倒计时')+`</option>
                        <option value="tomato">`+_l('番茄种')+`</option>
                      </select>
                      <input type="text" class="form-control text-center" placeholder="`+_l('要做什么')+`" id="input_time_title" onkeydown="if(event.keyCode == 13){$('[data-action=time_start]').click();}">
                      <div class="input-group-append">
                        <button class="btn btn-primary" type="button" data-action="time_start">`+_l('开始')+`</button>
                      </div>
                    </div>
                    <div class="btn-toolbar mt-10" role="toolbar" > 
                      <div class="input-group w-full"> 

                        <div class="input-group-prepend">
                          <span class="input-group-text"><i data-action="habbit_dots" class="fa fa-image" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" id='input_time_log' class="form-control" placeholder="`+_l('想说什么')+`" onkeydown="if(event.keyCode == 13){doAction(null, 'time_completeInput')}">
                        <div class="input-group-append">
                          <span class="input-group-text"><i data-action="time_completeInput" class="fa fa-check" aria-hidden="true"></i></span>
                          <span class="input-group-text"><i data-action="time_switchInput" class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                        </div>
                        
                      </div>
                    </div>
                    <table class="table hide" id='table_taskLog'>
                      <thead>
                        <tr>
                          <th width="50px">Time</th>
                          <th>Content</th>
                          <th class="text-right"></th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>

                    <table class="table mt-10" id='table_eventList'>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>`+_l('事件')+`</th>
                          <th>`+_l('开始')+`</th>
                          <th>`+_l('结束')+`</th>
                          <th class="text-right">`+_l('耗时')+`</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
            </div>`).appendTo('.content-wrapper');
        g_cd.con_time = g_cd.con.find('strong');

         g_cd.bar = $(`
            <div id="bottom_time" class="toolbar mx-auto">
            </div>
            `).appendTo('.navbar-fixed-bottom');


         $(`
            <h5 class="sidebar-title">`+_l('侧栏_计时_标题')+`</h5>
            <div class="sidebar-divider"></div>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,time">
                    <span class="sidebar-icon">
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                    </span>
            `+_l('侧栏_计时_进入')+`
            </a>`).appendTo('.sidebar-menu');
         
        g_cd.registerActions();
        g_cd.initHtml();
        g_cd.registerEvents();
        // showContent('time');
    },
    registerEvents: () => {
        $(window).on('resize', (e) => {
           $('#content_time [data-action="time_clockClick"]').css('fontSize', $(window).width() / 3.75 + 'px');
        }).resize();
    },
    registerActions: () => {
        registerAction('time_clockClick', (dom, action, params) => {
            g_cd.paused = !g_cd.paused;
            if(g_cd.paused){
                g_cd.stoped++;
            }
        });
        registerAction('time_completeInput', (dom, action, params) => {
            var d = $('#input_time_log');
            var t = d.val();
            if(t != ''){
                g_cd.append_Timelog(t);
                d.val('');
            }
        });
        registerAction('time_tasklog_delete', (dom, action, params) => {
            $(dom).parents('tr')[0].remove();
        });
        
        
        registerAction('time_switchInput', (dom, action, params) => {
            var b = $(dom).toggleClass('btn-primary').hasClass('btn-primary');
            var d = $('#input_time_log');
            if(d[0].nodeName == 'INPUT'){
                h = `<textarea id='input_time_log' class="form-control" placeholder="`+_l('想说什么')+`" {s}>`+d.val()+`</textarea>`;
            }else{
                h = `<input id='input_time_log' class="form-control" placeholder="`+_l('想说什么')+`" value="`+d.val()+`" {s}>`;
            }
            d.replaceWith(h.replace('{s}', `onkeydown="if(event.keyCode == 13) doAction(null, 'time_completeInput')"`));
        });
        
        registerAction('time_start', (dom, action, params) => {
            if (dom.hasClass('btn-primary')) {
                var d = g_cd.con.find('#input_time_title');
                if (d.val() == '') return d.focus();

                g_cd.type = g_cd.con.find('select').val();
                if (g_cd.type == 'add') {
                    g_cd.time = 0;
                } else {
                    var min = parseInt(prompt(_l('几分钟后结束'), 1));
                    if (isNaN(min) && min <= 0) return;
                    g_cd.min = min;
                    g_cd.time = min * 60;
                    if (g_cd.type == 'tomato') {
                        min = parseInt(prompt(_l('休息几分钟'), 1));
                        if (isNaN(min) && min <= 0) return;
                        g_cd.reset = min * 60;
                        min = parseInt(prompt(_l('要重复做几次'), 3));
                        if (isNaN(min) && min <= 0) return;
                        g_cd.loop = min;
                        g_cd.looped = 0;
                        g_cd.con.find('.cnt').html('0/' + min).show();
                    }
                }
                g_cd.startTimer();
                dom.removeClass('btn-primary').addClass('btn-danger').html('Stop');
            } else {
                var save = false;
                if (confirm(_l('是否中止'))) {
                    if (g_cd.type == 'add') {
                        save = confirm(_l('是否保存记录'));
                    }
                    g_cd.save(save);
                }
            }
        });
    },
    save: (finish) => {
        //clearInterval(g_cd.timer);
        var d = g_cd.con.find('#input_time_title');
        if (finish) {
            var name = d.val();
            if (name == '') return d.focus();
            var data = {
                name: name,
                end: new Date().getTime(),
                type: g_cd.type
            }
            if (g_cd.type == 'add') {
                var t1 = g_cd.time;
                var t2 = parseInt((data.end - g_cd.start) / 1000);
                console.log(t1, t2);
                if(t2 - t1 > 30 && g_cd.stoped == 0){
                    if(confirm(_l('是否更正时间',getTime(t2 - t1)))){
                        t1 = t2;
                    }

                }
                data.spend = t1;

            } else
            if (g_cd.type == 'tomato') {
                data.loop = g_cd.looped;
                data.reset = g_cd.reset;
            }
            console.log(data);

            var day = getFormatedTime(3);
            if(!g_times[day]) g_times[day] = {};
            g_times[day][g_cd.start] = data;
            local_saveJson('times', g_times);
            g_cd.initHtml();
        }
        g_cd.type = 'add';
        g_cd.time = 0;
        d.val('');
        g_cd.con.find('.cnt').hide();
        g_cd.con_time.removeClass('text-success').addClass('text-primary');
        g_cd.con.find('button[data-action="time_start"]').addClass('btn-primary').removeClass('btn-danger').html('Start');
        g_cd.con_time.html('00:00');

    },
    startTimer: () => {
        g_cd.con_time.removeClass('text-primary');
        g_cd.start = new Date().getTime();
        clearInterval(g_cd.timer);
        g_cd.paused = false;
        g_cd.stoped = 0;
        g_cd.timer = setInterval(() => {
            if (g_cd.paused) return;
            var t;
            if (g_cd.type == 'add') {
                t = g_cd.time++;
            } else {
                t = g_cd.time--;
                if (t == 0) {
                    if (g_cd.type == 'tomato') {
                        if (g_cd.reseting) {
                            g_cd.time = g_cd.min * 60;
                            g_cd.reseting = false;
                            g_cd.con_time.removeClass('text-success');
                            toastPAlert(_l('休息结束'), 'alert-warning')
                            return;
                        }
                        if (g_cd.looped < g_cd.loop) {
                            g_cd.looped++;
                            g_cd.con.find('.cnt').html(g_cd.looped + '/' + g_cd.loop);
                            g_cd.con_time.addClass('text-success');
                            g_cd.time = g_cd.reset;
                            g_cd.reseting = true;
                            toastPAlert(_l('休息时间'), 'alert-success')
                            return;
                        } else {
                            g_cd.con.find('.cnt').hide();
                        }
                    }
                    g_cd.save(true);
                    alert(_l('计时完成'));
                }
            }
            // if(t % 300 === 0 && t != 0){
            //     var m = t / 300;
            //     g_speaker.speak(g_cd.type == 'add' ? t+'分経ちました' : '残り' + t + '分');
            // }
            g_cd.con_time.html(getTime(t, ':', ':', ''));
        }, 1000)
    },
    initHtml: () => {
        var h = '';
        var day = getFormatedTime(3);
        if (g_times[day]) {
            var all = 0;
            var i = 1;
            for (var start in g_times[day]) {
                var d = g_times[day][start];
                var t = d.spend || d.end - start;
                h = `
                <tr>
                  <th>` + i + `</th>
                  <td>` + d.name + `</td>
                  <td>` + getFormatedTime(0, new Date(parseInt(start))) + `</td>
                  <td>` + getFormatedTime(0, new Date(parseInt(d.end))) + `</td>
                  <td class="text-right">` + getTime(t) + `</td>
                </tr>
                    ` + h;
                i++;
                all += t;
            }
        }
        g_cd.con.find('#table_eventList tbody').html(h).show();
        g_cd.bar.html(all > 0 ? `
            <h5>`+ _l('今日总共', getTime(all))+`</h5>
        ` : '');
    },
    append_Timelog: (data) => {
        var h = `<tr>
            <th>` + getFormatedTime(0) + `</th>`;
        if(typeof(data) == 'string'){
            h += `<td>` + data + `</td>`
        }else{
            // file
        }
        h += '<td class="text-right"><i data-action="time_tasklog_delete" class="fa fa-trash-o" aria-hidden="true"></i></td>';
        g_cd.con.find('#table_taskLog tbody').prepend(h);
    }
}

g_cd.init();