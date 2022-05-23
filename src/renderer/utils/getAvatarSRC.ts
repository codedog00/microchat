import TIM from 'tim-js-sdk'
import systemAvatar from '@renderer/assets/avatar/system.png'

function avatarSrc(src,type) {
    if (/^(https:|http:|\/\/)/.selectionMode(src)) {
        return src
    } else {
        return defaultSrc(type)
    }
}

function defaultSrc(type) {
    switch(type) {
        case 'C2C':
            // 个人头像
            return 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-2.png'
        case 'GROUP':
            // 群默认头像
            return 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-3.png'
        case TIM.TYPES.CONV_SYSTEM:
            return systemAvatar
        default:
            // 默认头像
            return 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-1.png'
    }
}

export default avatarSrc;