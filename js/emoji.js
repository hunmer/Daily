var _audio_stricker;
var g_emoji = {
    list: {},
    init: () => {
        g_emoji.registerAction();
        _audio_stricker = $('<audio autoplay></audio>').appendTo('body')[0];
        g_emoji.prompt();
    },
    hide: () => {
        $('#modal-stricker').hide();
        $('[data-action="show_stricker"]').removeClass('text-primary');
    },
    show: () => {
        $('#modal-stricker').show();
        $('[data-action="show_stricker"]').addClass('text-primary');
    },
    isShowing: () => {
        return $('#modal-stricker').css('display') != 'none';
    },
    playAudio: (src) => {
        _audio_stricker.src = src;
    },
    loadEmojis: (type) => {
        var file = 'emojis/' + type + '.json';
        g_emoji.lastEmojiType = type;
        if (window.location.protocol == 'file:') {
            loadJs(file);
        } else {
            $.ajax({
                url: file,
                type: "GET",
                dataType: "jsonp"
            });
        }

    },
    loadJSON: (json) => {
        g_emoji.data = json;
        var l = {
            people: '😀',
            nature: '🐱',
            foods: '🍎',
            activity: '⚾',
            places: '🚖',
            objects: '👝',
            symbols: '💠',
            flags: '🏁',
        }

        var tab = '<span class="_emoji" data-action="stricker_toEmoji" data-id="history">🕓</span>';
        var h = '';
        for (var detail of json['categories']) {
            tab += '<span class="_emoji" data-action="stricker_toEmoji,' + detail.id + '">' + l[detail.id] + '</span>';
            h += `<div id='emoji_type_` + detail.id + `' class="row w-full h-200 emoji_type text-center" style="font-size: 20px;align-items: center;display: ` + (detail.id == 'people' ? 'flex' : 'none') + `;"></div>`;
        }
        $('#emoji_content_emoji').html(h);
        $('#emoji_tab_emoji').html(tab);
        setTimeout(() => {
            g_emoji.loadEmojiCate('people');
        }, 500);
    },
    loadEmojiCate: (cate) => {
        var h = '';
        var type = g_emoji.lastEmojiType;
        for (var detail of g_emoji.data['categories']) {
            if (detail.id == cate) {
                for (var emoji of detail['emojis']) {
                    var d = g_emoji.data['emojis'][emoji];
                    h += '<span class="col-2" data-action="emoji_send">' + (type == 'all' ? String.fromCodePoint(parseInt(d.b, 16)) : '<img width="20px" class="mb-10 mx-auto" src="https://raw.githubusercontent.com/iamcal/emoji-data/master/img-' + type + '-64/' + d.b.toLowerCase() + '.png">') + '</span>';
                }
            }
        }
        $('#emoji_type_' + cate).html(h);

        $('.emoji_tab_active').removeClass('emoji_tab_active');
        var dom = $('[data-action="stricker_toEmoji,' + cate + '"]');
        $(dom).addClass('emoji_tab_active');

        if (g_emoji.lastEmojiTab) {
            $('#emoji_type_' + g_emoji.lastEmojiTab).css('display', 'none');
        }
        g_emoji.lastEmojiTab = cate;
        $('#stricker_content')[0].scrollTo(0, 0);
        $('#emoji_type_' + cate).css('display', 'flex');
    },

    addToHistory_emoji: (s) => {
        var a = g_stricker_options.hisoty_emoji || [];
        var i = a.indexOf(s);
        if (i != -1) a.splice(i, 1);
        a.splice(0, 0, s);
        if (a.length > 20) a.pop();
        g_stricker_options.hisoty_emoji = a;
        local_saveJson('stricker_options', g_stricker_options);
    },
    getEditor: () => {
    	if(g_emoji.targetId == '#msg'){
        	return g_chat.editor;
        }else{
        	return g_question.editor.txt;
        }
    },
    registerAction: () => {

        registerAction('emoji_send', (dom, action, params) => {
            var d = $(dom).find('img');
            if (d.length) {
                key = d.attr('src');
                s = '<img class="emoji_ align-middle" width="16px" style="position: relative;top: -1px;margin: 3px;" src="' + key + '">';
            } else {
                key = dom.innerText;
                s = '<span class="emoji_">' + key + '</span>';
            }

            var editor = g_emoji.getEditor();
            if(g_emoji.targetId == '#msg'){
            	g_emoji.addToHistory_emoji(key);
	            g_emoji.initHistoryEmoji();
	            if (g_emoji.toPin) { // pin到消息
	                g_chat.pin_to_msg(g_chat.rm_showing, s);
	                g_emoji.hide();
	                return;
	            }
            }
               editor.editor.txt.append(s);
                editor.editor.txt.eventHooks.imgClickEvents = []; // 清除点击输入框图片会显示选项
        });
        registerAction('stricker_toEmoji', (dom, action, params) => {
            g_emoji.loadEmojiCate(action[1]);
        });
        registerAction('stricker_toType', (dom, action, params) => {
            if (!g_emoji.list[action[1]]) {
                switch (action[1]) {
                    case 'stricker':
                        initStrickers();
                        if (g_stricker_options.last.id != '') {
                            var btn = $('[data-action="stricker_toTab"][data-id="' + g_stricker_options.last.id + '"]')[0];
                            if (btn) {
                                btn.click();
                                btn.scrollIntoView();
                            }
                        }
                        for (var img of $('#stricker_tabs .loading')) {
                            reloadImage(img);
                        }
                        break;

                    case 'emoji':
                        g_emoji.loadEmojis('all');
                        break;
                }
            }
            $('.emoji_active').removeClass('emoji_active');
            $(dom).addClass('emoji_active');
            for (var div of $('.emoji_content')) {
                if (div.id == 'emoji_content_' + action[1]) {
                    $(div).show();
                } else {
                    $(div).hide();
                }
            }
            for (var div of $('.emoji_tab')) {
                if (div.id == 'emoji_tab_' + action[1]) {
                    $(div).css('display', 'flex');
                } else {
                    $(div).css('display', 'none');
                }
            }
            for (var div of $('.emoji_nav')) {
                if (div.id == 'emoji_nav_' + action[1]) {
                    $(div).show();
                } else {
                    $(div).hide();
                }
            }

        });
        registerAction('sendStricker', (dom, action, params) => {
            var img = $('.selected').attr('src');
            if (img.indexOf('img/reload.png') != -1) {
                toastPAlert('読み込み中', 'alert-secondary');
                return;
            }
            sendStricker();
            $('#stricker_footer').hide();
            g_emoji.hide();
            local_saveJson('stricker_options', g_stricker_options); // 保存最后选择的贴图
        });
        registerAction('previewStricker_bottom', (dom, action, params) => {
            if (dom.src.indexOf('img/reload.png') != -1) {
                dom.src = $(dom).attr('data-src');
                reloadImage(dom);
            } else {
                if (!$(dom).hasClass('selected')) {
                    checkStrickerMeta($(dom).attr('data-id'), $(dom).attr('data-sid'), dom);
                    $(dom).addClass('selected');
                    return;
                }
                $('#msg').val('');
                sendStricker();
            }
        });
        registerAction('previewStricker', (dom, action, params) => {
            if (dom.src.indexOf('img/reload.png') != -1) {
                dom.src = $(dom).attr('data-src');
                reloadImage(dom);
            } else {
                if ($(dom).hasClass('selected')) {
                    sendStricker();
                    g_emoji.hide();

                    return;
                }
                $('.selected').removeClass('selected');
                $(dom).addClass('selected');

                var sid = $(dom).attr('data-sid');
                g_stricker_options.last.sid = sid;

                reloadImage($('#stricker_footer').css('display', 'flex').find('img').attr({
                    'data-src': dom.src,
                    'data-id': g_stricker_options.last.id,
                    'data-sid': sid,
                })[0]);


                checkStrickerMeta(g_stricker_options.last.id, sid, $('#stricker_footer img'));

                var key = ($(dom).attr('data-id') || g_stricker_options.last.id) + ',' + g_stricker_options.last.sid;
                $('#modal-stricker input[type=checkbox]').prop('checked', g_stricker_options.likes.indexOf(key) != -1)
                $('#modal-stricker textarea').val(g_stricker_options.tags[key] != undefined ? g_stricker_options.tags[key] : '');
            }
        });
        registerAction('stricker_toTab', (dom, action, params) => {
            $('.selected').removeClass('selected');
            g_cache.reloadImage = [];
            clearInterval(g_cache.reloadImage_timer);
            g_cache.reloadImage_timer = 0;

            $('[data-action="stricker_toTab"].stricker_active').removeClass('stricker_active')
            $(dom).addClass('stricker_active');


            var id = $(dom).attr('data-id');
            $('[data-action="stricker_delete"], [data-action="stricker_left"], [data-action="stricker_right"], [data-action="stricker_openURL"]').css('display', ['like', 'search'].indexOf(id) != -1 ? 'none' : 'unset')
            $('#modal-stricker .modal-title span').html(id == 'like' ? 'お気に入り' : id == 'search' ? '検索' : id == 'history' ? '歴史' : g_stricker['id_' + id].name);

            for (var div of $('.stricker_content')) {
                if (div.id == 'stricker_' + id) {
                    g_stricker_options.last.id = id;
                    for (var img of $(div).show().find('.loading')) {
                        reloadImage(img);
                    }
                } else {
                    $(div).hide();
                }
            }
        });

        registerAction('stricker_openURL', (dom, action, params) => {
            if (parseInt(g_stricker_options.last.id) > 0) {
                window.open('https://store.line.me/stickershop/product/' + g_stricker_options.last.id, '_blank');
            }

        });
        registerAction('addStrick', (dom, action, params) => {
            confirm('[' + $(dom).attr('data-title') + '] を追加しますか?').then((d) => {
                if (d.button == 'ok') {
                    queryStricker($(dom).attr('data-id'));
                }
            });
        });

        registerAction('show_stricker_search', (dom, action, params) => {
            prompt('キーワード&URL', 'kizuna').then((d) => {
                if (d.text != '') {
                    searchStrick(search);
                }
            });
        });

        registerAction('pin_to_msg_confirm', (dom, action, params) => {
            prompt(_l('pin到消息')).then((d) => {
                if (d.text != '') {
                    g_emoji.hide();
                    if (d.text.length == 2 && /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi.test(d.text)) {
                        g_emoji.addToHistory_emoji(d.text);
                    }
                    g_chat.rm.css('display', 'none');

                    for (var id of g_chat.rm_showing) {
                        g_chat.pin_to_msg(id, d.text);

                    }

                }
            })
        });
        registerAction('show_stricker', (dom, action, params) => {
            if (g_emoji.isShowing()) {
                g_emoji.hide();
            } else {
            		g_emoji.targetId = action[1];
                g_emoji.toPin = action.length > 2;
                if (g_emoji.toPin) {
                    g_chat.rm.css('display', 'none');
                }
                $('#stricker_footer').css('display', 'none');
                g_emoji.show();
                if (!g_emoji.lastEmojiTab) {
                    setTimeout(() => {
                        $('[data-action="stricker_toType,emoji"]').click();
                    }, 500);
                }
            }
        });

    },
    initHistoryEmoji: () => {
        var a = g_stricker_options.hisoty_emoji || ['😀', '😂', '🤣', '😅', '😭', '😵', '🤩'];

        var h = '<i data-action="show_stricker,#msg,pin" class="fa fa-ellipsis-v text-dark font-size-20 m-5" aria-hidden="true" style="padding: 3px"></i><i data-action="pin_to_msg_confirm" class="fa fa-edit text-dark font-size-20 m-5" aria-hidden="true" style="padding: 3px"></i>';

        var action = 'data-action="emoji_select"';
        for (var s of a) {
            h += s.indexOf('.') != -1 ? '<img '+action+' style="width: 23px;margin: 5px;height:23px;" src="' + s + '">' : '<span '+action+'>' + s + '</span>';
        }
        $('#emoji_recent').html(h);
    },
    prompt: () => {
        $(`<div id="modal-stricker" style="border-top: 1px solid #bbbbbb;position: fixed;bottom: 0;left:0;width: 100%;z-index: 99999; display: none;">
        <div>
            <div class="p-10 theme">
                <div class="w-full mx-auto h-50">
                		<div id="emoji_nav_stricker" class="emoji_nav row" style="display: none;">
	                    <h5 class="modal-title text-center col-7">
	                        <span class="text-truncate d-inline-block w-200"></span>
	                    </h5>
	                    <i data-action="stricker_openURL" class="fa fa-external-link-square col-1 font-size-20 text-center h-fit " aria-hidden="true"></i>
	                    <i class="fa fa-trash-o col-1 font-size-20 text-center h-fit " aria-hidden="true" data-action="stricker_delete"></i>
	                    <i class="fa fa-arrow-left col-1 font-size-20 text-center h-fit " aria-hidden="true" data-action="stricker_left"></i>
	                    <i class="fa fa-arrow-right col-1 font-size-20 text-center h-fit " aria-hidden="true" data-action="stricker_right"></i>
	                    <i class="fa fa-search col-1 font-size-20 text-center h-fit " aria-hidden="true" data-action="show_stricker_search"></i>
	                  </div>
                		<div id="emoji_nav_emoji" class="emoji_nav row mb-10">
                				<div class="input-group">
											  <select class="form-control flex-reset w-auto" onchange="g_emoji.loadEmojis(this.value)"> 
											    <option value="" disabled>` + _l('表情类别') + `</option>
											    <option value="twitter">Twitter</option>
											    <option value="google">Google</option>
											    <option value="facebook">Facebook</option>
											    <option value="apple">Apple</option>
											    <option value="all" selected>All</option>
											  </select>
											  <input type="text" class="form-control" placeholder="` + _l('表情搜索') + `">
											   <div class="input-group-append">
											    <button class="btn btn-primary" type="button"><i class="fa fa-search" aria-hidden="true" data-action="show_stricker_search"></i></button>
											  </div>
											</div>
	                  </div>
                </div>

                <div>
                    <div id='stricker_tabs' class="overflow-x-scroll overflow-y-hidden w-full h-50">
	                        <div id="emoji_tab_stricker" class="emoji_tab w-auto h-50 pb-10" style="display: none;" onmousewheel="this.parentElement.scrollBy(event.deltaY, 0)" >
		                            <span class="hide" data-action="stricker_toTab" data-id="search">
		                                <i class="fa fa-search" aria-hidden="true"></i>
		                            </span>

		                            <span data-action="stricker_toTab" data-id="like">
		                                <i class="fa fa-heart" aria-hidden="true"></i>
		                            </span>
		                            <span data-action="stricker_toTab" data-id="history">
		                                <i class="fa fa-history" aria-hidden="true"></i>
		                            </span>
		                        </div>
		                       <div id="emoji_tab_emoji" class="emoji_tab w-80 h-50 pb-10" style="display: none;justify-content: center;font-size:20px" onmousewheel="this.parentElement.scrollBy(event.deltaY, 0)" >
		                       		
                        			</div>
                    </div>
                    <div id='stricker_content' class="overflow-auto w-full h-200 mt-2">
                    	<div class="emoji_content" id="emoji_content_stricker">
	                        <div id='stricker_search' class="row w-full h-200 stricker_content" style="align-items: center;display: none;">
	                        </div>
	                        <div id='stricker_like' class="row w-full h-200 stricker_content" style="align-items: center;display: none;">
	                        </div>
	                        <div id='stricker_history' class="row w-full h-200 stricker_content" style="align-items: center;display: none;">
	                        </div>
                        </div>
                        <div class="emoji_content pt-10" style="display: none;" id="emoji_content_emoji">
	                        <div id='emoji_type_like' class="row w-full h-200 emoji_type" style="align-items: center;display: none;">
		                        </div>

                       
                        </div>
                    </div>
                    <div id='stricker_footer' class="row w-full mt-10">
                        <div class="col-4 p-10">
                            <img class="border rounded" src='http://dl.stickershop.line.naver.jp/products/0/0/100/1/android/stickers/1.png'>
                            <div class="custom-switch mt-10">
                                    <input type="checkbox" id="checkbox_like" onchange="likeStrickerImg(this)">
                                    <label for="checkbox_like">お気に入り</label>
                                </div>
                        </div>
                        <div class="col-8">
                            <div class="form-group">
                                <label for="tags">タグ</label>
                                <textarea class="form-control" id="tags" placeholder="可愛い,笑顔" oninput="stricker_saveTags(this)"></textarea>
                            </div>
                            <div class="form-group">
                                
                                <button class="btn btn-primary float-right" type="button" data-action="sendStricker">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id='stricker_bottom' class="row w-full mt-10 font-size-20">
                        <div class="col-1">
                           <i class="fa fa-cog" aria-hidden="true"></i>
                    		</div>
                    		<div class="col-9">
                    			<div id='stricker_types' class="overflow-x-scroll overflow-y-hidden w-full h-50">
		                        <div class="w-auto h-50 pb-10" style="display: flex;justify-content: center;font-size:20px" onmousewheel="this.parentElement.scrollBy(event.deltaY, 0)" >
		                            <span class="emoji_active" data-action="stricker_toType,emoji">😀</span>
		                            <span data-action="stricker_toType,stricker">🖼</span>
		                        </div>
                    			</div>
                    		</div>
                    		<div class="col-1 text-right">
                           <i class="fa fa-arrow-left" aria-hidden="true" onclick="$('[data-title=撤销]').click()"></i>
                    		</div>
                    		<div class="col-1 text-right">
                           <i class="fa fa-close" aria-hidden="true" onclick="g_emoji.hide()"></i>
                    		</div>
                    </div>

                </div>
            </div>
        </div>
    </div>`).appendTo('.content-wrapper');

        // <i class="fa fa-close" onclick="g_emoji.hide();" aria-hidden="true"></i>
        // doAction(null, 'show_stricker');
    }
}


