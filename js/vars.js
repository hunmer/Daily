var _GET = getGETArray();
var _vars
if (0) {
    _vars = {
        img: 'http://' + location.host + '/Daily-websocket/',
        socket: 'ws:///' + location.host + ':8000'
    }
} else {
    _vars = {
        img: 'https://daily-websock1.glitch.me/',
        socket: 'wss:///daily-websock1.glitch.me'
    }
}

var g_localKey = 'lifeRPG';

var g_cache = {
    closeCustom: () => {},
    closeCustom1: () => {},
    closeTopCustom: () => {},
    query: [],
    lastScroll: 0,
    date_scroll: '',
    ranking_sort: 'msgs',
    reloadImage: [],
    strickerInited: false,
    reloadImage_timer: 0,
}
var g_down = {

}
var g_stricker;
var g_stricker_options;
var g_config = local_readJson('config', {
    debug: false,
    countdown_dailyLess: 86400,
});
var g_progressData;
var g_dailys;
var g_days;
var g_chats;
var g_times;
var g_lists;
var g_todos;
var g_questions;
var g_icons;

