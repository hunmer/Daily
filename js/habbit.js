var g_habbit = {
  preInit: () => {
    $(`<h5 class="sidebar-title">`+_l('侧栏_习惯_标题')+`</h5>
            <div class="sidebar-divider"></div>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,progress">
                    <span class="sidebar-icon">
                        <i class="fa fa-tasks" aria-hidden="true"></i>
                    </span>
            `+_l('侧栏_习惯_进度')+`
            </a>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,daily">
                    <span class="sidebar-icon">
                        <i class="fa fa-inbox" aria-hidden="true"></i>
                    </span>
            `+_l('侧栏_习惯_日常')+`
            </a>
            <a class="sidebar-link sidebar-link-with-icon" data-action="toTab,countdown">
                    <span class="sidebar-icon">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                    </span>
            `+_l('侧栏_习惯_倒计天')+`
            </a>

            `).appendTo('.sidebar-menu');
  },
    init: () => {
      if(g_habbit.inited) return;
        g_habbit.inited = true;
    	$(`<div id='content_progress' class="_content hide"></div>`).appendTo('.content-wrapper');
      $(`<div id='content_daily' class="_content hide"></div>`).appendTo('.content-wrapper');
    	$(`<div id='content_countdown' class="_content hide"></div>`).appendTo('.content-wrapper');

       

    	g_habbit.registerActions();
    	g_habbit.initHabbits();

    	// showContent('progress');
      // showContent('daily');
    	// showContent('countdown');
    },
    initHabbits: () => {
    	var h = '';
    	var a = {
    		'progress': {
    			div: '<div class="collapse-group mw-full" style="user-select: none;">{html}</div>',
    			html: '',
    		},
    		'daily': {
    			div: '<div class="row w-full">{html}</div>',
    			html: '',
    		},     
        'countdown': {
          div: '<div class="row w-full">{html}</div>',
          html: '',
        },                    
    	}
			for(var name in g_habbits){
				var data = g_habbits[name];
				a[data.type].html += g_habbit.getHtml(data, {name: name, div: true});
			}
			for(var type in a){
				$('#content_'+type).html(a[type].div.replace('{html}', a[type].html));
			}
    },
    registerActions: () => {
        registerAction('habbit_dots', (dom, action, params) => {

        });
        registerAction('daily_card_switch', (dom, action, params) => {
        	var showed = $(dom).parent().find('.cardContent.show').removeClass('show').addClass('hide');
        	var next = showed.next();
        	if(!next.length) next = showed.prev();
        	if(!next.length) next = showed;
        	next.removeClass('hide').addClass('show');
        });
        registerAction('progress_add', (dom, action, params) => {
            var i;
            if (action.length == 1) {
                i = prompt('输入进度');
            } else {
                i = action[1];
            }
            if (i <= 0) return;
            var par = dom.parents('[data-habbit]');
            if (par.length) {
                par = $(par[0]);
                var key = par.attr('data-habbit');
                if (g_habbits[key]) {
                    var max = g_habbits[key]['maxProgress'] - g_habbits[key]['nowProgress'];
                    if (i > max) i = max;

                    // TODO 输入备注
                    var now = new Date().getTime();
                    g_habbits[key]['progress'][now] = {
                        progress: i,
                    }
                    g_habbits[key]['lastSign'] = now;
                    g_habbits[key]['nowProgress'] += Number(i);
                    local_saveJson('habbits', g_habbits);
                    par.html(g_habbit.getHtml(g_habbits[key], { name: key }));
                }
            }
        });
        
    },

    getNowProgress: (data) => {
    	 var s = typeof(data['daily']);
      if (s != 'undefined') {
          var p1 = 0;
          var d = new Date();
          var fd = getFormatedTime(3, d);
          for (var t in data['progress']) {
              if (fd == getFormatedTime(3, new Date(Number(t)))) {
                  p1 += data['progress'][t].progress;
              }
          }
          // console.log('今日已完成'+p1);

          var i = 0;
          if (s == 'object') {

              if (data['daily'][fd] != undefined) {
                  i = data['daily'][fd];
              } else
              if (data['daily'][d.getDay()] != undefined) {
                  i = data['daily'][d.getDay()];
              } else
              if (data['daily']['default'] != undefined) {
                  i = data['daily']['default'];
              }
          } else {
              i = data['daily'];
          }
          if (p1 >= i) { // 今日已完成目标

          }
          i -= p1;
          return i;
      }
    },
    getHtml: (data, params) => {
        var h = '';
        switch (data.type) {
            case 'progress':
                var np = parseInt(data['nowProgress'] / data['maxProgress'] * 100);
                h = `
          <summary class="collapse-header">
          		<i data-action="" class="fa ` + data['icon'] + `" aria-hidden="true"></i>
              <strong>` + params.name + `</strong>
              <strong class="float-right">` + data['nowProgress'] + `%</strong>
              <br />
              <span class="text-muted">Last: ` + (data['lastSign'] == 0 ? '无记录' : data['lastSign'] < 60 ? '刚刚' : getLastTime(data['lastSign'] / 1000)) + `</span>
              <span class="text-muted float-right">End: ` + getLastTime(new Date(), data['endAt'] / 1000) + `</span>
          </summary>
          <div class="collapse-content">
              <i data-action="habbit_dots" class="fa fa-ellipsis-h float-right hand" aria-hidden="true"></i>
              <div>
                  <span data-action="progress_add,1" class="badge badge-primary">+1</span>
                  <span data-action="progress_add,3" class="badge badge-success">+3</span>
                  <span data-action="progress_add,5" class="badge badge-secondary">+5</span>
                  <span data-action="progress_add" class="badge">+</span>
              </div>
              <div class="row w-full flex-center">
              <span class="text-muted col-1 mt-10">` + data['nowProgress'] + `</span>
              <div class="progress h-25 mt-10 col-10">
                <div class="progress-bar w-three-quarter rounded-0" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: ` + np + `% !important;">` + np + `%</div>`;

               	var i = g_habbit.getNowProgress(data);
             		 if (i > 0) {
		              var i1 = parseInt(i / data['maxProgress'] * 100);
		              h += `<div class="progress-bar rounded-0 bg-secondary" role="progressbar" style="width: ` + i1 + `% !important;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" title="` + i + `">` + i1 + `%</div>`;
		          	}
                h += `</div><span class="text-muted col-1 mt-10">` + data['maxProgress'] + `</span>
                </div>
          </div>`;
                if (params.div) {
                    h = `<details class="collapse-panel" data-habbit="` + params.name + `" open>` + h + ' </details>';
                }
                break;

              case 'daily':
              	h = h + `
                <div class="col-6">
                    <div class="card position-relative">
                        <i data-action="daily_card_switch" class="fa fa-ellipsis-h" aria-hidden="true" style="position: absolute; right: 20px; top: 15px"></i>
                        <div class='cardContent contnet_1 show'>
                            <div class="text-center">
                                <img src="`+data.icon+`">
                                <h5>`+params.name+`</h5>
                            </div>
                            <div class="row w-full" style="display: inline-flex;align-items: center;">
                                <i data-action="habbit_dots" class="fa fa-minus col-2" aria-hidden="true"></i>
                                <div class="progress h-25 col-8">
                                    <div class="progress-bar w-three-quarter rounded-0" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">`+g_habbit.getNowProgress(data)+'/'+data.daily+`</div>
                                </div>
                                <i data-action="habbit_dots" class="fa fa-plus  col-2 text-right" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class='cardContent contnet_2 hide'>
                            <h2 class="card-title">
                                `+params.name+`
                            </h2>
                            <p class="text-muted">
                                `+data.desc+`
                            </p>
                            <div class="text-right">
                                <a href="#" class="btn">detail</a>
                            </div>
                        </div>
                    </div>
                </div>`;
              	break;

              case 'countdown':
                // TODO: 过期提示
                h = h + `
                <div class="col-6">
                    <div class="card position-relative">
                        <i data-action="daily_card_switch" class="fa fa-ellipsis-h" aria-hidden="true" style="position: absolute; right: 20px; top: 15px"></i>
                        <div class='cardContent contnet_1 show'>
                            <div class="text-center">
                                <img src="`+data.icon+`">
                                <h5>`+params.name+`</h5>

                                <span style="">还有&nbsp;</span>
                              <span style="font-size: 3rem">&nbsp;`+getTime((data.endAt - new Date().getTime()) / 1000 )+`&nbsp;</span>
                            </div>
                            
                        </div>
                        <div class='cardContent contnet_2 hide'>
                            <h2 class="card-title">
                                `+params.name+`
                            </h2>
                            <p class="text-muted">
                                `+data.desc+`
                            </p>
                            <div class="text-right">
                                <a href="#" class="btn">detail</a>
                            </div>
                        </div>
                    </div>
                </div>`;
                break;
        }

        return h;
    }
}

g_habbit.preInit();