<template>
    <div class="video-container">
        视频列表 - test
        <video v-for="item in videoList"
               :key="item"
               :src="item"
               controls
               preload="metadata"
        ></video>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class VideoList extends Vue {
    videoList = [

    ];
}
</script>

<style lang="less" scoped>
.video-container {
    width: 100%;
    margin-top: 2rem;

    video {
        margin-top: 1rem;
        width: 100%;
        height: 15rem;
    }
}
</style>