function checkStrickerMeta(id, sid, img) {
    var pic;
    data = {
        id: id,
        sid: sid,
        img: $(img).attr('data-src'),
    };
    if (g_stricker['id_' + id]) {
        if (g_stricker['id_' + id]['hasAnimation']) {
            pic = 'http://dl.stickershop.line.naver.jp/products/0/0/1/' + id + '/android/animation/' + sid + '.png';
            data.animation = pic;
            reloadImage($(img).attr('data-src', pic)[0]);
        }
        if (g_stricker['id_' + id]['hasSound']) {
            data.audio = 'http://dl.stickershop.line.naver.jp/products/0/0/1/' + id + '/android/sound/' + sid + '.m4a';
            _audio_stricker.src = data.audio;
            _audio_stricker.img = pic || $(img).attr('data-src');
        }
    }

    g_cache.strick_last = data;
}

function sendStricker() {
    var d = g_cache.strick_last;
    var img = d.animation || d.img;
    var key = d.id + ',' + d.sid;

    // 保存历史记录
    var i = g_stricker_options.history.indexOf(key);
    if (i != -1) g_stricker_options.history.splice(i, 1);
    g_stricker_options.history.splice(0, 0, key);
    if (g_stricker_options.history.length > 100) {
        g_stricker_options.history.pop();
    }
    local_saveJson('stricker_options', g_stricker_options);
    stricker_initHistory();



    if (g_emoji.toPin) { // pin到消息
        var c = { img: img };
        if (d.audio) c.audio = d.audio;
        g_chat.pin_to_msg(g_chat.rm_showing, JSON.stringify(c));
        g_emoji.hide();
    } else {
        var id = 'emoji_thumb_' + new Date().getTime();
        var img = `<img class="emoji_ thumb" id="` + id + `" src="` + img + `"`
        if (d.audio) {
            img += ' data-audio="' + d.audio + '"'
        }
        img += '>';
        g_emoji.getEditor().editor.txt.append(img);
        
    }

    // setTimeout(() => {
    // 	reloadImage($('#'+id)[0]);
    // }, 1000);

    $('#bottom_stricker').hide();
}

