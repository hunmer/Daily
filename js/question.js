var g_question = {
    preInit: () => {
        $(`

            <h5 class="sidebar-title">` + _l('侧栏_问题_标题') + `</h5>
            <div class="sidebar-divider"></div>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,question">
                    <span class="sidebar-icon">
                        <i class="fa fa-question" aria-hidden="true"></i>
                    </span>
            ` + _l('侧栏_问题_进入') + `
            </a>`).appendTo('.sidebar-menu');
    },
    init: () => {
        if (g_question.inited) return;
        g_question.inited = true;
        $(`<div id='content_question' class="_content p-10 hide">
            <div class="mainContent animated fadeInDown" animated='fadeInDown'></div>
            <div class="ftb br">
                <div class="row mx-auto" style="width: 20%;">
                    <div class="col">
                        <a data-action="question_add" class="btn btn-square btn-primary rounded-circle btn-lg shadow" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            </div>`).appendTo('.content-wrapper');
        $(`<div id='content_questionView' class="_content p-10 hide h-full">
            <div class="mainContent animated fadeInLeft" animated='fadeInLeft'></div>
            <div class="ftb br">
                
            </div>
            </div>`).appendTo('.content-wrapper');

        g_question.bar = $(`
            <div id="bottom_time" class="toolbar mx-auto">
            </div>
            `).appendTo('.navbar-fixed-bottom');
        registerContextMenu('.question', (dom, event) => {
            doAction(null, 'question_add,' + dom.attr('data-name'));
        });
        g_question.registerActions();
    },
    getDiv: (time) => {
        return $('.question[data-name="' + time + '"]');
    },
    getPostHtml: (key, time, open = false) => {
        var d = g_questions[key].datas[time];
        var k = key + ',' + time;
        return `
    	 			
						  <details class="collapse-panel question_post" data-time="` + time + `"` + (open ? ' open' : '') + `>
						    <summary class="collapse-header">
						      <strong>` + getFormatedTime(5, time) + `</strong>
						      <br />
						      <span class="text-muted">全文: ` + d.text.length + `</span>
						    </summary>
						    <div class="collapse-content animated fadeIn" animated='fadeIn'>
						    <div class="flex-center position-relative mb-10" style="justify-content: space-between;">
						    	<i data-action="question_post,` + k + `" class="fa fa-edit" aria-hidden="true"></i> 
						    	<div class="dropdown" style="position: absolute;right: 10px;top:0;" >
									    <i data-toggle="dropdown" class="fa fa-ellipsis-h" aria-hidden="true"></i> 
									  <div class="dropdown-menu dropdown-menu-right">
									    <a data-action="question_post_copy,` + k + `" class="dropdown-item">` + _l('问题_投稿_复制') + `</a>
									    <div class="dropdown-divider"></div>
									    <div class="dropdown-content">
									      <button class="btn btn-block btn-danger" data-action="question_post_delete,` + k + `" type="button">` + _l('问题_投稿_删除') + `</button>
									    </div>
									  </div>
									</div>

						    </div>
						    	<div class="question_post_text">
						      ` + d.text + `
						      </div>
						    </div>
						  </details>
    	 			`;
    },

    viewList: (time) => {
        g_question.viewing = time;
        var data = g_questions[time];
        var h = '';
        for (var t in data.datas) {
            h += g_question.getPostHtml(time, t);
        }
        if (h == '') {
            h = '<h4 class="text-center p-10 title_empty">' + _l('什么都没有') + '</h4>';
        } else {
            h = `<div class="collapse-group w-500 mw-full">` + h + '</div>';
        }
        $('#content_questionView .mainContent').html(h);
        showContent('questionView');
        $('.navbar-brand').html(data.title);
        $('#content_questionView .ftb').html(`
        	<div class="row mx-auto" style="width: 20%;">
              <div class="col">
                  <a data-action="question_post,` + time + `" class="btn btn-square btn-primary rounded-circle btn-lg shadow" role="button"><i class="fa fa-plus" aria-hidden="true"></i></a>
                  <a data-action="back" class="btn btn-square btn-primary rounded-circle btn-lg shadow" role="button"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
              </div>
          </div>`);
    },
    registerActions: () => {
        registerAction('question_post_edit', (dom, action, params) => {
            copyText(g_questions[action[1]].datas[action[2]].text);
        });
        registerAction('question_post_copy', (dom, action, params) => {
            copyText(g_questions[action[1]].datas[action[2]].text);
        });
        registerAction('question_getList', (dom, action, params) => {
            g_question.viewList(action[1]);

        });
        registerAction('question_pin', (dom, action, params) => {
            var b = $(dom).toggleClass('text-secondary').hasClass('text-secondary');
            if(b){
            	$(dom).removeClass('fa-star-o').addClass('fa-star');
            }else{
            	$(dom).addClass('fa-star-o').removeClass('fa-star');
            }
            console.log(b);
            g_questions[action[1]].pin = b ? new Date().getTime() : 0;
            local_saveJson('questions', g_questions);
            g_question.initHtml();
        });

        registerAction('question_post_delete', (dom, action, params) => {
            confirm(_l('问题_投稿_是否删除')).then((d) => {
                if (d.button == 'ok') {
                    delete g_questions[action[1]].datas[action[2]];
                    $(dom).parents('details').remove();
                    local_saveJson('questions', g_questions);
                }
            })
        });
        registerAction('question_delete', (dom, action, params) => {
            confirm(_l('问题_是否删除')).then((d) => {
                if (d.button == 'ok') {
                    delete g_questions[action[1]];
                    g_question.getDiv(action[1]).remove();
                    local_saveJson('questions', g_questions);
                }
            })
        });
        /*


        */
        registerAction('question_sendMsg', (dom, action, params) => {
            var m = g_question.editor.txt.html();
            if (m != '') {
                g_emoji.hide();
                var s = getEditorHtml(m);
                var edit = action.length > 2;
                var t = edit ? action[2] : new Date().getTime();
                g_questions[action[1]].datas[t] = {
                    text: s
                }
                local_saveJson('questions', g_questions);
                g_question.editor.txt.clear();
                halfmoon.toggleModal('modal-top');
                toastPAlert(_l('问题_记录成功'), 'alert-success');
                if (g_cache.showing == 'questionView') {
                    $('#content_questionView .title_empty').remove();
                    if (edit) {
                        $('.question_post[data-time="' + t + '"] .question_post_text').html(s);
                    } else {
                        $('#content_questionView .mainContent').prepend(g_question.getPostHtml(action[1], t, true));
                    }
                }else{
                	g_question.initHtml();
                }
            }
        });
        registerAction('question_post', (dom, action, params) => {
            var edit = action.length > 1;
            var data = g_questions[action[1]];
            g_question.editName = action[1];
            var text = '';
            var k = action[1];
            if (action.length > 2) {
                k += ',' + action[2];
                g_question.editId = action[2];
                text = data.datas[action[2]].text;
            }
            g_cache.closeTopCustom = () => {
                g_question.editName = undefined;
            }
            // _l('弹出_问题编辑_' + (edit ? '修改' : '新建'))
            $('#modal-top').find('.modal-title').html(data.title);
            $('#modal-top').attr('data-type', 'question_post').find('.modal-html').html(`
                <div class='col-12'>
                    <div id="question-toolbar-container" class="w-full"></div>
                </div>
                <div id="question_input" class="w-full text-center form-control col-12 mx-auto" style="height: 80px;">
                </div>

                <div class="col-12 d-flex mt-10">
                		<div class="col-10"></div>
                     <a id="btn_question_sendMsg" data-action="question_sendMsg,` + k + `" class="btn btn-primary shadow col" style="font-size: 2rem;"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>
                </div>
            </div>`);
            halfmoon.toggleModal('modal-top');
            var editor = new wangEditor("#question-toolbar-container", "#question_input");
            g_question.editor = editor;
            editor.config.menus = [
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
            editor.config.uploadImgShowBase64 = true;

            editor.config.customUploadImg = function(resultFiles, insertImgFn) {
                lrz(resultFiles[0], { width: 800, quality: 0.5 })
                    .then(function(rst) {
                        insertImgFn(rst.base64)
                    })
                    .catch(function(err) {
                        alert('图片读取错误');
                    });
            }
            editor.config.onchange = function(newHtml) {
                if (g_question.fullscreen) return;
                var h = newHtml.trim() == '' ? 0 : $('#question_input .w-e-text')[0].scrollHeight;
                if (h < 80) h = 80;
                $('#msg').css('height', h);
            }

            editor.txt.eventHooks.keydownEvents.splice(0, 0, (event) => {
                if (event.ctrlKey && event.keyCode == 13) {
                    event.preventDefault(true);
                    $('#btn_question_sendMsg').click();
                }
            });

            editor.config.focus = false
            editor.create();
            if (text != '') {
                editor.txt.html(text);
            }
            $('#question-toolbar-container .w-e-toolbar').prepend(`<div data-action="show_stricker,#question_sendMsg" class="w-e-menu" data-title="">
                <i class="w-e-icon-happy"></i>
            </div>`);

            $('#question_input .placeholder').html(data.placeholder || _l('问题_投稿_输入文本'));

        });

        registerAction('question_add', (dom, action, params) => {
            var edit = action.length > 1;
            g_cache.closeCustom = () => {
                g_question.editName = undefined;
            }

            g_question.editName = edit ? action[1] : undefined;
            $('#modal-custom').find('.modal-title').html(_l('弹出_问题_' + (edit ? '修改' : '新建')));
            $('#modal-custom').attr('data-type', 'question_add').find('.modal-html').html(`
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_问题_新建_问题_标题') + `</span>
                  </div>
                  <input type="text" id="question_input_name" class="form-control" placeholder="` + _l('弹出_问题_新建_问题_默认') + `">
                </div>
                <div class="input-group mb-10">
                  <div class="input-group-prepend">
                    <span class="input-group-text">` + _l('弹出_问题_新建_注释_标题') + `</span>
                  </div>
                  <textarea id="question_input_desc" class="form-control" placeholder="` + _l('弹出_问题_新建_注释_默认') + `"></textarea>
                </div>
                <button class="btn btn-primary btn-block" data-action="question_create` + (edit ? ',' + action[1] : '') + `">` + _l('弹出_问题_' + (edit ? '修改' : '新建') + '_按钮_确定') + `</button>
            `);
            if (edit) {
                var data = g_questions[action[1]];
                $('#question_input_name').val(data.title);
                $('#question_input_desc').val(data.desc);
            }
            halfmoon.toggleModal('modal-custom');
        });
        registerAction('question_create', (dom, action, params) => {
            var input = $('#modal-custom input[type="text"]');
            var title = input.val();
            if (title == '') {
                return input.focus();
            }
            var edit = action.length > 1;
            for (var t in g_questions) {
                if (g_questions[t].title == title) {
                    return alert(_l('弹出_问题_新建_已存在'));
                }
            }
            var data = {
                title: title,
                desc: $('#modal-custom textarea').val(),
            }
            if (edit) {
                data = Object.assign(g_questions[action[1]], data);
            } else {
                data.datas = {};
                action[1] = new Date().getTime();
            }
            g_questions[action[1]] = data;
            local_saveJson('questions', g_questions);
            $('#content_question .mainContent').prepend(g_question.getHtml(action[1], data));
            halfmoon.toggleModal('modal-custom');
            g_question.editName = undefined;
        });
    },

    getHtml: (time, data) => {
    	var cnt = Object.keys(data.datas).length;
        return `<div class="card question position-relative" data-name="` + time + `">
      			<div class="dropdown" style="position: absolute;right: 15px;top:10px;" >
						    <i data-toggle="dropdown" class="fa fa-ellipsis-h" aria-hidden="true"></i> 
						  <div class="dropdown-menu dropdown-menu-right">
						    <a data-action="question_add,` + time + `" class="dropdown-item">` + _l('问题_编辑') + `</a>
						    <div class="dropdown-divider"></div>
						    <div class="dropdown-content">
						      <button class="btn btn-block btn-danger" data-action="question_delete,` + time + `" type="button">` + _l('问题_删除') + `</button>
						    </div>
						  </div>
						</div>

					  <h2 class="card-title">
					    ` + data.title + `
					  </h2>
					  <p class="text-muted">
					    ` + data.desc + `
					  </p>
					  <div class="flex-center row">
					  	<span class="text-muted col">` + time_getRent(time) + `</span>
					  	<i data-action="question_post,` + time + `" class="fa fa-edit col" aria-hidden="true"></i>
					  	<i data-action="question_pin,` + time + `" class="fa fa-star`+(data.pin ? ' text-secondary' : '-o')+` col" aria-hidden="true"></i>
					  	`+(cnt ? '<div class="col"><span class="badge badge-primary ">'+cnt+'</span></div>' : '')+`
					  	<a class="btn col" data-action="question_getList,` + time + `">` + _l('问题_列表') + `</a>
					  </div>
					</div>`;
    },

    initHtml: () => {
        var h = '';
        var d = [];
        for (var time in g_questions) {
        	var times = Object.keys(g_questions[time].datas).sort(function(a, b) { return b - a; });
            d[time] = {
                times: times,
                pin: g_questions[time].pin || 0,
                last: parseInt(times.length ? times[0] : time)
            }
        }
        for (var time of Object.keys(d).sort(function(a, b) {
                return d[b].pin - d[a].pin || d.last - a.last;
            })) {
            h += g_question.getHtml(time, g_questions[time]);
        }
        $('#content_question .mainContent').html(h);
    }

}


g_question.preInit();