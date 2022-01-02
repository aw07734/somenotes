<template>
    <div class="list-page">
        <div class="input-container">
            <input type="text"
                   v-model="search"
                   class="input"
                   placeholder="请输入关键字搜索"
            />
        </div>
        <div class="list-container">
            <div class="list-item"
                 v-for="item in currentList"
                 :key="item.id"
                 @click="toDetail(item.id)"
            >
                <div class="left-section">
                    {{getRandomEmoji()}}
                </div>
                <div class="right-section">
                    <span class="title">{{item.title}}</span>
                    <span class="desc">{{item.content}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Service from "@/service";
import {DetailInfo} from "@/service/types";
import {RouteNames} from "@/router";

/*
搜索框
可滚动的列表项
 */

@Component
export default class List extends Vue {
    readonly emojiList = ["😥", "😮", "🤐", "😯", "😪"]; // 0 1 2 3 4

    // 用户输入的关键字
    search = '';

    textList: DetailInfo[] = [];

    async created() {
        this.textList = await Service.getList();
        this.$store.commit('setDetailInfo', this.textList);
    }

    // computed
    get currentList() {
        console.log(this.search);
        // 关键字搜索后, 实际展示的列表
        return this.textList.filter(item => item.title.includes(this.search));
    }

    getRandomEmoji() {
        // 获取随机的 emoji 表情
        const randomIndex = Math.floor(Math.random() * 5); // [0,1) => [0,5)
        return this.emojiList[randomIndex];
    }

    toDetail(id: number) {
        // 跳转到详情页
        this.$router.push({
            name: RouteNames.Detail,
            params: {
                id: String(id)
            }
        });
    }
}
</script>

<style lang="less" scoped>
.input-container {
    position: sticky; // 在可视区域内 relative, 离开可视区域时 fixed, 只是效果类似, 并不是如此实现
    top: 0;

    height: 6rem;
    background: white;

    .input {
        outline-style: none;
        border: 1px solid #cccccc;
        border-radius: 0.3rem;

        padding: 1rem;

        width: 60%;
        margin: 1rem auto;
        text-align: center;
    }
}

.list-container {
    .list-item {
        background: white;
        box-shadow: 0 0 1rem rgba(144, 144, 144, 0.15);
        height: 10rem;
        border-radius: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        margin-top: 1.5rem;

        .left-section {
            width: 7rem;
            height: 7rem;
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 2.5rem;
            font-weight: bold;
            color: white;
            background: #6ab6fc;
            border-radius: 1rem;
        }

        .right-section {
            margin-left: 1rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            flex-direction: column;

            .title {
                font-size: 1.4rem;
                font-weight: 500;
                text-align: left;
            }

            .desc {
                margin-top: 1rem;
                font-size: 1.2rem;
                font-weight: 400;
                text-align: left;

                // 两行, 超出部分省略号
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>