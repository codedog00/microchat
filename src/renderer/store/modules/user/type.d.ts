interface user {
    username: string;
    email: string;
    id: string;
    accessToken: string;
}

interface profile {
    adminForbidType: string;
    allowType: string;
    avatar: string;
    birthday: number;
    gender: string;
    language: number;
    lastUpdateTime: number;
    level: number;
    location: string;
    messageSettings: number;
    nick: string;
    profileCustomField: any[];
    role: number;
    selfSignature: string;
    userID: string;
}

interface newProfile {
    allowType?: string;
    avatar?: string;
    birthday?: number;
    gender?: string;
    language?: number;
    location?: string;
    messageSettings?: number;
    nick?: string;
    profileCustomField?: any[];
    selfSignature?: string;
}