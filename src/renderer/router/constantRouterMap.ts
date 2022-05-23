import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { path: '/:pathMatch(.*)*', component: () => import("@renderer/pages/404/404.vue") },
    { path: '/',  redirect: '/home'},
    {
        path: '/home',
        name: '总览',
        component: () => import('@renderer/pages/Home/Home.vue'),
    },
    {
        path: '/home',
        name: '总览',
        component: () => import('@renderer/pages/Home/Home.vue'),
        children: [
            {
                path: 'conversation',
                component: () => import('@renderer/views/Home-CurrentContent/content-conversation.vue'),
            },
            {
                path: 'friendProfile',
                component: () => import('@renderer/views/Home-CurrentContent/content-FriendProfile.vue'),
            }
        ]
    },
    { path: '/auth' ,name: 'auth', component: () => import('@renderer/pages/Auth/Auth.vue') },
]

export default routes