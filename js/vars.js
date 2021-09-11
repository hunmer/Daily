var _GET = getGETArray();
// var socket_url = 'wss:///daily-websock.glitch.me';
// var ip = '';
var _vars
if(0){
	_vars = {
		img: 'http://'+location.host+'/Daily-websocket/',
		socket: 'ws:///'+location.host+':8000'
	}
}else{
	_vars = {
		img: 'https://daily-websock.glitch.me/Daily-websocket1/',
		socket: 'wss:///daily-websock1.glitch.me'
	}
}

var g_localKey = 'lifeRPG';
var g_config = local_readJson('config', {
      debug: false,
  });

var g_cache = {
    closeCustom: () => {},
    closeCustom1: () => {},
    closeTopCustom: () => {},
    query: [],
    date_scroll: '',
    ranking_sort: 'msgs',
     reloadImage: [],
     strickerInited: false,
    reloadImage_timer: 0,
}
var g_stricker = local_readJson('stricker', { "id_1202706": { "id": 1202706, "name": "いたわりコーギー2", "author": "株式会社DK", "stickers": [8235812, 8235813, 8235814, 8235815, 8235816, 8235817, 8235818, 8235819, 8235820, 8235821, 8235822, 8235823, 8235824, 8235825, 8235826, 8235827, 8235828, 8235829, 8235830, 8235831, 8235832, 8235833, 8235834, 8235835, 8235836, 8235837, 8235838, 8235839, 8235840, 8235841, 8235842, 8235843, 8235844, 8235845, 8235846, 8235847, 8235848, 8235849, 8235850, 8235851] }, "id_9802": { "id": 9802, "name": "キズナアイ ボイススタンプ", "author": "キズナアイ", "stickers": [22854240, 22854241, 22854242, 22854243, 22854244, 22854245, 22854246, 22854247, 22854248, 22854249, 22854250, 22854251, 22854252, 22854253, 22854254, 22854255, 22854256, 22854257, 22854258, 22854259, 22854260, 22854261, 22854262, 22854263], "hasAnimation": false, "hasSound": true }, "id_1267037": { "id": 1267037, "name": "語彙力がない男子", "author": "株式会社DK", "stickers": [10825944, 10825945, 10825946, 10825947, 10825948, 10825949, 10825950, 10825951, 10825952, 10825953, 10825954, 10825955, 10825956, 10825957, 10825958, 10825959, 10825960, 10825961, 10825962, 10825963, 10825964, 10825965, 10825966, 10825967, 10825968, 10825969, 10825970, 10825971, 10825972, 10825973, 10825974, 10825975, 10825976, 10825977, 10825978, 10825979, 10825980, 10825981, 10825982, 10825983] }, "id_8474340": { "id": 8474340, "name": "ポッキーにゃ", "author": "buddle", "stickers": [212758086, 212758087, 212758088, 212758089, 212758090, 212758091, 212758092, 212758093, 212758094, 212758095, 212758096, 212758097, 212758098, 212758099, 212758100, 212758101, 212758102, 212758103, 212758104, 212758105, 212758106, 212758107, 212758108, 212758109] }, "id_1666763": { "id": 1666763, "name": "武士カノジョ（改）", "author": "株式会社DK", "stickers": [21878968, 21878969, 21878970, 21878971, 21878972, 21878973, 21878974, 21878975, 21878976, 21878977, 21878978, 21878979, 21878980, 21878981, 21878982, 21878983, 21878984, 21878985, 21878986, 21878987, 21878988, 21878989, 21878990, 21878991, 21878992, 21878993, 21878994, 21878995, 21878996, 21878997, 21878998, 21878999, 21879000, 21879001, 21879002, 21879003, 21879004, 21879005, 21879006, 21879007] }, "id_9349486": { "id": 9349486, "name": "無口男子2", "author": "株式会社DK", "stickers": [241080302, 241080303, 241080304, 241080305, 241080306, 241080307, 241080308, 241080309, 241080310, 241080311, 241080312, 241080313, 241080314, 241080315, 241080316, 241080317, 241080318, 241080319, 241080320, 241080321, 241080322, 241080323, 241080324, 241080325, 241080326, 241080327, 241080328, 241080329, 241080330, 241080331, 241080332, 241080333, 241080334, 241080335, 241080336, 241080337, 241080338, 241080339, 241080340, 241080341] }, "id_6909522": { "id": 6909522, "name": "-闇男子2-", "author": "株式会社DK", "stickers": [162488798, 162488799, 162488800, 162488801, 162488802, 162488803, 162488804, 162488805, 162488806, 162488807, 162488808, 162488809, 162488810, 162488811, 162488812, 162488813, 162488814, 162488820, 162488822, 162488827, 162488829, 162488831, 162488833, 162488835, 162488837, 162488839, 162488840, 162488841, 162488842, 162488843, 162488844, 162488845, 162488846, 162488847, 162488848, 162488849, 162488850, 162488851, 162488852, 162488853] }, "id_10237162": { "id": 10237162, "name": "キズナアイ #02", "author": "キズナアイ", "stickers": [269717750, 269717751, 269717752, 269717753, 269717754, 269717755, 269717756, 269717757, 269717758, 269717759, 269717760, 269717761, 269717762, 269717763, 269717764, 269717765, 269717766, 269717767, 269717768, 269717769, 269717770, 269717771, 269717772, 269717773, 269717774, 269717775, 269717776, 269717777, 269717778, 269717779, 269717780, 269717781] }, "id_10301577": { "id": 10301577, "name": "レトロ男子", "author": "株式会社DK", "stickers": [271723982, 271723983, 271723984, 271723985, 271723986, 271723987, 271723988, 271723989, 271723990, 271723991, 271723992, 271723993, 271723994, 271723995, 271723996, 271723997, 271723998, 271723999, 271724000, 271724001, 271724002, 271724003, 271724004, 271724005, 271724006, 271724007, 271724008, 271724009, 271724010, 271724011, 271724012, 271724013, 271724014, 271724015, 271724016, 271724017, 271724018, 271724019, 271724020, 271724021] }, "id_11574068": { "id": 11574068, "name": "いじわる男子", "author": "株式会社DK", "stickers": [308215486, 308215487, 308215488, 308215489, 308215490, 308215491, 308215492, 308215493, 308215494, 308215495, 308215496, 308215497, 308215498, 308215499, 308215500, 308215501, 308215502, 308215503, 308215504, 308215505, 308215506, 308215507, 308215508, 308215509, 308215510, 308215511, 308215512, 308215513, 308215514, 308215515, 308215516, 308215517, 308215518, 308215519, 308215520, 308215521, 308215522, 308215523, 308215524, 308215525] }, "id_13083342": { "id": 13083342, "name": "ゆめかわ男子", "author": "株式会社DK", "stickers": [346275254, 346275255, 346275256, 346275257, 346275258, 346275259, 346275260, 346275261, 346275262, 346275263, 346275264, 346275265, 346275266, 346275267, 346275268, 346275269, 346275270, 346275271, 346275272, 346275273, 346275274, 346275275, 346275276, 346275277, 346275278, 346275279, 346275280, 346275281, 346275282, 346275283, 346275284, 346275285, 346275286, 346275287, 346275288, 346275289, 346275290, 346275291, 346275292, 346275293] }, "id_7875762": { "id": 7875762, "name": "かまって男子2", "author": "株式会社DK", "stickers": [193613694, 193613695, 193613696, 193613697, 193613698, 193613699, 193613700, 193613701, 193613702, 193613703, 193613704, 193613705, 193613706, 193613707, 193613708, 193613709, 193613710, 193613711, 193613712, 193613713, 193613714, 193613715, 193613716, 193613717, 193613718, 193613719, 193613720, 193613721, 193613722, 193613723, 193613724, 193613725, 193613726, 193613727, 193613728, 193613729, 193613730, 193613731, 193613732, 193613733] }, "id_13220592": { "id": 13220592, "name": "毒舌男子7-敬語ver-", "author": "株式会社DK", "stickers": [349451558, 349451559, 349451560, 349451561, 349451562, 349451563, 349451564, 349451565, 349451566, 349451567, 349451568, 349451569, 349451570, 349451571, 349451572, 349451573, 349451574, 349451575, 349451576, 349451577, 349451578, 349451579, 349451580, 349451581, 349451582, 349451583, 349451584, 349451585, 349451586, 349451587, 349451588, 349451589, 349451590, 349451591, 349451592, 349451593, 349451594, 349451595, 349451596, 349451597] }, "id_14522961": { "id": 14522961, "name": "ゆめかわ男子-ミニver.-3", "author": "株式会社DK", "stickers": [380516054, 380516055, 380516056, 380516057, 380516058, 380516059, 380516060, 380516061, 380516062, 380516063, 380516064, 380516065, 380516066, 380516067, 380516068, 380516069, 380516070, 380516071, 380516072, 380516073, 380516074, 380516075, 380516076, 380516077, 380516078, 380516079, 380516080, 380516081, 380516082, 380516083, 380516084, 380516085, 380516086, 380516087, 380516088, 380516089, 380516090, 380516091, 380516092, 380516093] }, "id_15228400": { "id": 15228400, "name": "もっふり＊たれ耳うさぎさんの敬語", "author": "tattsun", "stickers": [397523462, 397523463, 397523464, 397523465, 397523466, 397523467, 397523468, 397523469, 397523470, 397523471, 397523472, 397523473, 397523474, 397523475, 397523476, 397523477, 397523478, 397523479, 397523480, 397523481, 397523482, 397523483, 397523484, 397523485, 397523486, 397523487, 397523488, 397523489, 397523490, 397523491, 397523492, 397523493, 397523494, 397523495, 397523496, 397523497, 397523498, 397523499, 397523500, 397523501] }, "id_15010980": { "id": 15010980, "name": "みんなに使える敬語スタンプ１", "author": "a418t", "stickers": [392272750, 392272751, 392272752, 392272753, 392272754, 392272755, 392272756, 392272757, 392272758, 392272759, 392272760, 392272761, 392272762, 392272763, 392272764, 392272765, 392272766, 392272767, 392272768, 392272769, 392272770, 392272771, 392272772, 392272773, 392272774, 392272775, 392272776, 392272777, 392272778, 392272779, 392272780, 392272781, 392272782, 392272783, 392272784, 392272785, 392272786, 392272787, 392272788, 392272789] }, "id_15863955": { "id": 15863955, "name": "ひねくれうさぎの大人な敬語", "author": "ともぞー", "stickers": [412984590, 412984591, 412984592, 412984593, 412984594, 412984595, 412984596, 412984597, 412984598, 412984599, 412984600, 412984601, 412984602, 412984603, 412984604, 412984605, 412984606, 412984607, 412984608, 412984609, 412984610, 412984611, 412984612, 412984613, 412984614, 412984615, 412984616, 412984617, 412984618, 412984619, 412984620, 412984621, 412984622, 412984623, 412984624, 412984625, 412984626, 412984627, 412984628, 412984629] }, "id_1456606": { "id": 1456606, "name": "なつのこ", "author": "株式会社DK", "stickers": [17216554, 17216555, 17216556, 17216557, 17216558, 17216559, 17216560, 17216561, 17216562, 17216563, 17216564, 17216565, 17216566, 17216567, 17216568, 17216569, 17216570, 17216571, 17216572, 17216573, 17216574, 17216575, 17216576, 17216577, 17216578, 17216579, 17216580, 17216581, 17216582, 17216583, 17216584, 17216585, 17216586, 17216587, 17216588, 17216589, 17216590, 17216591, 17216592, 17216593] }, "id_1253810": { "id": 1253810, "name": "ほのぼの吹き出しクマ", "author": "株式会社DK", "stickers": [10293344, 10293345, 10293346, 10293347, 10293348, 10293349, 10293350, 10293351, 10293352, 10293353, 10293354, 10293355, 10293356, 10293357, 10293358, 10293359, 10293360, 10293361, 10293362, 10293363, 10293364, 10293365, 10293366, 10293367, 10293368, 10293369, 10293370, 10293371, 10293372, 10293373, 10293374, 10293375, 10293376, 10293377, 10293378, 10293379, 10293380, 10293381, 10293382, 10293383] }, "id_9136624": { "id": 9136624, "name": "動く大好きな❤きずな❤へ送る名前3", "author": "さあや❤名前スタンプ", "stickers": [234551486, 234551487, 234551488, 234551489, 234551490, 234551491, 234551492, 234551493, 234551494, 234551495, 234551496, 234551497, 234551498, 234551499, 234551500, 234551501, 234551502, 234551503, 234551504, 234551505, 234551506, 234551507, 234551508, 234551509], "hasAnimation": true, "hasSound": false } });
var g_stricker_options = local_readJson('stricker_options', {
    likes: [],
    tags: {},
    hisoty_emoji: [],
    history: [],
    last: {
        id: undefined,
        sid: undefined,
    }
});

