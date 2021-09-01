var g_choose = {
	icon: {
		init: () => {
			var h = `
			<div class="row" id="icon_list">
			`;
			for(var icon of g_icons){
				h += '<div class="col-2 text-center"><i data-icon="'+icon+'" data-action="select_icon" class="fa '+icon+' icon_small mb-10" aria-hidden="true"></i></div>';
			}
			  $('#modal-custom-1').find('.modal-title').html(_l('弹出_图标选择_标题'));
        $('#modal-custom-1').attr('data-type', 'icon').find('.modal-html').html(h);
        halfmoon.toggleModal('modal-custom-1');

        registerAction('select_icon', (dom, action, params) => {
        	if($(dom).hasClass('bg-primary')){
        		var d = $('#chatList_add_icon');
        		var icon = $(dom).attr('data-icon');
        		d.removeClass(d.attr('data-icon')).attr('data-icon', icon).addClass(icon);
        		$('#modal-custom-1').attr('data-type', null).find('.modal-html').html('');
        		halfmoon.toggleModal('modal-custom-1');

        		return;
        	}
        	$('#icon_list i.bg-primary').removeClass('bg-primary');
        	$(dom).addClass('bg-primary')
        });
		}
	}
}

// g_choose.icon.init();