function reloadImage(img) {
    img.src = img.getAttribute('data-src');
    imagesLoaded(img).on('progress', function(instance, image) {
        var index = g_cache.reloadImage.indexOf(image.img);
        if (!image.isLoaded) {
            image.img.src = 'img/reload.png';
            if (index == -1) g_cache.reloadImage.push(image.img);
            if (!g_cache.reloadImage_timer) {
                g_cache.reloadImage_timer = setInterval(() => {
                    for (var img of g_cache.reloadImage) {
                        reloadImage(img);
                    }
                }, 2000);
            }
            return;
        }
        img.classList.remove('loading');
        if (index != -1) g_cache.reloadImage.splice(index, 1);
        if (g_cache.reloadImage.length == 0) {
            clearInterval(g_cache.reloadImage_timer);
            g_cache.reloadImage_timer = 0;
        }
    });
}


function searchStrick(keyword) {
    var id = cutString(keyword + '/', 'product/', '/');
    if (id != '') {
        queryStricker(id);
        return;
    }
    $.getJSON(g_api + 'stricker.php?type=search&s=' + keyword, function(json, textStatus) {
        if (textStatus == 'success') {
            var h = '';
            for (var detail of json) {
                h += `
                <div class="col-4" data-action="addStrick" data-title='` + detail['name'] + `' data-id="` + detail['id'] + `">
                    <img src='` + detail['icon'] + `' title='` + detail['name'] + `'>    
                `;
                if (detail['hasAnimation'] || detail['hasSound']) {
                    h += '<span class="badge-group float-right">';
                    if (detail['hasAnimation']) {
                        h += '<span class="badge badge-primary"><i class="fa fa-volume-down" aria-hidden="true"></i></span>';
                    }
                    if (detail['hasSound']) {
                        h += '<span class="badge badge-primary"><i class="fa fa-play" aria-hidden="true"></i></span>';
                    }
                    h += '</span>';
                }
                h += '</div>';
            }
            $('#stricker_search').html(h);
            $('.btn[data-id="search"]').show().click();
        }
    });
}

