interface friendGroup {
    count: number;
    name: string;
    userIDList: Array<string>
}

interface friend {
    addTime: number;
    friendCustomField: any[];
    groupList: string[];
    profile: profile;
    remark: string;
    source: string;
    timestamp: number;
    userID: string;
}

interface friendApplicationContent {
    friendApplicationList: FriendApplication[];
    unreadCount: number;
}

interface FriendApplication {
    userID: string;
    avatar: string;
    nick: string;
    time: string;
    source: string;
    wording: string;
    type: string;
}