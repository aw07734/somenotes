<template>
    <div class="home">
        <slider @onTabChange="onTabChange"/>
        <banner :src="bannerSrc"/>
        <home-recommend v-show="!showVideo"/>
        <video-list v-show="showVideo"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Slider from '@/components/Slider.vue';
import Banner from '@/components/Banner.vue';
import HomeRecommend from '@/components/HomeRecommend.vue';
import VideoList from '@/components/VideoList.vue';

/*
改变 slider 的 activeTab 时, banner 图会随之改变

切换 slider 的时候, 视频 tab下面展示 videoList, 其他 tab下面显示首页推荐
*/

@Component({
    components: {
        Slider,
        Banner,
        HomeRecommend,
        VideoList
    }
})
export default class Home extends Vue {
    @Prop() private msg!: string;

    readonly BANNER_LIST = [
        'https://img-qn-3.51miz.com/Element/00/81/42/01/ab5f83cd_E814201_e46dec32.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/320',
        'https://img-qn-5.51miz.com/Element/00/81/09/05/d7fbd523_E810905_92312e74.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/320',
        'https://img-qn-0.51miz.com/preview/element/00/01/06/99/E-1069901-C401590B.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/320',
        'https://img-qn-0.51miz.com/Element/00/62/44/86/43d8459f_E624486_901862c1.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/320',
        'https://img-qn-1.51miz.com/Element/00/16/24/40/1099ded5_E162440_7b3a705g.png!/quality/90/unsharp/true/compress/true/format/png/fh/320',
        'https://img-qn-3.51miz.com/Element/00/80/90/72/1fa23946_E809072_00f05a4b.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/320',
        'https://img-qn-2.51miz.com/Element/00/81/19/37/b9bda15b_E811937_ef8038c8.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/320'
    ];

    bannerSrc: string = this.BANNER_LIST[0];

    showVideo = false;

    onTabChange(index: number) {
        if (index === 1) {
            this.showVideo = true;
        } else {
            this.showVideo = false;
        }
        this.bannerSrc = this.BANNER_LIST[index];
    }
}
</script>