function queryStricker(id, alert = true) {
    $.getJSON(g_api + 'stricker.php?type=ids&id=' + id, function(json, textStatus) {
        if (textStatus == 'success') {
            g_stricker['id_' + id] = json;
            local_saveJson('stricker', g_stricker);

            addStrick(json, alert);
            if (alert) toastPAlert('追加に成功しました', 3000, '', 'alert-success');
        } else {
            if (alert) toastPAlert('もう一度試してください', 3000, '', 'alert-secondary');
        }
    });
}

function addStrick(data, active = false) {
    var btn = $(`
    <span data-action="stricker_toTab" data-id="` + data.id + `">
        <img class="loading" data-src='https://sdl-stickershop.line.naver.jp/products/0/0/1/` + data.id + `/android/main.png'>
    </span>
    `);
    $('#emoji_tab_stricker').append(btn)[0];
    var h = `<div id='stricker_` + data.id + `' class="row w-full h-200 stricker_content" style="align-items: center; display:none">`;
    for (var id of data.stickers) {
        h += getStrickerHTML(data.id, id);
    }
    $('#emoji_content_stricker').append(h + '</div>');
    if (active) {
        var tabs = $('#emoji_tab_stricker')[0];
        tabs.scrollTo(tabs.scrollWidth, 0);
        btn.click();
    }
}

