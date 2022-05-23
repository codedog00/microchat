interface group {
    avatar: string;
    createTime: string;
    groupCustomField: Array<any>,
    groupID: string;
    infoSequence: string;
    introduction: string;
    lastInfoTime: string;
    lastMessage: {
        fromAccount: string;
        lastSequence: string;
        lastTime: number;
        messageForShow: string;
    };
    maxMemberCount: string;
    MemberCount: string;
    name: string;
    nextMessageSeq: number;
    notification: string;
    ownerID: string;
    selfInfo: {
        joinTime: number;
        messageRemindType: string;
        nameCard: string;
        role: string;
    };
    type: string;

}

interface GroupMember {
    userID: string;
    avatar: string;
    nick: string;
    role: string;
    joinTime: number;
    nameCard: string;
    muteUntil: number;
    memberCustomField: {
        key: string;
        value: string;
    }
}