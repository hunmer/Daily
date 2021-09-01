window.history.pushState(null, null, "#");
window.addEventListener("popstate", function(event) {
    //  if (_viewer && _viewer.isShown) {
    //     _viewer.hide();
    // }else
    back();
    window.history.pushState(null, null, "#");
    event.preventDefault(true);
    event.stopPropagation();
});

var g_cache = {
    closeCustom: () => {},
    closeCustom1: () => {},
}

function back(){
    if($('.modal.show').length){
        halfmoon.toggleModal($('.modal.show')[0].id);
    }else
    if(hideSidebar()) {
    }else
    if(g_cache.showing != undefined){
        g_cache.showing = undefined;
        $('[data-action="toTab,chatList"]')[0].click();
    }else{
        if(confirm('終了しますか？')){
            toastPAlert('よろしいですか？!', 1000, '', 'alert-danger');
            return;
        }
    }
}
$(function() {
    $(document).on('click', '[data-action]', function(event) {
        doAction($(this), $(this).attr('data-action'));
    })
});

function doAction(dom, action, params) {
    var action = action.split(',');
    if (g_actions[action[0]]) {
        return g_actions[action[0]](dom, action, params)
    }
    switch (action[0]) {
        case 'toTab':
        	if($('#page-wrapper').attr('data-sidebar-hidden') != "hidden"){
        		halfmoon.toggleSidebar();
        	}
        	showContent(action[1]);
            
        	break;
        case 'back':
            back();
            break;

         case 'darkMode':
            halfmoon.toggleDarkMode();
            var i = $(dom).find('i');
            if (!$('body').hasClass('dark-mode')) {
                i.attr('class', 'fa fa-moon-o');
            } else {
                i.attr('class', 'fa fa-sun-o');
            }
            break;
    }
}

function toBottom(dom){
    $('.content-wrapper')[0].scrollTo(0, dom[0].scrollHeight)
}


function showContent(id) {
	g_cache.showing = id;
	var t = '';
	switch(id){
		case 'time':
			t = _l('标题_计时');
			break;

		case 'chatList':
			t = _l('标题_聊天列表');
			break;

		case 'progress':
			t = _l('标题_进度');
			break;

		case 'daily':
			t = _l('标题_日常');
			break;

		case 'countdown':
			t = _l('标题_倒计时');
			break;
	}
    $('.sidebar-menu .active').removeClass('active');
    $('.sidebar-menu [data-action="toTab,'+id+'"]').addClass('active');
	$('.navbar-brand').html(t);
    $('.navbar-nav').html('');
    for (var con of $('._content')) {
        if (con.id == 'content_' + id) {
            $(con).show();
        } else {
            $(con).hide();
        }
    }
    $(window).resize();
    for (var con of $('.toolbar')) {
    	// && $(con).html() != ''
        if (con.id == 'bottom_' + id) {
            $(con).show();
        } else {
            $(con).hide();
        }
    }
}