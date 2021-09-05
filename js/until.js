// var _error = console.context().error;
// console.context().error = () => {
//     alert(JSON.stringify(arguments));
//     _error(arguments);
// }
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

 function loadRes(files, callback) {
    var i = 0;
    for (var file of files) {
        if (file.type == "js") {
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", file.url)
        } else if (file.type == "css" || file.type == "cssText") {
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", file.url)
        }
        document.getElementsByTagName("head")[0].appendChild(fileref).onload = function() {
            //window.plugin_musicPlayer.res.push(fileref);
            if (++i == files.length) {
                if (typeof callback == 'function') callback();
            }
        }

    }
}

function local_saveJson(key, data) {
    if (window.localStorage) {
        key = g_localKey + key;
        data = JSON.stringify(data);
        if (data == undefined) data = '[]';
        return localStorage.setItem(key, data);
    }
    return false;
}

function local_readJson(key, defaul = '') {
    if (!window.localStorage) return defaul;
    key = g_localKey + key;
    var r = JSON.parse(localStorage.getItem(key));
    return r === null ? defaul : r;
}

function getGETArray() {
    var a_result = [], a_exp;
    var a_params = window.location.search.slice(1).split('&');
    for (var k in a_params) {
        a_exp = a_params[k].split('=');
        if (a_exp.length > 1) {
            a_result[a_exp[0]] = decodeURIComponent(a_exp[1]);
        }
    }
    return a_result;
}

function getFormatedTime(i = 0, date = new Date()) {
    if(typeof(date) != 'object') date = new Date(parseInt(date));
    switch (i) {
        case 0:
            return _s(date.getHours()) + ':' + _s(date.getMinutes());
        case 1:
            return date.getMonth() + 1 + '/' + date.getDate() + ' ' + _s(date.getHours()) + ':' + _s(date.getMinutes());
        case 2:
            return date.getMonth() + 1 + '/' + date.getDate();
        case 3:
            return date.getFullYear()+'_'+(Number(date.getMonth())+1)+'_'+date.getDate();
        case 4: 
            return date.getFullYear() + '/' + (Number(date.getMonth())+1) + '/' + date.getDate();
    }
}

function getLastTime(t1, t2){
    if(t1 instanceof Date) t1 = t1.getTime() / 1000;
    if(!t2) t2 = new Date().getTime() / 1000;
    return getTime(t2-t1);
}

function toastPAlert(msg, type, time, title) {
    halfmoon.initStickyAlert({
        content: msg,
        title: title || '',
        alertType: type || "alert-primary",
        hasDismissButton: false,
        timeShown: time || 3000
    });
}

 function addAnimation(d, x, callback) {
    var c = d.attr('Class');
    if (d.attr('animated') != undefined) {
        d.removeClass(d.attr('animated'))
    }
    d.attr('animated', x).addClass('animated ' + x).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
    
    function() {
        if ($(this).attr('animated') != undefined) {
            $(this).removeClass('animated ' + $(this).attr('animated')).attr('animated', '');
            if (callback != undefined) {
                callback();
            }
        }
    })
}

function _s1(s, j = '') {
    s = parseInt(s);
    return (s == 0 ? '' : (s < 10 ? '0' + s : s) + j);
}

function _s(i, j = '') {
    return (i < 10 ? '0' + i : i) + j;
}

function _s2(s, j = '') {
    s = parseInt(s);
    return (s == 0 ? '' : s + j);
}



function time_getRent(time){
    var s = (parseInt(new Date().getTime()) - time) / 1000;
    if(s >= 84000){
        if(s >= 84000 * 30){
            if(s >= 84000 * 365){
                return getFormatedTime(4, time);
            }
            return getFormatedTime(2, time);
        }
        return parseInt(s / 86400) + '天前';
    }
    // console.log(getTime(s, '时', '分', '秒前'));
    return getFormatedTime(0, time);
}

function getTime(s, sh = '时', sm = '分', ss = '秒') {
    s = Number(s);
    if(s >= 86400){
        return parseInt(s / 86400) + '天';
    }
    var h = 0,
        m = 0;
    if (s >= 3600) {
        h = parseInt(s / 3600);
        s %= 3600;
    }
    if (s >= 60) {
        m = parseInt(s / 60);
        s %= 60;
    }
    return _s1(h, sh) + _s(m, sm) + _s(parseInt(s), ss);
}

function randNum(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
}

function getNow(b = true) {
    var i = new Date().getTime() / 1000;
    if (b) i = parseInt(i);
    return i;
}

