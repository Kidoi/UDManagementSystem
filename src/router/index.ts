import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/",
        redirect: "/login",
        component: Layout,
        meta: {
            hidden: true
        },
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import("@/views/home/index.vue"),
                meta: {
                    hidden: false,
                    title: '主页'
                },
            },
            {
                path: 'user',
                name: 'User',
                component: () => import("@/views/user/index.vue"),
                meta: {
                    hidden: true,
                }
            },
            {
                path: 'device',
                name: 'Device',
                component: () => import("@/views/device/index.vue"),
                meta: {
                    hidden: false,
                    title: '设备详情'
                }
            },
            {
                path: 'data',
                name: 'Data',
                component: () => import("@/views/data/index.vue"),
                meta: {
                    hidden: false,
                    title: '数据详情'
                }
            }
        ]
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404/index.vue"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/:catchAll(.*)",
        redirect: "404",
        meta: {
            hidden: true
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export function resetRouter(){
    const newRouter = createRouter({
        history: createWebHashHistory(),
        routes,
    });
    // @ts-ignore
    router.matcher = newRouter.matcher;
}

export default router;