var g_down = {

}
	var g_habbits = local_readJson('habbits', {
		/*翻译: {
			createAt: 1628611200000,
			icon: 'fa-fa bookmark',
			desc: "翻译一本书",
			tags: ["语言", "阅读"],
			endAt: 1630425600000,
			progress: {
				1628611300000: {
					note: "this is a note",
					score: 5,
					progress: 30,
				},
				1629249449776: {
					note: "this is a note",
					score: 5,
					progress: 20,
				}
			},
			lastSign: 1628611300000,
			nowProgress: 30,
			maxProgress: 125,
			daily: 10,
			// daily: {
			// 	1: 5,
			// 	2: 7,
			// 	2021_8_16: 10,
			// },
			enable: true,
		}*/
		// 女の子のカラダの描き方: {
		// 	type: 'progress',
		// 	createAt: 1628611200000,
		// 	icon: 'fa-fa bookmark',
		// 	desc: "女の子のカラダの描き方",
		// 	tags: ["语言", "阅读", "翻译"],
		// 	endAt: 1630425600000,
		// 	progress: {},
		// 	lastSign: 0,
		// 	nowProgress: 27,
		// 	maxProgress: 175,
		// 	daily: 12,
		// 	enable: true,
		// },
		// 早起: {
		// 	// 获取连续打卡天数
		// 	type: 'daily',
		// 	createAt: 1628611200000,
		// 	icon: 'img/book_reading.png',
		// 	desc: "早上八点前起床",
		// 	tags: ["日常"],
		// 	progress: {},
		// 	lastSign: 0,
		// 	daily: 1,
		// 	enable: true,

		// 	time: 30, // 番茄计时

		// },
		// 开学: {
		// 	type: 'countdown',
		// 	createAt: 1628611200000,
		// 	endAt: 1630425600000,
		// 	icon: 'img/school.png',
		// 	desc: "开学噩梦",
		// 	tags: ["学校"],
		// 	progress: {},
		// 	enable: true,
		// },
	});