function toTime(s) {
    var a = s.split(':');
    if (a.length == 2) {
        a.unshift(0);
    }
    return a[0] * 3600 + a[1] * 60 + a[2] * 1;
}


function removeAnimation(d) {
    var x = d.attr('animated');
    if (x != undefined) {
        d.removeClass('animated ' + x).attr('animated', null);
    }
    return x;
}


function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

function hideSidebar() {
    if ($('#page-wrapper').attr('data-sidebar-hidden') != 'hidden') {
        halfmoon.toggleSidebar();
        return true;
    }
    return false;
}


var g_actions = {};
function registerAction(name, callback){
    g_actions[name] = callback;
}

var g_revices = {};
function registerRevice(name, callback){
    g_revices[name] = callback;
}


function cutString(s_text, s_start, s_end, i_start = 0){
    i_start = s_text.indexOf(s_start, i_start);
    if(i_start === -1) return '';
    i_start += s_start.length;
    i_end = s_text.indexOf(s_end, i_start);
    if(i_end === -1) return '';
    return s_text.substr(i_start, i_end-i_start);
}

function cutStrings(s_text, s_start, s_end, i_start = 0){
    var res = [];
    while(1){
        i_start = s_text.indexOf(s_start, i_start);
        if(i_start === -1) break;
        i_start += s_start.length;
        i_end = s_text.indexOf(s_end, i_start + s_start.length);
        if(i_end === -1) break;
        res.push(s_text.substr(i_start, i_end-i_start));
        i_start = i_end;
    }
    return res;
}

function cutStrings1(s_text, s_start, filter = false){
    var res = [];
    var i_start = 0;
    while(1){
        i_start = s_text.indexOf(s_start, i_start);
        if(i_start === -1) break;
        i_start += s_start.length;
        i_end = s_text.indexOf(s_start, i_start + s_start.length);
        if(i_end === -1) i_end = s_text.length;
        res.push(s_text.substr(i_start, i_end-i_start));
        i_start = i_end;
    }
    if(filter){
        res = Array.from(new Set(res));
    }
    return res;
}
function registerContextMenu(selector, callback){
  $('body')
    .on('touchstart', selector, function(event) {
        
        var dom = $(this);
        g_down.start = getNow();
        g_down.element = dom;
        g_down.task = setTimeout(function() {
            if (g_down.start > 0) {
                g_down.holding = true;
                event.originalEvent.preventDefault(true);
                event.originalEvent.stopPropagation();
                callback(g_down.element, event);
            }
            g_down.start = 0;
            g_down.task = -1;
            
        }, 1500);
    })
    .on('touchend', selector, function(event) {
        if (g_down.task != -1) {
            clearTimeout(g_down.task);
        }
        g_down.start = 0;
        if (g_down.holding) {
            event.originalEvent.preventDefault(true);
            event.originalEvent.stopPropagation();
        }
        g_down.holding = false;
    })
    .on('contextmenu', selector, function(event) {
        var dom = $(this);
        event.originalEvent.preventDefault(true);
        event.originalEvent.stopPropagation();
        g_down.element = dom;
       callback(g_down.element, event);
    });
}

function copyText(text) {
    if(!$('#modal-copy').length){
        $(`<div class="modal" id="modal-copy" tabindex="-1" role="dialog" style="z-index: 99999;">
        <div class="modal-dialog" role="document">
            <div class="modal-content modal-content-media w-500">
                <a class="close" role="button" aria-label="Close" onclick="halfmoon.toggleModal('modal-copy');">
                    <span aria-hidden="true">&times;</span>
                </a>
                <h5 class="modal-title text-center">`+_l('弹出_复制_标题')+`</h5>
                <div class="modal-html"><div class="input-group">
          <textarea class="form-control" id="input_copy">`+text+`</textarea>
        </div>
        <button class="form-control bg-primary btn-block" onclick="$('#input_copy').select();document.execCommand('copy');halfmoon.toggleModal('modal-copy');">`+_l('复制')+`</button>
                </div>
            </div>
        </div>
    </div>`).appendTo('body');
    }
    halfmoon.toggleModal('modal-copy');
}

function closeModal(id, type, fun) {
    var modal = $('#' + id)
    if (modal.hasClass('show')) {
        if (type && modal.attr('data-type') != type) {
            return false;
        }
        if(typeof(fun) == 'function') fun();
        return true;
    }
    return false;
}


function checkInputValue(doms){
    var values = [];
    for(var input of doms){
        if(input.value == ''){
          return input.focus();
        }
        values.push(input.value);
    }
    return values;
}
