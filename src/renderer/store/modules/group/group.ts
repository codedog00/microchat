import {defineStore} from "pinia";
import store from "@renderer/store";

interface stateType {
    groupList: group[];
}

const useStore = defineStore({
    id: 'group',
    state: ():stateType => ({
        groupList: [],
    }),
    actions: {
        updateGroupList(groupList) {
            this.groupList = groupList;
        }
    }
})

export default function useGroupStore() {
    return useStore(store);
}