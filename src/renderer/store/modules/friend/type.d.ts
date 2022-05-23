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
    friendApplicationList: any[];
    unreadCount: number;
}