function getStrickerHTML(id, sid, fromLike = false) {
    return `
        <div class="col-4">
            <img class="loading"` + (fromLike ? ' data-id="' + id + '"' : '') + ` data-sid="` + sid + `" data-action="previewStricker" data-src='http://dl.stickershop.line.naver.jp/products/0/0/1/` + id + `/android/stickers/` + sid + `.png'>
        </div>
        `;
}

function getStrickerHTML_bottom(id, sid) {
    var url = `http://dl.stickershop.line.naver.jp/products/0/0/1/` + id + `/android/stickers/` + sid + `.png`;
    return `
        <div class="col-4">
            <img data-id="` + id + `" data-sid="` + sid + `" data-action="previewStricker_bottom" data-src='` + url + `' src='` + url + `'>
        </div>
        `;
}

function likeStrickerImg(switcher) {
    var img = $('#stricker_footer img');
    var id = $(img).attr('data-id');
    var sid = $(img).attr('data-sid');
    var key = id + ',' + sid;
    var index = g_stricker_options.likes.indexOf(key);
    var save = false;
    if (switcher.checked) {
        if (index == -1) {
            g_stricker_options.likes.push(key);
            save = true;
            $('#stricker_like').prepend(getStrickerHTML(id, sid));
        }
    } else {
        if (index != -1) {
            g_stricker_options.likes.splice(index, 1);
            save = true;
        }
    }
    if (save) {
        local_saveJson('stricker_options', g_stricker_options);
    }
}

