interface elDialogAttribute {
    title?: string;
    width?: string | number;
    fullscreen?: boolean;
    top?: string;
    modal?: boolean;
    appendToBody?: boolean;
    lockScroll?: boolean;
    customClass?: string;
    openDelay?: number;
    closeDelay?: number;
    closeOnPressEscape?: boolean;
    showClose?: boolean;
    beforeClose?: () => void;
    draggable?: boolean;
    center?: boolean;
    destroyOnClose?: boolean;
}


interface homeDialog {
    dialogVisible: boolean;
    currentHomeDialog: string;
    data: VCardDialogData | addFriendDialogData | any;
}

interface VCardDialogData {
    relationship: 'myself' | 'friend' | 'stranger';
    data: friend | profile;
}

interface addFriendDialogData {
    userID: string;
    source: string;
}