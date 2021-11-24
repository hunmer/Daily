g_voice = {
    dom: undefined,
    list: [],
    index: -1,
    type: 'moe',
    timeupdate: () => {
        var _tips;
        setInterval(() => {
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            var w = [1, 2, 3, 4, 5].indexOf(d.getDay()) > 0;
            switch (h + ':' + m + ':' + s) {
                case '6:30:0':
                    if (!w) {
                        _tips = {
                            10: '起きて～遅刻するよ！',
                            20: 'ねぇねぇ～朝ご飯さめちゃうよ！',
                            30: 'もう七時だよ？大丈夫？'
                        }
                        playerVoice('おはよう～朝だよ！起きて～');
                    }
                    break;
                case '7:30:0':
                    if (w) {
                        _tips = {
                            10: '起きて～起きて～',
                            20: '週末の朝気持ちいいよ！',
                            30: 'せっかくの休みおわちゃうよ！?'
                        }
                        playerVoice('おはよう～朝だよ！起きて～');
                    }
                    break;
                case '11:30:0':
                    _tips = {
                        10: '何を食べるのかまだ決まってないの？',
                        20: 'お腹空いてないの？',
                        30: 'ちゃんと食べないとダメだよ！?'
                    }
                    playerVoice('お疲れ様です～昼ご飯の時間だよ');
                    break;
                case '18:30:0':
                    _tips = {
                        10: '何を食べるのかまだ決まってないの？',
                        20: 'お腹空いてないの？',
                        30: 'ちゃんと食べないとダメだよ！?'
                    }
                    playerVoice('お疲れ様です～晩ご飯の時間だよ');
                    break;
                case '0:0:0':
                    if (w) {
                        _tips = {
                            10: '明日まだ頑張ろうよ～',
                            20: '眠たくないの？',
                            30: '明日起きないよ！？'
                        }
                        playerVoice('あーもうこんな時間！そろそろ寝ないと～');
                    }
                    break;
                case '1:30:0':
                    if (!w) {
                        _tips = {
                            10: '明日まだ頑張ろうよ～',
                            20: '眠たくないの？',
                            30: 'ちゃんと睡眠時間を取らないとダメだよ！?'
                        }
                        playerVoice('あーもうこんな時間！そろそろ寝ないと～');
                    }
                    break;
            }
        }, 1000);
    },
    arr: () => {
        moe: {

        }
    },
    init: () => {
        if (!g_voice.dom) {
            g_voice.dom = $('<audio autoplay></audio>').appendTo('body')[0];
            g_voice.dom.onended = (e) => {
                g_voice.next();
            }
        }
        $('#nosleep')[0].volume = 0;
        setInterval(() => {
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            if (s % 10 == 0) {
                $('#nosleep')[0].play();
            }
            var i = parseInt((new Date().getTime() - g_config.active_last) / 1000);
            if(i % 600 == 0){
              g_voice.playSec(i);
            }
            if( g_active.lastTime)
            if (h >= 6 && m >= 30 || h < 2) {
                if (m % 10 == 0 && s == 0 && g_voice.dom.paused) {
                    g_voice.now();
                    startVibrate(300);
                }
            }
        }, 1000);
    },

    playSec: (sec) => {
        var fun = (i, type, list) => {
            if(!i) return;
            var s1;
            if(type == 'hour'){
                s1 = 'ji'
            }else
             if(type == 'min'){
                s1 = 'pun'
            }
            if(i % 5 == 0){
                list.push('jihou_'+i+s1+'_01');
            }else{
                list.push('num/'+i+'.wav');
                 list.push('num/'+type+'.mp3');
            }

        }
        //var sec = 600 * 60 + 17 * 60;
        var r = parseTime(sec);
        if(r.day) return;
        console.log(r);
        var list = ['tip_line', 'jikandeesu_0'+randNum(1, 3)];
        fun(r.h, 'hour', list);
        fun(r.m, 'min', list);
        //fun(r.s, 'sec', list);
        list.push('tachimashita_01');
        g_voice.setList(list);
    },
    play: (src) => {
        console.log('start play : ' + src);
        if (typeof(src) == 'object') {
            setTimeout(() => {
                g_voice.next();
            }, parseInt(src[0]))
        } else {
            if(src.indexOf('.wav') == -1 & src.indexOf('.mp3') == -1){
                src += '.wav';
            }
            g_voice.dom.src = './res/msg/'+g_voice.type+'/' + src ;
            // g_voice.dom.playbackRate = 1.25;
        }
    },
    now: () => {
        var date = new Date();
        var h = date.getHours();
        // arrayRandom(['ano_01', 'anone_01', 'anoneanone_01']),
        var r = ['tip_line', 'wooshiraseshimasu_0'+randNum(1, 4), 'jihou_tadaima_0'+randNum(1, 2), 'jihou_'+(h > 12 ? 'gogo' : 'gozen'), 'jihou_'+(h>12?h-12:h)+'ji_01', 'jihou_'+date.getMinutes()+'pun_01'];
        g_voice.setList(r);
    },
    parse: (num, r = [], e = []) => {
        var a = [1000000, 900000, 800000, 700000, 600000, 500000, 400000, 300000, 200000, 100000, 90000, 80000, 70000, 60000, 50000, 40000, 30000, 20000, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        for (var i of a) {
            if (num >= i) {
                num -= i;
                r.push(i);
            }
        }
        for (var d of e) r.push(d);
        return r;
    },
    number: (num, r = [], e = []) => {
        r = g_voice.parse(num, r, e);
        g_voice.setList(r);
    },
    setList: (arr) => {
        console.log(arr);
        g_voice.list = arr;
        g_voice.index = -1;
        g_voice.next();
    },
    next: () => {
        if (g_voice.index >= g_voice.list.length - 1) {
            return;
        }
        g_voice.play(g_voice.list[++g_voice.index]);
    },
    system: (msg) => {

    }
}
g_voice.init();
// g_voice.number(54212);
// g_voice.number(15, ['now'], ['hour','desu']);
// g_voice.now();

// g_voice.number(15, ['left'], ['min','desu']);