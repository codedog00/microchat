import {defineStore} from "pinia";
import store from "@renderer/store";
import authAPI from "../../../api/auth"
import tim from "@renderer/tim";

const storedUser = localStorage.getItem('user');


interface StateType {
    isLogin: boolean,
    user: user | null;
    userProfile: profile | null;
}

const useStore = defineStore({
    id: 'user',
    state: ():StateType => ({
        isLogin: !!storedUser,
        user: storedUser ? JSON.parse(storedUser) : null,
        userProfile: null,
    }),
    actions: {
        loginSuccess(user:user) {
            this.isLogin = true;
            this.user = user;
        },
        loginFailure() {
            this.isLogin = false;
            this.user = null;
        },
        logout() {
            this.isLogin = false;
            this.user = null;
            authAPI.logout();
        },
        login(loginData:{username:string;password:string}) {
            return authAPI.login(loginData)
                .then((res) => {
                    this.loginSuccess(res.data);
                    return Promise.resolve(res.data);
                }).catch(err => {
                    this.loginFailure();
                    return Promise.reject(err);
                })
        },
        register(registerData:{username:string;email:string;password:string}) {
            return authAPI.register(registerData);
        },
        updateProfile(newProfile: newProfile) {

            return tim.updateMyProfile(newProfile)
                .then(res => {
                    this.userProfile = {...res.data} //直接赋值，数据更改，但视图不会响应
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                })
        },
    }

})

export default function useUserStore() {
    return useStore(store)
}