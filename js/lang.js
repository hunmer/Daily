if (!g_config.lang) g_config.lang = 'jp';

var g_lang = {
    zh: {
        任务总数: `共<span class='badge badge-danger text-center m-5'>%1</span>个任务`,
        无任务: '没有任何任务',
    },
    jp: {


        分享: 'シェア',
        弹出_分享_标题: 'シェア',
        /* 设置 */
        弹出_设置_自动主题: '自動テーマ',
        是否只下载数据: 'データだけを保存しますか？',

        /*密码*/
         密码错误: 'パスワードエラー',
        忘记密码了吗: 'パスワードをお忘れですか？',
        忘记密码: '忘れた',
        错误: 'エラー',
        确定: '確認',

        /* 标签 */
        侧栏_活动_标题: 'アクティブ',
         弹出_标签_新建_名称_默认: '名前を入力',
        弹出_标签_新建_名称_标题: '名前',
        弹出_标签_新建_注释_标题: '説明',
        弹出_标签_新建_注释_默认: '説明を入力',
         弹出_标签_新建_按钮_确定: '作る',
        弹出_标签_修改_按钮_确定: '更新',
        弹出_标签_新建: '新規',
        弹出_标签_修改: '編集',
        活动_是否删除: '全部消すますか？(%1)',
        活动_时间_重置: 'リセット',
        活动_时间_现在: 'いま',
        标签_所有分组: 'All',
        标签_新增分组: '新規',
        标签_管理分组: '編集',
        标签_退出分组: 'バック',
        标签搜索: '検索',
        标签_全不选: 'なし',
        标签_删除分组: '削除',
        标签组_保存成功: '保存 %1 成功',
        标签_分组_保存: '保存',
          弹出_标签组_新建_名称_默认: '名前を入力',
        弹出_标签组_新建_名称_标题: '名前',
        弹出_标签组_新建_注释_标题: '説明',
        弹出_标签组_新建_注释_默认: '説明を入力',
         弹出_标签组_新建_按钮_确定: '作る',
        弹出_标签组_修改_按钮_确定: '更新',
        弹出_标签组_标题: 'グループ',
        输入新标签组名称: '名前を入力',
            标签组已存在: 'すってに存在しています。',
            标签组_保存成功: '保存 %1 成功',

        弹出_活动_新建: '新規',
        弹出_活动_修改: '編集',
        没有选择标签: 'タグを選択してください',
        活动_标签_是否删除: '消すますか？(%1)',
        活动_保存: '保存',
        活动_备注: 'メモ',
        错误的时间: '時間が間違いっています',
        请选择时间: '時間が間違いっています',
        活动_补充文本: '記録されない時間帯',
        活动_前一天: '前',
        活动_后一天: '後',
        活动_选择日期: '日付を選択',

        输入进度: '数字を入力',
        /* 日常 */
        日常_编辑: '編集',
        日常_删除: '削除',
        弹出_日常_新建_名称_默认: '名前を入力',
        弹出_日常_新建_名称_标题: '名前',
        弹出_日常_新建_注释_标题: '説明',
        弹出_日常_新建_注释_默认: '説明を入力',
        弹出_日常_新建: '新規',
        弹出_日常_新建_按钮_确定: '作る',
        弹出_日常_修改_按钮_确定: '更新',
        弹出_日常_总进度_标题: '目標',
        弹出_日常_总进度_默认: '0=無限',
        弹出_日常_刷新间隔_默认: ' ',
        弹出_日常_刷新间隔_单位: '日',
        日常_是否删除: '削除しますか？',

        /* 进度 */
        进度_编辑: '編集',
        进度_删除: '削除',
        进度_无记录: 'まだ始まってない',
        进度_记录: '最近: %1',
        进度_超过: '過ぎ: %1',
        进度_剩余: '残り: %1',
        进度_是否删除: '削除しますか？',

        还有: '残り',
        已过: '経ち',
        侧栏_进度_标题: 'プログレス',
        弹出_进度_新建_名称_标题: '名前',
        弹出_进度_新建_名称_默认: '名前を入力',
        弹出_进度_新建_注释_标题: '説明',
        弹出_进度_新建_注释_默认: '説明を入力',
        弹出_进度_日期: '終了日',
        弹出_进度_日期提示: '終了日の選択',
        弹出_进度_关闭日期选择: 'x',
        弹出_进度_新建: '新規',
        弹出_进度_新建_按钮_确定: '作る',
        弹出_进度_修改_按钮_确定: '更新',
        弹出_进度_总进度_标题: '目標',
        弹出_进度_总进度_默认: '0=無限',
        弹出_进度_每日进度_标题: '毎度',
        弹出_进度_每日进度_默认: ' ',
        弹出_进度_刷新间隔_默认: ' ',
        弹出_进度_刷新间隔_单位: '日',

        /* 列表 */
       标题_列表: 'リスト',
       列表_输入_默认: 'ここで入力',
        侧栏_列表_标题: 'リスト',
        弹出_列表_新建_名称_标题: '名前',
        弹出_列表_新建_名称_默认: '名前を入力',
        弹出_列表_新建_注释_标题: '説明',
        弹出_列表_新建_注释_默认: '説明を入力',
         弹出_列表_新建: '新規',
        弹出_列表_新建_按钮_确定: '作る',
        弹出_列表_修改_按钮_确定: '更新',
        列表_项目_加载更多: 'もっと見る',
        列表_删除: '削除',
        列表_编辑: '編集',
        列表_是否删除: '削除しますか？',

        /* 纪念日 */
        标题_纪念日: '📅記念日',
        侧栏_纪念日_标题: '記念日',
        弹出_纪念日_新建_名称_标题: '名前',
        弹出_纪念日_新建_名称_默认: '名前を入力',
        弹出_纪念日_新建_注释_标题: '説明',
        弹出_纪念日_新建_注释_默认: '説明を入力',
        弹出_纪念日_日期: '日にち',
        弹出_纪念日_日期提示: ' ',
        弹出_纪念日_关闭日期选择: 'x',
        弹出_纪念日_新建: '新規',
        弹出_纪念日_新建_按钮_确定: '作る',
        弹出_纪念日_修改_按钮_确定: '更新',
        纪念日_删除: '削除',
        纪念日_编辑: '編集',
        纪念日_是否删除: '削除しますか？',
        图标: 'アイコン',
        文字: '文字',
        图片: '画像',

        标题_任务: '🎯テスト',
        任务_列表_无任务: '何も無いよ',

        什么都没有: 'まだ何も書いていません',
        问题_投稿_输入文本: '自分に何が言いたい？',
        问题_投稿_复制: 'コーヒー',
        问题_投稿_删除: '削除',
        问题_投稿_是否删除: '削除しますか？',
        问题_列表: '一覧',
        问题_编辑: '編集',
        问题_删除: '削除',
        弹出_问题编辑_修改: '編集',
        弹出_问题编辑_新建: '投稿',
        问题_记录成功: '保存しました！',
        问题_是否删除: '削除しますか？',
        标题_提问: '❓自問自答',
        侧栏_问题_标题: '自問自答',
        弹出_问题_修改: '問題編集',
        弹出_问题_新建: '新し問題',
        弹出_问题_新建_问题_标题: '質問',
        弹出_问题_新建_问题_默认: '何が自分に聞きたい？',
        弹出_问题_新建_注释_标题: '説明',
        弹出_问题_新建_注释_默认: '…',
        弹出_问题_修改_按钮_确定: '保存',
        弹出_问题_新建_按钮_确定: '作る',
        pin: '',
        unpin: '',
        pin到消息: '絵文字を入力',
        时间线_第一页: '始まりです',
        时间线_最后一个: '終わりです',

        表情类别: '種類',
        表情搜索: '検索',
        是否结束: '終了しますか？',
        是否结束1: 'よろしいですか？',

        弹出_用户_按钮_上传中: 'アップロード中…',
        用户_上传成功: '完了！',
        弹出_设置_标题: '設定',
        弹出_设置_按钮_确定: '保存',
        弹出_设置_调试模式: 'デバッグ',
        弹出_图标选择_搜索: '検索',
        频道信息: '編集',


        /* 用户列表 */
               弹出_用户列表_标题: 'ユーザーリスト',
            用户列表_排序: '#',
            用户列表_头像: ' ',
            用户列表_用户: 'ユーザー',
            用户列表_最后登录: ' ',


        弹出_排行榜_标题: 'ランキング : %1',
        排行_名次: '順位',
        排行_头像: ' ',
        排行_用户: 'ユーザー',
        排行_消息数: 'メッセージ数',
        排行_字符数: '文字数',
        弹出_用户_新建: '登録',
        弹出_用户_修改: '個人情報',
        弹出_用户_名称_标题: 'ユーザー名',
        弹出_用户_名称_标题_默认: 'ユーザー名を入力',
        弹出_用户_名称_介绍_标题: '一言',
        弹出_用户_名称_介绍_默认: '一言を入力',
        弹出_用户_修改_按钮_确定: '保存',
        弹出_用户_新建_按钮_确定: '作る',
        弹出_用户_邮箱_标题: 'メールボックス',
        弹出_用户_邮箱_标题_默认: 'Eメールアドレスを入力',
        弹出_用户_密码_标题: 'パスワード',
        弹出_用户_密码_标题_默认: 'パスワードを入力',

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
        未完成: '✨未完成',
        已放弃: '🤦放棄した',
        已过期: '❌期限切れ',
        已完成: '✔完成した',
        未开始: '⏳始めてない',
        代办_即将开始: '%1后',
        代办_将会过期: '残り%1',
        priority_danger: '重要又緊急',
        priority_secondary: '重要不緊急',
        priority_primary: '緊急不重要',
        priority_default: '不緊急不重要',
        代办_清空列别: '全部消すますか？(%1)',

        弹出_代办_修改: 'タスク変更',
        弹出_代办_修改_按钮_确定: '変更',
        弹出_代办_新建: 'タスク',
        弹出_代办_新建_选择框_标题: '優先順位',
        弹出_代办_新建_名称_默认: 'タイトル',
        弹出_代办_新建_注释_标题: '説明',
        弹出_代办_新建_注释_默认: '事項',
        弹出_代办_新建_按钮_确定: '作る',
        弹出_代办_选择开始日: '開始日の選択',
        弹出_代办_按钮_重置开始日: 'リセット',
        弹出_代办_选择结束日: '終了日の選択',
        弹出_代办_按钮_重置结束日: 'リセット',
        代办_统计: '统计',
        代办_删除: 'リセット',
        代办_删除任务: '消すますか?',
        代办_子任务_下拉_类型: '操作',
        代办_子任务_下拉_创建: 'クリエイト',
        代办_子任务_下拉_搜索: '検索',
        弹出_代办_子任务: '%1',
        弹出_代办_开始日: '開始日',
        弹出_代办_结束日: '終了日',
        弹出_代办_关闭日期选择: 'x',

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
        标题_日活动: '📊 アクティブ',
        取消: 'いいえ',
        确定: 'はい',

        删除频道: '削除',
        是否删除消息: '削除しますか(%1)？',
        是否删除频道: '削除しますか？',

        侧栏_计时_标题: 'タイミング',


        侧栏_日常_标题: '日常',
        侧栏_习惯_倒计天: '記念日',

        侧栏_代办_标题: 'タスク',

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
        计时_笔记_时间: '時間',
        计时_笔记_内容: '内容',
        弹出_时间_事件: '事件: %1',
        倒计时_事件_是否删除: '削除しますか？',
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

        消息选项: '操作',
        复制: 'コピー',
        删除: '削除',

        昨天: '昨日 ',
        时: '時',
        分: '分',
        秒: '秒',
        天: '日',
        天前: '日前',

        弹出_搜索_标题: '検索',
        弹出_搜索_选择框_提示: '検索対象',
        弹出_搜索_选择框_文本: '内容',
        弹出_搜索_输入框_默认: '何が検索したい？',
        弹出_搜索_按钮_搜索: '検索',
        弹出_设置_修复select: 'fix select',
        不是数字: '数字ではない',
        弹出_设置_输入密码: 'パスワード',
        输入密码_标题: '验证',
        输入密码_文本: 'パスワードを入力ください',
    }

}