function stricker_saveTags(textarea) {
    var img = $('#stricker_footer img');
    var text = textarea.value;
    var key = $(img).attr('data-id') + ',' + $(img).attr('data-sid');
    if (g_cache.saveTag.timer) clearTimeout(g_cache.saveTag.timer);
    g_cache.saveTag = {
        text: text,
        key: key,
        timer: setTimeout(() => {
            var text = g_cache.saveTag.text;
            var key = g_cache.saveTag.key;
            var exists = g_stricker_options.tags[key] != undefined;
            if (text == '') {
                if (!exists) {
                    return;
                }
                delete g_stricker_options.tags[key];
            } else {
                if (exists && g_stricker_options.tags[key] == text) {
                    return;
                }
                g_stricker_options.tags[key] = text;
            }
            local_saveJson('stricker_options', g_stricker_options);
            g_cache.tags = Object.entries(g_stricker_options.tags);
        }, 1000)
    }
}

function checkStrickerTags(textarea) {
    // setTyping(g_config.user.name);
    queryMsg({ type: 'typing' }, true);
    var h = '';
    var text = textarea.value;
    if (text != '') {
        for (var tag of g_cache.tags) {
            if (tag[1].indexOf(text) != -1) {
                var args = tag[0].split(',');
                h += getStrickerHTML_bottom(args[0], args[1]);
            }
        }
    }
    if (h != '') {
        $('#bottom_stricker').show().find('.row').html(h);
    } else {
        $('#bottom_stricker').hide();
    }
}

function initStrickers() {

    if (!g_cache.strickerInited) {
        g_cache.tags = Object.entries(g_stricker_options.tags);
        for (var id in g_stricker) {
            addStrick(g_stricker[id]);
        }
        var h = '';
        for (var key of g_stricker_options.likes) {
            var args = key.split(',');
            h += getStrickerHTML(args[0], args[1], true);
        }
        $('#stricker_like').html(h);

        stricker_initHistory();
        g_cache.strickerInited = true;
    }
}

function stricker_initHistory() {
    var h = '';
    if (g_stricker_options.history == undefined) g_stricker_options.history = [];
    for (var key of g_stricker_options.history) {
        var args = key.split(',');
        h += getStrickerHTML(args[0], args[1], true);
    }
    $('#stricker_history').html(h);
}


g_emoji.init();