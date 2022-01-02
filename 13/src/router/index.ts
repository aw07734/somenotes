import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'

const List = () => import(/* webpackChunkName: "list" */ '../views/List.vue')
const Detail = () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')

export enum RouteNames {
    Home = 'Home',
    List = 'List',
    Detail = 'Detail'
}

Vue.use(VueRouter);

/*
首页 -> 列表页 -> 详情页 页面左滑
反之, 页面右滑
 */

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: RouteNames.Home,
        component: Home,
        meta: {
            depth: 1
        }
    },
    {
        path: '/list',
        name: RouteNames.List,
        component: List,
        meta: {
            depth: 2
        }
    },
    {
        path: '/detail/:id',
        name: RouteNames.Detail,
        component: Detail,
        meta: {
            depth: 3
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
