var g_choose = {
	icon: {
		init: () => {
			var h = `
			<div class="row" id="icon_list">
                        <input class="form-control w-12 m-10" placeholder="`+_l('弹出_图标选择_搜索')+`" oninput="g_choose.search(this.value)">
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
        		d.find('i').removeClass(d.attr('data-icon')).attr('data-icon', icon).addClass(icon).show();
                        $('#chatList_add_icon img').hide();
        		$('#modal-custom-1').attr('data-type', null).find('.modal-html').html('');
        		halfmoon.toggleModal('modal-custom-1');

        		return;
        	}
        	$('#icon_list i.bg-primary').removeClass('bg-primary');
        	$(dom).addClass('bg-primary')
        });
		}
	},
        search: (s) => {
                for(var d of $('[data-action="select_icon"]')){
                        d=$(d);
                        d.parent().css('display', d.attr('data-icon').indexOf(s) != -1 ? 'unset' : 'none');
                }
        }
}

// g_choose.icon.init();