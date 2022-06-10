import {computed, ref} from "vue";
import useConversationStore from "@store/conversation/conversation";
import useFriendStore from "@store/friend/friend";

export default function useMenu() {

    const conversationStore = useConversationStore();
    const friendStore = useFriendStore();

    const menuConfig = {
        'default-active': "0",
        collapse: true,
        style: "height: 100%;border: 0",
        'background-color': "#282828",
        'text-color': "#777",
        'active-text-color': "#57be6a",
    };

    const isHaveUnreadMessage = computed(() => conversationStore.isHaveUnreadMessage)
    const isHaveUnreadApplication = computed(() => friendStore.friendApplicationList.unreadCount !== 0);

    const menuItems = ref([
        {component: 'ConversationList',icon:'icon-conversation',title: '会话',haveUnread: isHaveUnreadMessage},
        {component: 'FriendList',icon:'icon-contact',title: '好友', haveUnread: isHaveUnreadApplication },
        {component: 'GroupList',icon:'icon-group',title: '群组', haveUnread: false },
    ])

    const currentComponent = ref('ConversationList');

    const handleSelect = (key: string) => {
        currentComponent.value = key;
    }

    return {
        menuConfig,
        menuItems,
        currentComponent,
        handleSelect,
    }
}