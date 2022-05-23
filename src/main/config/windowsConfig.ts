import config from '@config/index'


export const mainWindowConfig = {
    height: 640,
    useContentSize: true,
    width: 900,
    minWidth: 860,
    show: false,
    frame: config.IsUseSysTitle,
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webSecurity: true,
        // 如果是开发模式可以使用devTools
        devTools: process.env.NODE_ENV === 'development',
        // 在macos中启用橡皮动画
        scrollBounce: process.platform === 'darwin',
    }
};

export const otherWindowConfig = {
    // height: 595,
    // width: 1140,
    useContentSize: true,
    autoHideMenuBar: true,
    // minWidth: 842,
    // frame: config.IsUseSysTitle,
    frame: false,
    show: false,
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webSecurity: true,
        // 如果是开发模式可以使用devTools
        devTools: process.env.NODE_ENV === 'development',
        // 在macos中启用橡皮动画
        scrollBounce: process.platform === 'darwin',
    }
}
