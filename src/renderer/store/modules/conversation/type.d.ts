declare enum ImageFormat {
    JPG=1,
    GIF,
    PNG,
    BMP,
    OTHERS=255,
}

declare enum ImageZipType {
    ORIGINAL,
    ZIP198P,
    ZIP720P
}

declare enum GroupJoinType {
    DEFAULT,
    APPLY,
    INVITE
}

declare enum GroupOperationType {
    APPLY_GROUP_APPLICATION=1,
    APPLICATION_AGREED,
    APPLICATION_REFUSED,
    GET_OUT_OF_GROUP,
    GROUP_DISSOLVED,
    GROUP_CREATED,
    INVITE_TO_JOIN,
    QUIT_GROUP,
    SET_ADMINISTRATOR,
    CANCEL_ADMINISTRATOR,
    GROUP_RECYCLED,
    RECEIVE_INVITATIONS,
    INVITE_AGREED,
    INVITE_REFUSED,
    READ,
    CUSTOM_NOTICE=255,
}

interface conversation {
    conversationID: string;
    groupAtInfoList: any[];
    isPinned: boolean;
    lastMessage: {
        cloudCustomData: string;
        fromAccount: string;
        isRevoked: boolean;
        lastSequence: number;
        lastTime: number;
        messageForShow: string;
        onlineOnlyFlag: boolean;
        payload: object;
        type: string;
    };
    peerReadTime: number;
    remark: string;
    type: string;
    unreadCount: number;
    userProfile: profile;
    groupProfile: group;
    _isInfoCompleted: boolean;
}

interface message {
    ID: string;
    atUserList: any[];
    avatar: string;
    clientSequence: number;
    cloudCustomData: string;
    conversationID: string;
    conversationSubType: string | undefined;
    conversationType: string;
    flow: 'in' | 'out';
    from: string;
    geo: object;
    isDeleted: boolean;
    isModified: boolean;
    isPeerRead: boolean;
    isPlaceMessage: boolean;
    isRead: boolean;
    isResend: boolean;
    isRevoked: boolean;
    isSystemMessage: boolean;
    nameCard: string;
    nick: string;
    payload: TextPayload | ImagePayload | FilePayload | CustomPayload | GroupTipPayload | GroupSystemNoticePayload;
    priority: string;
    protocol: string;
    random: number;
    sequence: number;
    status: string;
    time: number;
    to: string;
    type: string; //TIM.TYPES.MSG_
    _elements: Array<{
        content: {text: string};
        type: string;
    }>;
    _groupAtInfoList: any[];
    _onlineOnlyFlag: boolean;
    _relayFlay: boolean;
}



interface TextPayload {
    text: string;
}

interface ImagePayload {
    uuid: string;
    imageFormat: ImageFormat;
    imageInfoArray: Array<{
        width: number;
        height: number;
        url: string;
        size: number;
        type: ImageZipType;
    }>
}

interface FilePayload {
    uuid: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
}

interface CustomPayload {
    data: string;
    description: string;
    extension: string;
}

interface GroupTipPayload {
    groupJoinType: GroupJoinType;
    operatorID: string; //执行该操作的用户 ID
    operationType: GroupOperationType; //TIM.TYPES.GRP_TIP_
    userIDList: string[];
    newGroupProfile: group; //若是群资料变更，该字段存放变更的群资料
    memberList: Array<{
        userID: string;
        muteTime: number;
        nick: string;
        avatar: string;
    }>
}

interface GroupSystemNoticePayload {
    operatorID: string; //执行该操作的用户 ID
    operationType: GroupOperationType;
    groupProfile: group;
    userDefinedField: string;
    handleMessage: object
}


