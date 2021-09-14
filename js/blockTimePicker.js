var g_scroll = {
    datas: {},
    scrolls: {},
    values: {},
    init: () => {
        insertStyle(`

    .scroll_wrapper {
        position: absolute;
        z-index: 1;
        height: inherit;
        left: 0;
        overflow: hidden;
        top: 100px;
    }

    .scroller {
        position: absolute;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        width: 100%;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -o-text-size-adjust: none;
        text-size-adjust: none;
    }

    .scroller ul {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
        text-align: center;
    }

    .scroller li {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        /*border-bottom: 1px solid #ccc;
                border-top: 1px solid #fff;*/
        font-size: 14px;
    }

    .timePicker_mark {
        position: absolute;
        top: 40px;
        background-color: #ccc6;
        width: 100%;
        height: 40px;
    }
`);
    },
    loadData: (selector, datas, callback) => {
        var h = '';
        var ids = [];
        var max = Object.keys(datas).length;
        var width = (100 - 10) / max;
        var left = 0;
        for (var id in datas) {
            g_scroll.datas[id] = datas[id];
            h += `
                <div class="scroll_wrapper" id="scroller_` + id + `" style="width: ` + width + `%;left: ` + left + `%;">
                    <div class="scroller">
                        <ul>
            `;
            for (var item of datas[id].items) {
                h += `<li>` + item + `</li>`;
            }
            h += '</ul></div></div>';
            ids.push(id);
            left += width;
            if (ids.length == max / 2) {
                left += 10;
            }
        }
        $(selector).html(h);
        for (var id of ids) {

            var scroll = new IScroll('#scroller_' + id, {
                mouseWheel: true,
                snap: true,
                hScrollbar: true,
                vScrollbar: true,
            });
            scroll.id = id;
            scroll.on('scrollEnd', function() {
                return;
                var value = this.currentPage.pageY + 1;
                g_scroll.values[this.id] = value;
                var fun = g_scroll.datas[this.id].onSelect;
                if (typeof(fun) == 'function') {
                    fun(value);
                }
                if (typeof(callback) == 'function') {
                    var ret = {};
                    for (var _id of ids) {
                        ret[_id] = g_scroll.values[_id];
                    }
                    callback(ret);
                }
            });
            g_scroll.scrolls[id] = scroll;
            if (datas[id].defaluValue) {
                var selected = datas[id].defaluValue;
                // scroll.goToPage(0, selected, 0);
                g_scroll.values[id] = selected;
            }
            $('#scroller_' + id).append('<div class="timePicker_mark"></div>')

        }
    }
}

g_scroll.init();