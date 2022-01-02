<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view/>
        </transition>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Route} from "vue-router";

@Component
export default class App extends Vue {
    transitionName = '';

    @Watch('$route')
    onRouteChange(to: Route, from: Route) {

        this.transitionName = (to.meta ? to.meta.depth ? to.meta.depth : 0 : 0) > (from.meta ? from.meta.depth ? from.meta.depth : 0 : 0) ? 'slide-left' : 'slide-right';
    }
}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

html {
    width: 100%;
    height: 100%;
    font-size: 10px !important;
}

body {
    margin: 1.5rem;
}

//实际的 px = html.font-size * rem

@media only screen and (max-width: 338px) {
    html {
        font-size: 9px !important;
    }
}

@media only screen and (min-width: 411px) {
    html {
        font-size: 11px !important;
    }
}

@media only screen and (min-width: 450px) {
    html {
        font-size: 12px !important;
    }
}

@media only screen and (min-width: 525px) {
    html {
        font-size: 14px !important;
    }
}

@media only screen and (min-width: 600px) {
    html {
        font-size: 16px !important;
    }
}

@media only screen and (min-width: 768px) {
    html {
        font-size: 20px !important;
    }
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active{
    will-change: transform;
    transition: transform 350ms;
    position: absolute;
    overflow: hidden;
}

.slide-right-enter,
.slide-left-leave-active {
    transform: translate(-100%, 0);
}

.slide-left-enter,
.slide-right-leave-active {
    transform: translate(-100%, 0);
}
</style>
