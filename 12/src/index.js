import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home'
import About from './About'
import App from './App'
import Vuex from 'vuex'

Vue.use(Router);
Vue.use(Vuex);

export function createApp() {
    const store = new Vuex.Store({
        state: {
            timestamp: new Date().getTime()
        }
    });

    if (typeof window !== 'undefined' && window.store) {
        store.replaceState(widnow.store);
    }

    const router = new Router({
        mode: 'history',
        routes: [
            {path:'/', component: Home},
            {path:'/about', component: About}
        ]
    });

    const vm = new Vue({
        store,
        router,
        render: h => h(App)
    });
    return {vm, router, store};
}