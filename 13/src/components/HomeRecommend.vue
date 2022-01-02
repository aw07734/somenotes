<template>
    <div class="home-recommend">
        <h3>推荐</h3>
        <div class="recommend-container">
            <div class="recommend-item"
                 v-for="(item,index) in list"
                 :key="item.text"
                 :class="{'recommend-hover': index === activeIndex}"
                 @click="onClick(index)"
            >
                <img :src="item.image" :alt="item.text"/>
                <span>{{ item.text }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {HomeRecommendListItem} from "@/service/types";
import Service from "@/service";
import {RouteNames} from "@/router";

/*
口口口
口口口
口口口

点击动作, 点击的时候, 能让用户更明显的看出点击了哪个, 模拟点击按下去的效果
*/

@Component
export default class HomeRecommend extends Vue {
    list: HomeRecommendListItem[] = [];

    activeIndex = -1;

    async created() {
        console.log('created method exec!');
        this.list = await Service.getHomeRecommendList();
    }

    onClick(index: number) {
        this.activeIndex = index;
        setTimeout(() => this.$router.push({
            name: RouteNames.List
        }), 200);
    }
}
</script>

<style lang="less" scoped>
.recommend-hover {
    transform: translate3d(1px, 1px, 0);
}

h3 {
    font-size: 1.6rem;
    font-weight: bold;
}

.recommend-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .recommend-item {
        width: 10.6rem;
        height: 10.6rem;
        margin-bottom: 3rem;

        background: gray;
        border-radius: 0.5rem;

        box-shadow: 0 1rem 2rem -0.4rem rgba(106, 182, 252, 0.5);

        img {
            border-radius: 0.5rem;
            width: 100%;
            height: 100%;
        }
    }
}
</style>