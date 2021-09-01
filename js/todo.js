var g_todo = {
    init: () => {
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
        $(`<h5 class="sidebar-title">` + _l('侧栏_代办_标题') + `</h5>
            <div class="sidebar-divider"></div>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,todo">
                    <span class="sidebar-icon">
                        <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_代办_进入') + `
            </a>`).appendTo('.sidebar-menu');

        g_todo.registerActions();
        g_todo.initHtml();
        // showContent('todo');

        $('body').on('change', 'details input[type=checkbox]', (event) => {
        	var dom = $(event.target);
        	var finish = dom.prop('checked');
        	var time = dom.parent().attr('data-time');
        	g_todos[time].finish = finish;

        	var lable = dom.next();
        	var h = g_todos[time].name;
        	if(finish){
        		h = '<del>' + h + '</del>';
        	}
        	lable.html(h);
        })
        // 
      registerContextMenu('div[data-time]', (dom) => {doAction(dom[0], 'todo_list_item_detail')});;
    },

    getHtml_task: (action, button) => {
    	return `<div class="input-group mb-10">
                	 <select class="form-control flex-reset w-auto">
								    <option value="" disabled>`+_l('弹出_代办_新建_选择框_标题')+`</option>
								    <option value="danger">`+_l('priority_danger')+`</option>
								    <option value="secondary">`+_l('priority_secondary')+`</option>
								    <option value="primary">`+_l('priority_primary')+`</option>
								    <option value="default" selected>`+_l('priority_default')+`</option>
								   </select>
                  <input type="text" class="form-control" placeholder="`+_l('弹出_代办_新建_名称_默认')+`">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">`+_l('弹出_代办_新建_注释_标题')+`</span>
                  </div>
                  <textarea class="form-control" placeholder="`+_l('弹出_代办_新建_注释_默认')+`"></textarea>
                </div>
                <button class="btn btn-primary btn-block" data-action="`+action+`">`+button+`</button>`;
    },

    registerActions: () => {
        registerAction('todo_add', (dom, action, params) => {
        	  g_cache.closeCustom = () => {}
            $('#modal-custom').find('.modal-title').html(_l('弹出_代办_新建'));
            $('#modal-custom').attr('data-type', 'chatList_add').find('.modal-html').html(g_todo.getHtml_task('todo_create', _l('弹出_代办_新建_按钮_确定')));
            halfmoon.toggleModal('modal-custom');

        });
        registerAction('todo_list_item_detail', (dom, action, params) => {
        	dom = $(dom);
        	if(!dom.attr('data-time')){
        		dom = $(dom).parent('[data-time]');
        	}
        	var time = dom.attr('data-time');
        	var data = g_todos[time];
        	  g_cache.closeCustom = () => {}
            $('#modal-custom').find('.modal-title').html(_l('弹出_代办_修改'));
            var d = $(g_todo.getHtml_task('todo_create,'+time, _l('弹出_代办_修改_按钮_确定')));
            d.find('option[value="'+data.priority+'"]').prop('checked', true);
            d.find('input[type="text"]').val(data.name);
            d.find('textarea').val(data.desc);
            $('#modal-custom').attr('data-type', 'todo_list_item_detail').find('.modal-html').html(d);
            halfmoon.toggleModal('modal-custom');
        });
        
         registerAction('todo_create', (dom, action, params) => {
            var input = $('#modal-custom input[type=text]');
            var name = input.val();
            if(name == ''){
                return input.focus();
            }
            if(action.length == 1){
            	action[1] = new Date().getTime();
            }
            g_todos[action[1]] = {
            	name: name,
							desc: $('#modal-custom textarea').val(),
							end: -1,
							priority: $('#modal-custom select').val(),
							notes: {},
            }
            local_saveJson('todos', g_todos);
            halfmoon.toggleModal('modal-custom');
            g_todo.initHtml();
        });
    },

    initHtml: () => {
        var now = new Date().getTime();
        var l = {
            未完成: [],
            已完成: [],
            已过期: [],
            已放弃: [],
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
            if (v.end >= now) {
                l['已过期'].push(time);
            } else {
                l['未完成'].push(time);
            }
        }
        var h = '<div class="collapse-group w-full">';
        for (var type in l) {
        	var cnt = l[type].length;
            h += `<details data-type="`+type+`" class="collapse-panel"`+(type == '未完成' && cnt > 0 ? ' open' : '')+`>
                    <summary class="collapse-header">
                        <strong class="font-size-20">` + _l(type) + `</strong>
                        <i class="fa fa-ellipsis-h float-right" data-action="todo_list_more" aria-hidden="true"></i>
                        <br />
                        <span class="text-muted ns">`+(cnt > 0 ? _l('任务总数', cnt) : _l('无任务'))+ `</span>
                    </summary>
                    <div class="collapse-content">`;
                    // ，预计需要<span class='badge badge-primary text-center m-5'>2小时</span>
            for (var time of l[type]) {
                var v = g_todos[time];
                var id = 'checkbox-' + time;
                h += `<div data-time="`+time+`" class="custom-checkbox h-50" ` + (v.end >= now ? 'disabled' : '') + `>
                            <input type="checkbox" id="` + id + `" value="">
                            <label for="` + id + `">` + (v.finish ? '<del>' : '') + v.name + (v.finish ? '</del>' : '') + `</label>
                            `+g_todo.getPriority(v.priority, true)+`
                            
                 </div>`;
            }
            if(cnt == 0){
            	// h += '<h6 class="text-center">OWO</h6>'
            }
            h+='</details>';
        }
        $('#content_todo .mainContent').html(h+'</div>');
    },
    getPriority: (priority, right = false) => {
    	return '<span class="badge badge-'+priority+(right ? ' float-right' : '')+'">'+_l('priority_'+priority)+'</span>'
    }
}

g_todo.init();