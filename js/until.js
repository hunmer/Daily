

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
    switch (i) {
        case 0:
            return _s(date.getHours()) + ':' + _s(date.getMinutes());
        case 1:
            return date.getMonth() + 1 + '/' + date.getDate() + ' ' + _s(date.getHours()) + ':' + _s(date.getMinutes());
        case 2:
            return date.getMonth() + 1 + '/' + date.getDate();
        case 3:
            return date.getFullYear()+'_'+(Number(date.getMonth())+1)+'_'+date.getDate();
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
                callback(g_down.element);
            }
            g_down.start = 0;
            g_down.task = -1;
            event.originalEvent.preventDefault(true);
            event.originalEvent.stopPropagation();
        }, 1000);
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
        event.originalEvent.preventDefault(true);
        event.originalEvent.stopPropagation();
        g_down.element = $(this);
       callback(g_down.element);
    });
}

