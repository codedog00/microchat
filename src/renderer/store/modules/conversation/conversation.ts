import {defineStore} from "pinia";
import store from "@renderer/store";
import tim from "@renderer/tim";
import {ElMessage} from "element-plus/es";

interface stateType {
    conversationList: conversation[];
    currentConversation: conversation | null; //被选中打开显示的会话
    currentMessageList: message[],
    nextReqMessageID: string, //下一条准备拉取的消息id
    isMessageCompleted: boolean, // 当前会话消息列表是否已经拉完了所有消息
}

const useStore = defineStore({
    id: 'conversation',
    state: (): stateType => ({
        conversationList: [],
        currentConversation: null,
        currentMessageList: [],
        nextReqMessageID: '',
        isMessageCompleted: false,
    }),
    getters: {
        /**
         *  总未读消息数
         */
        totalUnreadCount() {
            return this.conversationList.reduce((count, conversation) => {
                return count + conversation.unreadCount
            }, 0);
        },
        /**
         * 总未读消息数-当前打开的会话的消息数
         */
        isHaveUnreadMessage() {
            return this.totalUnreadCount - (this.currentConversation?.unreadCount ?? 0) > 0
        },
        /**
         * 发送对象账户的类型
         */
        toAccount() {
            if (!this.currentConversation || !this.currentConversation.conversationID) {
                return ''
            }
            switch (this.currentConversation.type) {
                case 'C2C':
                    return this.currentConversation.conversationID.replace('C2C', '')
                case 'GROUP':
                    return this.currentConversation.conversationID.replace('GROUP', '')
                default:
                    return this.currentConversation.conversationID
            }
        },
    },
    actions: {
        updateConversationList(conversationList: conversation[]) {
            this.conversationList = conversationList;
        },
        /**
         * 获取会话的消息列表
         * @param conversationID 会话ID
         * @param count 获取消息数
         */
        getMessageList(conversationID: string, count: number = 15) {
            tim.getMessageList({conversationID, count})
                .then(imResponse => {
                    this.nextReqMessageID = imResponse.data.nextReqMessageID
                    this.isCompleted = imResponse.data.isCompleted
                    this.currentMessageList = imResponse.data.messageList;
                    console.log(imResponse.data.messageList);
                })
        },
        /**
         * 切换当前打开的会话
         * @param conversationID 新的会话ID
         */
        async checkoutConversation(conversationID: string) {

            if (conversationID === this.currentConversation?.conversationID) {
                return;
            }
            //从会话列表中获取选中的会话
            const filter = (item) => item.conversationID === conversationID;
            this.currentConversation = this.conversationList.find(filter);
            if (!this.currentConversation) {
                const {data} = await tim.getConversationProfile(conversationID);
                this.currentConversation = data.conversation;
            }
            //获取选中会话的消息列表
            this.getMessageList(this.currentConversation.conversationID);
            //对当前会话进行已读上报
            tim.setMessageRead({conversationID: conversationID})

        },
        /**
         * 发送文字消息
         * @param payload 载荷（文字）
         * @param type 消息类型
         */
        sendMessage(payload: object, type?: string) {
            const messageData = {
                to: this.toAccount,
                conversationType: this.currentConversation.type,
                payload: payload,
            }
            let message;

            switch (type) {
                case 'text':
                    message = tim.createTextMessage(messageData);
                    break;
                case 'img':
                    message = tim.createImageMessage(messageData);
                    break;
                case 'file':
                    message = tim.createFileMessage(messageData);
                    break;
            }

            return tim.sendMessage(message)
                .then((res) => {
                    this.pushCurrentMessageList([res.data.message]);
                    return Promise.resolve(res.data.message);
                })
                .catch(err => {
                    return Promise.reject(err);
                })
        },
        /**
         * 将新消息并入当前会话的消息列表
         * @param newMessages 新消息数组
         */
        pushCurrentMessageList(newMessages: message[]) {
            if (this.currentConversation === null) {
                return;
            }
            const currentNewMessages = newMessages.filter(message => {
                return message.conversationID === this.currentConversation.conversationID
            })
            this.currentMessageList.push(...currentNewMessages);

            //对新消息进行已读上报
            tim.setMessageRead({conversationID: this.currentConversation.conversationID})
                .catch(err => {
                    ElMessage.error('已读上报失败')
                    console.log(err);
                })
        },
    }
})

export default function useConversationStore() {
    return useStore(store)
}