if(!g_config.lang) g_config.lang = 'jp';

var g_lang = {
	zh: {
		任务总数: `共<span class='badge badge-danger text-center m-5'>%1</span>个任务`,
		无任务: '没有任何任务',
	},
	jp: {
		弹出_用户_按钮_上传中: 'アップロード中…',
		用户_上传成功: '完了！',
		弹出_设置_标题: '設定',
        弹出_设置_按钮_确定: '保存',
        弹出_设置_调试模式: 'デバッグ',

		弹出_排行榜_标题: 'ランキング : %1',
     排行_名次: '順位',
    排行_头像: ' ',
    排行_用户: 'ユーザー',
    排行_消息数: 'メッセージ数',
    排行_字符数: '文字数',
		弹出_用户_新建: '注册',
		弹出_用户_修改: '个人信息',
		弹出_用户_名称_标题: '用户名',
		弹出_用户_名称_标题_默认: '输入用户名',
		弹出_用户_名称_介绍_标题: '介绍',
		弹出_用户_名称_介绍_默认: '输入介绍',
		弹出_用户_修改_按钮_确定: '保存',
		弹出_用户_新建_按钮_确定: '创建',
		弹出_用户_邮箱_标题: '邮箱',
	  弹出_用户_邮箱_标题_默认: '输入邮箱',
	  弹出_用户_密码_标题: '密码',
	  弹出_用户_密码_标题_默认: '输入密码',

		消息_操作: '操作',
		消息_样式: 'スタイル',
		消息_颜色: '色',
		星标: 'マーク',
		任务: 'タスク',
		复制: 'コピー',
		删除: '消去',
		下划线: 'アンダーライン',
		加粗: 'ボールド',
		斜体: 'イタリック',
		删除线: '削除ライン',
		蓝色: 'ブルー',
		绿色: 'グリーン',
		黄色: 'イエロー',
		红色: 'レッド',
		白色: 'ホワイト',
		默认: 'デフォルト',
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
		弹出_频道_新建: '新規チャンネル',
		弹出_频道_修改: 'チャンネル',
		弹出_频道_新建_名称_标题: '名前',
		弹出_频道_新建_名称_默认: 'eg: 日常、勉強',
		弹出_频道_新建_注释_标题: '紹介',
		弹出_频道_新建_注释_默认: '一言',
		弹出_频道_新建_按钮_确定: '作る',
		弹出_频道_修改_按钮_确定: '保存',
		弹出_频道_新建_已存在: 'この名前は使用している!',
		什么都没写: 'まだ何も書いていません',
// 下🎲v⚔📕📖📰📅📌⏳
		标题_计时: '⏱ タイミング',
		标题_聊天: '%1',
		标题_聊天列表: '💬 チャンネル',
		标题_进度: '📰 プログレス',
		标题_日常: '⚔ 日常',
		标题_倒计时: '⏳ タイミング',

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
		正计时: '増やす',
		倒计时: '減らす',
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