function _l(k) {
    if (g_lang[g_config.lang] && g_lang[g_config.lang][k]) {
        k = g_lang[g_config.lang][k];
        for (var i = 1; i < arguments.length; i++) {
            k = k.replace('%' + i, arguments[i]);
        }
    }
    return k;
}

window.alert = (msg) => {
    return x0p('Message', msg);
}


window.confirm = (msg, opt) => {
    opt = Object.assign({
        title: msg,
        text: '',
        keyResponse: false,

        animationType: 'slideUp',
        buttons: [{
                type: 'cancel',
                key: 49,
                text: _l('取消'),
                default: true
            },
            {
                type: 'ok',
                key: 50,
                text: _l('确定')
            }
        ]
    }, opt);
    return x0p(opt);
}

window.prompt = (msg, def = '', opt = {}) => {
    if (opt.numberOnly) {
        opt.inputPromise = typeof(opt.numberOnly) == 'function' ? opt.numberOnly : function(button, value) {
            var p = new Promise(function(resolve, reject) {
                if (value == '' || isNaN(value))
                    resolve(_l('不是数字'));
                resolve(null);
            });
            return p;
        }
        delete opt.numberOnly;
    }
    opt = Object.assign({
        title: '',
        text: msg,
        inputType: 'text',
        inputPlaceholder: 'input text',
        inputColor: '#000',
        keyResponse: false,
        inputValue: def,
        animationType: 'slideUp',
        buttons: [{
                type: 'cancel',
                key: 49,
                text: _l('取消'),
                default: true
            },
            {
                type: 'ok',
                key: 50,
                text: _l('确定')
            }
        ]
    }, opt);
    return x0p(opt);
}