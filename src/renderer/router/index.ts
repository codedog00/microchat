import { createRouter, createWebHashHistory } from "vue-router";
import routerMap from './constantRouterMap';
import useUserStore from "@store/user/user";

const userStore = useUserStore();

const router = createRouter({
    history: createWebHashHistory(),
    routes: routerMap
})

router.beforeEach(async (to,from,next) => {
    if(to.name !== 'auth' && !userStore.isLogin) {
        next({name: 'auth'})
    }else {
        next();
    }
})

export default router;