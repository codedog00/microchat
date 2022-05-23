import TIM from 'tim-js-sdk/tim-js-friendship.js';
import TIMUploadPlugin from 'tim-upload-plugin'

// 初始化 SDK 实例

const tim = TIM.create({
    SDKAppID: 1400645617
})


// 无日志级别
tim.setLogLevel(1)

// 注册 cos
tim.registerPlugin({ 'tim-upload-plugin':TIMUploadPlugin })
export default tim
