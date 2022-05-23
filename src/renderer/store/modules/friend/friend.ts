import {defineStore} from "pinia";
import store from "@renderer/store";


interface stateType {
    friendList: friend[];
    friendGroupList: friendGroup[];
    friendApplicationList: friendApplicationContent;
    currentFriend: friend | null;
}

const useStore =  defineStore({
    id:'friends',
    state: ():stateType => ({
        friendList: [],
        friendGroupList: [],
        friendApplicationList: {
            friendApplicationList: [],
            unreadCount: 0
        },
        currentFriend: null,
    }),
    getters: {
        friendsClassifiedByGroup(state):{count:number;name:string;friendList:friend[]}[] {
            let friendsClassifiedByGroup = [];
            state.friendGroupList.forEach(group => {
                let itemList = state.friendList.filter(friend => group.userIDList.indexOf(friend.userID) > -1);
                let newGroup = {count: group.count, name: group.name, friendList:itemList}
                console.log(group);
                friendsClassifiedByGroup.push(newGroup);
            })

            return friendsClassifiedByGroup;
        }
    },
    actions: {
        updateFriendList(friendList) {
            this.friendList = friendList;
            console.log(this.friendList)
        },
        updateFriendGroups(friendGroupList) {
            this.friendGroupList = friendGroupList;
            console.log('好友分组列表更新')
            console.log(friendGroupList);
        }
    }

})

export default function useFriendStore() {
    return useStore(store)
}