var g_chats = local_readJson('chats', {
	// 日常: {
	// 		createAt: 1628611200000,
	// 		icon: 'fa-plus',
	// 		desc: "早上八点前起床",
	// 		enable: true,
	// 		msgs: {
	// 			1628611300000: {
	// 				text: '你好啊'
	// 			}
	// 		}
	// }
});
for(var name in g_chats){
	local_saveJson('chat_'+name, g_chats[name]);
}
g_chats = {};
local_saveJson('chats', {});

var g_times = local_readJson('times', {
	// 2021_8_26: {
	// 	1629984468064: {
	// 		name: '画画',
	// 		end: 1629984478064,
	// 		type: 'add',
	// 	}
	// }
});
var g_todos = local_readJson('todos', {
	// 1629984468064: {
	// 	name: '做作业2',
	// 	desc: "完成数学作业2",
	// 	end: 1629986668064,
	// 	priority: 'primary',
	// 	notes: {
	// 		1629984469064: {
	// 			text: "完成第一题",
	// 			type: "sub"
	// 		},
	// 		1629984469084: {
	// 			text: "加油",
	// 			type: "text"
	// 		}
	// 	},
	// }
});

var g_questions =  local_readJson('questions', {
	1628611200000: {
		title: 'text',
		desc: 'desc',
		datas: {
			1628611300000: {
				text: 'data1',
			}
		}
	}
});

