import {defineStore} from "pinia";
import store from "@renderer/store";

interface stateType {
    homeDialog: homeDialog
}

const useStore = defineStore({
    id: 'dialog',
    state: ():stateType => ({
        homeDialog: {
            dialogVisible: false,
            currentHomeDialog: '',
            data: {},
        }
    }),
    actions: {
        /**
         * 打开Home页面的dialog
         * @param dialogName dialog组件名称，用于component组件引用
         * @param data 向dialog组件传参
         */
        openHomeDialog(dialogName: string,data?: object) {
            this.homeDialog.currentHomeDialog = dialogName;
            this.homeDialog.dialogVisible = true;
            if(data) {
                this.homeDialog.data = data;
            }
        },
        /**
         * 关闭Home页面的dialog
         */
        closeHomeDialog() {
            this.homeDialog.dialogVisible = false;
            this.homeDialog.currentHomeDialog = '';
        }
    }
})


export default function useDialogStore() {
    return useStore(store);
}