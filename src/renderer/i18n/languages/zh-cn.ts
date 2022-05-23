import zhLocale from "element-plus/lib/locale/lang/zh-cn";

export const lang = {
    welcome: "欢迎进入本框架",
    buttonTips: "您可以点击的按钮测试功能",
    waitDataLoading: "等待数据读取",
    about: {
        system: "关于系统",
        language: "语言：",
        languageValue: "中文简体",
        currentPagePath: "当前页面路径：",
        currentPageName: "当前页面名称：",
        vueVersion: "Vue版本：",
        electronVersion: "Electron版本：",
        nodeVersion: "Node版本：",
        systemPlatform: "系统平台：",
        systemVersion: "系统版本：",
        systemArch: "系统位数："
    },
    buttons: {
        console: "控制台打印",
        checkUpdate: "检查更新",
        checkUpdate2: "检查更新（第二种方法）",
        checkUpdateInc: "检查更新（增量更新）",
        startServer: "启动内置服务端",
        stopServer: "关闭内置服务端",
        viewMessage: "查看消息",
        openNewWindow: "打开新窗口",
        simulatedCrash: "模拟崩溃",
        changeLanguage: "切换语言",
        ForcedUpdate:"强制更新模式",
        ///////
        confirm: '确认',
        cancel: '取消',
    },
    el: zhLocale,
    setting: {
      language: '语言'
    },
    auth: {
        login: '登录',
        register: '注册',
        username: "用户名",
        email: "邮箱",
        password: "密码",
        loginSuccess: '登录成功',
        loginFailure: '登录失败',
        registerSuccess: '注册成功',
        registerFailure: '注册失败',
    },
    currentContent: {
        send: '发送',
    },
    profile: {
        allowType: '好友申请',
        allowTypeName:{
            allowAny: '允许所有',
            needConfirm: '需要验证',
            denyAny: '拒绝所有',
        },
        gender: '性别',
        genderTypeName: {
            female: '女',
            male: '男',
            unknown: '保密',
            notSet: '未设置'
        },
        birthday: '生日',
        pickADay: '选择日期',
        location: '地区',
        notSetSelfSignature: '还未设置个性签名'
    },
    friend: {
        group: {
            renameGroup: '重命名分组',
            addGroup: '添加分组',
            deleteGroup: '删除分组',
        },
        source: '来源',
        sourceType: {
            network: '网络搜索',
            group: '通过群聊添加',
        }
    }
}