var g_icons = ["fa-font-awesome","fa-caret-down","fa-universal-access","fa-flag","fa-search","fa-address-book","fa-address-book-o","fa-address-card","fa-address-card-o","fa-bandcamp","fa-bath","fa-bathtub","fa-drivers-license","fa-drivers-license-o","fa-eercast","fa-envelope-open","fa-envelope-open-o","fa-etsy","fa-free-code-camp","fa-grav","fa-handshake-o","fa-id-badge","fa-id-card","fa-id-card-o","fa-imdb","fa-linode","fa-meetup","fa-microchip","fa-podcast","fa-quora","fa-ravelry","fa-s15","fa-shower","fa-snowflake-o","fa-superpowers","fa-telegram","fa-thermometer","fa-thermometer-0","fa-thermometer-1","fa-thermometer-2","fa-thermometer-3","fa-thermometer-4","fa-thermometer-empty","fa-thermometer-full","fa-thermometer-half","fa-thermometer-quarter","fa-thermometer-three-quarters","fa-times-rectangle","fa-times-rectangle-o","fa-user-circle","fa-user-circle-o","fa-user-o","fa-vcard","fa-vcard-o","fa-window-close","fa-window-close-o","fa-window-maximize","fa-window-minimize","fa-window-restore","fa-wpexplorer","fa-adjust","fa-american-sign-language-interpreting","fa-anchor","fa-archive","fa-area-chart","fa-arrows","fa-arrows-h","fa-arrows-v","fa-asl-interpreting","fa-assistive-listening-systems","fa-asterisk","fa-at","fa-audio-description","fa-automobile","fa-balance-scale","fa-ban","fa-bank","fa-bar-chart","fa-bar-chart-o","fa-barcode","fa-bars","fa-battery","fa-battery-0","fa-battery-1","fa-battery-2","fa-battery-3","fa-battery-4","fa-battery-empty","fa-battery-full","fa-battery-half","fa-battery-quarter","fa-battery-three-quarters","fa-bed","fa-beer","fa-bell","fa-bell-o","fa-bell-slash","fa-bell-slash-o","fa-bicycle","fa-binoculars","fa-birthday-cake","fa-blind","fa-bluetooth","fa-bluetooth-b","fa-bolt","fa-bomb","fa-book","fa-bookmark","fa-bookmark-o","fa-braille","fa-briefcase","fa-bug","fa-building","fa-building-o","fa-bullhorn","fa-bullseye","fa-bus","fa-cab","fa-calculator","fa-calendar","fa-calendar-check-o","fa-calendar-minus-o","fa-calendar-o","fa-calendar-plus-o","fa-calendar-times-o","fa-camera","fa-camera-retro","fa-car","fa-caret-square-o-down","fa-caret-square-o-left","fa-caret-square-o-right","fa-caret-square-o-up","fa-cart-arrow-down","fa-cart-plus","fa-cc","fa-certificate","fa-check","fa-check-circle","fa-check-circle-o","fa-check-square","fa-check-square-o","fa-child","fa-circle","fa-circle-o","fa-circle-o-notch","fa-circle-thin","fa-clock-o","fa-clone","fa-close","fa-cloud","fa-cloud-download","fa-cloud-upload","fa-code","fa-code-fork","fa-coffee","fa-cog","fa-cogs","fa-comment","fa-comment-o","fa-commenting","fa-commenting-o","fa-comments","fa-comments-o","fa-compass","fa-copyright","fa-creative-commons","fa-credit-card","fa-credit-card-alt","fa-crop","fa-crosshairs","fa-cube","fa-cubes","fa-cutlery","fa-dashboard","fa-database","fa-deaf","fa-deafness","fa-desktop","fa-diamond","fa-dot-circle-o","fa-download","fa-edit","fa-ellipsis-h","fa-ellipsis-v","fa-envelope","fa-envelope-o","fa-envelope-square","fa-eraser","fa-exchange","fa-exclamation","fa-exclamation-circle","fa-exclamation-triangle","fa-external-link","fa-external-link-square","fa-eye","fa-eye-slash","fa-eyedropper","fa-fax","fa-feed","fa-female","fa-fighter-jet","fa-file-archive-o","fa-file-audio-o","fa-file-code-o","fa-file-excel-o","fa-file-image-o","fa-file-movie-o","fa-file-pdf-o","fa-file-photo-o","fa-file-picture-o","fa-file-powerpoint-o","fa-file-sound-o","fa-file-video-o","fa-file-word-o","fa-file-zip-o","fa-film","fa-filter","fa-fire","fa-fire-extinguisher","fa-flag-checkered","fa-flag-o","fa-flash","fa-flask","fa-folder","fa-folder-o","fa-folder-open","fa-folder-open-o","fa-frown-o","fa-futbol-o","fa-gamepad","fa-gavel","fa-gear","fa-gears","fa-gift","fa-glass","fa-globe","fa-graduation-cap","fa-group","fa-hand-grab-o","fa-hand-lizard-o","fa-hand-paper-o","fa-hand-peace-o","fa-hand-pointer-o","fa-hand-rock-o","fa-hand-scissors-o","fa-hand-spock-o","fa-hand-stop-o","fa-hard-of-hearing","fa-hashtag","fa-hdd-o","fa-headphones","fa-heart","fa-heart-o","fa-heartbeat","fa-history","fa-home","fa-hotel","fa-hourglass","fa-hourglass-1","fa-hourglass-2","fa-hourglass-3","fa-hourglass-end","fa-hourglass-half","fa-hourglass-o","fa-hourglass-start","fa-i-cursor","fa-image","fa-inbox","fa-industry","fa-info","fa-info-circle","fa-institution","fa-key","fa-keyboard-o","fa-language","fa-laptop","fa-leaf","fa-legal","fa-lemon-o","fa-level-down","fa-level-up","fa-life-bouy","fa-life-buoy","fa-life-ring","fa-life-saver","fa-lightbulb-o","fa-line-chart","fa-location-arrow","fa-lock","fa-low-vision","fa-magic","fa-magnet","fa-mail-forward","fa-mail-reply","fa-mail-reply-all","fa-male","fa-map","fa-map-marker","fa-map-o","fa-map-pin","fa-map-signs","fa-meh-o","fa-microphone","fa-microphone-slash","fa-minus","fa-minus-circle","fa-minus-square","fa-minus-square-o","fa-mobile","fa-mobile-phone","fa-money","fa-moon-o","fa-mortar-board","fa-motorcycle","fa-mouse-pointer","fa-music","fa-navicon","fa-newspaper-o","fa-object-group","fa-object-ungroup","fa-paint-brush","fa-paper-plane","fa-paper-plane-o","fa-paw","fa-pencil","fa-pencil-square","fa-pencil-square-o","fa-percent","fa-phone","fa-phone-square","fa-photo","fa-picture-o","fa-pie-chart","fa-plane","fa-plug","fa-plus","fa-plus-circle","fa-plus-square","fa-plus-square-o","fa-power-off","fa-print","fa-puzzle-piece","fa-qrcode","fa-question","fa-question-circle","fa-question-circle-o","fa-quote-left","fa-quote-right","fa-random","fa-recycle","fa-refresh","fa-registered","fa-remove","fa-reorder","fa-reply","fa-reply-all","fa-retweet","fa-road","fa-rocket","fa-rss","fa-rss-square","fa-search-minus","fa-search-plus","fa-send","fa-send-o","fa-server","fa-share","fa-share-alt","fa-share-alt-square","fa-share-square","fa-share-square-o","fa-shield","fa-ship","fa-shopping-bag","fa-shopping-basket","fa-shopping-cart","fa-sign-in","fa-sign-language","fa-sign-out","fa-signal","fa-signing","fa-sitemap","fa-sliders","fa-smile-o","fa-soccer-ball-o","fa-sort","fa-sort-alpha-asc","fa-sort-alpha-desc","fa-sort-amount-asc","fa-sort-amount-desc","fa-sort-asc","fa-sort-desc","fa-sort-down","fa-sort-numeric-asc","fa-sort-numeric-desc","fa-sort-up","fa-space-shuttle","fa-spinner","fa-spoon","fa-square","fa-square-o","fa-star","fa-star-half","fa-star-half-empty","fa-star-half-full","fa-star-half-o","fa-star-o","fa-sticky-note","fa-sticky-note-o","fa-street-view","fa-suitcase","fa-sun-o","fa-support","fa-tablet","fa-tachometer","fa-tag","fa-tags","fa-tasks","fa-taxi","fa-television","fa-terminal","fa-thumb-tack","fa-thumbs-down","fa-thumbs-o-down","fa-thumbs-o-up","fa-thumbs-up","fa-ticket","fa-times","fa-times-circle","fa-times-circle-o","fa-tint","fa-toggle-down","fa-toggle-left","fa-toggle-off","fa-toggle-on","fa-toggle-right","fa-toggle-up","fa-trademark","fa-trash","fa-trash-o","fa-tree","fa-trophy","fa-truck","fa-tty","fa-tv","fa-umbrella","fa-university","fa-unlock","fa-unlock-alt","fa-unsorted","fa-upload","fa-user","fa-user-plus","fa-user-secret","fa-user-times","fa-users","fa-video-camera","fa-volume-control-phone","fa-volume-down","fa-volume-off","fa-volume-up","fa-warning","fa-wheelchair","fa-wheelchair-alt","fa-wifi","fa-wrench","fa-hand-o-down","fa-hand-o-left","fa-hand-o-right","fa-hand-o-up","fa-ambulance","fa-subway","fa-train","fa-genderless","fa-intersex","fa-mars","fa-mars-double","fa-mars-stroke","fa-mars-stroke-h","fa-mars-stroke-v","fa-mercury","fa-neuter","fa-transgender","fa-transgender-alt","fa-venus","fa-venus-double","fa-venus-mars","fa-file","fa-file-o","fa-file-text","fa-file-text-o","fa-cc-amex","fa-cc-diners-club","fa-cc-discover","fa-cc-jcb","fa-cc-mastercard","fa-cc-paypal","fa-cc-stripe","fa-cc-visa","fa-google-wallet","fa-paypal","fa-bitcoin","fa-btc","fa-cny","fa-dollar","fa-eur","fa-euro","fa-gbp","fa-gg","fa-gg-circle","fa-ils","fa-inr","fa-jpy","fa-krw","fa-rmb","fa-rouble","fa-rub","fa-ruble","fa-rupee","fa-shekel","fa-sheqel","fa-try","fa-turkish-lira","fa-usd","fa-viacoin","fa-won","fa-yen","fa-align-center","fa-align-justify","fa-align-left","fa-align-right","fa-bold","fa-chain","fa-chain-broken","fa-clipboard","fa-columns","fa-copy","fa-cut","fa-dedent","fa-files-o","fa-floppy-o","fa-font","fa-header","fa-indent","fa-italic","fa-link","fa-list","fa-list-alt","fa-list-ol","fa-list-ul","fa-outdent","fa-paperclip","fa-paragraph","fa-paste","fa-repeat","fa-rotate-left","fa-rotate-right","fa-save","fa-scissors","fa-strikethrough","fa-subscript","fa-superscript","fa-table","fa-text-height","fa-text-width","fa-th","fa-th-large","fa-th-list","fa-underline","fa-undo","fa-unlink","fa-angle-double-down","fa-angle-double-left","fa-angle-double-right","fa-angle-double-up","fa-angle-down","fa-angle-left","fa-angle-right","fa-angle-up","fa-arrow-circle-down","fa-arrow-circle-left","fa-arrow-circle-o-down","fa-arrow-circle-o-left","fa-arrow-circle-o-right","fa-arrow-circle-o-up","fa-arrow-circle-right","fa-arrow-circle-up","fa-arrow-down","fa-arrow-left","fa-arrow-right","fa-arrow-up","fa-arrows-alt","fa-caret-left","fa-caret-right","fa-caret-up","fa-chevron-circle-down","fa-chevron-circle-left","fa-chevron-circle-right","fa-chevron-circle-up","fa-chevron-down","fa-chevron-left","fa-chevron-right","fa-chevron-up","fa-long-arrow-down","fa-long-arrow-left","fa-long-arrow-right","fa-long-arrow-up","fa-backward","fa-compress","fa-eject","fa-expand","fa-fast-backward","fa-fast-forward","fa-forward","fa-pause","fa-pause-circle","fa-pause-circle-o","fa-play","fa-play-circle","fa-play-circle-o","fa-step-backward","fa-step-forward","fa-stop","fa-stop-circle","fa-stop-circle-o","fa-youtube-play","fa-500px","fa-adn","fa-amazon","fa-android","fa-angellist","fa-apple","fa-behance","fa-behance-square","fa-bitbucket","fa-bitbucket-square","fa-black-tie","fa-buysellads","fa-chrome","fa-codepen","fa-codiepie","fa-connectdevelop","fa-contao","fa-css3","fa-dashcube","fa-delicious","fa-deviantart","fa-digg","fa-dribbble","fa-dropbox","fa-drupal","fa-edge","fa-empire","fa-envira","fa-expeditedssl","fa-fa","fa-facebook","fa-facebook-f","fa-facebook-official","fa-facebook-square","fa-firefox","fa-first-order","fa-flickr","fa-fonticons","fa-fort-awesome","fa-forumbee","fa-foursquare","fa-ge","fa-get-pocket","fa-git","fa-git-square","fa-github","fa-github-alt","fa-github-square","fa-gitlab","fa-gittip","fa-glide","fa-glide-g","fa-google","fa-google-plus","fa-google-plus-circle","fa-google-plus-official","fa-google-plus-square","fa-gratipay","fa-hacker-news","fa-houzz","fa-html5","fa-instagram","fa-internet-explorer","fa-ioxhost","fa-joomla","fa-jsfiddle","fa-lastfm","fa-lastfm-square","fa-leanpub","fa-linkedin","fa-linkedin-square","fa-linux","fa-maxcdn","fa-meanpath","fa-medium","fa-mixcloud","fa-modx","fa-odnoklassniki","fa-odnoklassniki-square","fa-opencart","fa-openid","fa-opera","fa-optin-monster","fa-pagelines","fa-pied-piper","fa-pied-piper-alt","fa-pied-piper-pp","fa-pinterest","fa-pinterest-p","fa-pinterest-square","fa-product-hunt","fa-qq","fa-ra","fa-rebel","fa-reddit","fa-reddit-alien","fa-reddit-square","fa-renren","fa-resistance","fa-safari","fa-scribd","fa-sellsy","fa-shirtsinbulk","fa-simplybuilt","fa-skyatlas","fa-skype","fa-slack","fa-slideshare","fa-snapchat","fa-snapchat-ghost","fa-snapchat-square","fa-soundcloud","fa-spotify","fa-stack-exchange","fa-stack-overflow","fa-steam","fa-steam-square","fa-stumbleupon","fa-stumbleupon-circle","fa-tencent-weibo","fa-themeisle","fa-trello","fa-tripadvisor","fa-tumblr","fa-tumblr-square","fa-twitch","fa-twitter","fa-twitter-square","fa-usb","fa-viadeo","fa-viadeo-square","fa-vimeo","fa-vimeo-square","fa-vine","fa-vk","fa-wechat","fa-weibo","fa-weixin","fa-whatsapp","fa-wikipedia-w","fa-windows","fa-wordpress","fa-wpbeginner","fa-wpforms","fa-xing","fa-xing-square","fa-y-combinator","fa-y-combinator-square","fa-yahoo","fa-yc","fa-yc-square","fa-yelp","fa-yoast","fa-youtube","fa-youtube-square","fa-h-square","fa-hospital-o","fa-medkit","fa-stethoscope","fa-user-md"];