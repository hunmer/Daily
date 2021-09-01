if(!g_config.lang) g_config.lang = 'jp';

var g_lang = {
	zh: {
		任务总数: `共<span class='badge badge-danger text-center m-5'>%1</span>个任务`,
		无任务: '没有任何任务',
	},
	jp: {
		任务总数: `タスク数： <span class='badge badge-danger text-center m-5'>%1</span>`,
		无任务: '何も無いよ',
		未完成: '未完成',
		已放弃: '放棄した',
		已过期: '期限切れ',
		已完成: '完成した',
		priority_danger: '重要又緊急',
		priority_secondary: '重要不緊急',
		priority_primary: '緊急不重要',
		priority_default: '不緊急不重要',

		弹出_代办_修改: 'タスク変更',
		弹出_代办_修改_按钮_确定: '変更',
		弹出_代办_新建: 'タスク',
		弹出_代办_新建_选择框_标题: '優先順位',
		弹出_代办_新建_名称_默认: 'タイトル',
		弹出_代办_新建_注释_标题: '説明',
		弹出_代办_新建_注释_默认: '事項',
		弹出_代办_新建_按钮_确定: '作る',

		弹出_图标选择_标题: 'アイコン',
		弹出_频道_新建_名称_标题: '名前',
		弹出_频道_新建_名称_默认: 'eg: 日常、勉強',
		弹出_频道_新建_注释_标题: '紹介',
		弹出_频道_新建_注释_默认: '一言',
		弹出_频道_新建_按钮_确定: '作る',
		弹出_频道_新建_已存在: 'この名前は使用している!',
		什么都没写: 'まだ何も書いていません',

		标题_计时: 'タイミング',
		标题_聊天: '%1',
		标题_聊天列表: 'チャンネル',
		标题_进度: 'プログレス',
		标题_日常: '日常',
		标题_倒计时: 'タイミング',

		是否删除消息: '削除しますか？',
		是否删除频道: '削除しますか？',
		
		侧栏_计时_标题: 'タイミング',
		侧栏_计时_进入: 'ホーム',

		侧栏_习惯_标题: '習慣',
		侧栏_习惯_进度: 'プログレス',
		侧栏_习惯_日常: '日常',
		侧栏_习惯_倒计天: '記念日',

		侧栏_代办_标题: 'タスク',
		侧栏_代办_进入: 'リスト',

		计时类型: '種類',
		正计时: 'インフィニット',
		倒计时: 'カウントダウン',
		番茄种: 'リピート',
		要做什么: '何をする？',
		开始: '始め',
		想说什么: 'メモ',
		事件: '事件',
		开始: 'スタート',
		结束: 'エンド',
		耗时: '長さ',
		几分钟后结束: '何分後に終わりますか?',
		休息几分钟: '終わったら何分間休憩しますか?',
		要重复做几次: '何回を繰り返します?',
		是否中止: '中止しますか？',
		是否保存记录: '記録を保存しますか？',
		是否更正时间: '時間を訂正しますか？　総計:%1',
		计时完成: 'タイムアウト完了',
		今日总共: '今日: %1',
		休息时间: '休憩時間よ！ちょっと休憩～',
		休息结束: '休み終わりよ！頑張るぞ！',

		侧栏_聊天_标题: 'つぶやく',
		侧栏_聊天_进入: 'ホーム',

		消息选项: '操作',
		复制: 'コピー',
		删除: '削除',

		弹出_搜索_标题: '検索',
		弹出_搜索_选择框_提示: '検索対象',
		弹出_搜索_选择框_文本: '内容',
		弹出_搜索_输入框_默认: '何が検索したい？',
		弹出_搜索_按钮_搜索: '検索',
	}

}

function _l(k){
	if(g_lang[g_config.lang] && g_lang[g_config.lang][k]){
		k = g_lang[g_config.lang][k];
			for(var i = 1; i<arguments.length; i++){
				k = k.replace('%'+i, arguments[i]);
		}
	}
	return k;
}