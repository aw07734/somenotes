import axios from 'axios';
import {DetailInfo, HomeRecommendListItem} from './types';

export default class Service {

    static init() {
        axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/296795/mockflow';
    }

    // 推荐列表
    static async getHomeRecommendList() {
        this.init();
        // 请求回来的结果是 HomeRecommendListItem[]
        return axios.get<HomeRecommendListItem[]>('/homeRecommendList').then(res => res.data);
    }

    // 列表数据
    static async getList() {
        this.init();
        // 请求回来的结果是 DetailInfo[]
        return axios.get<DetailInfo[]>('/list').then(res => res.data);
    }
}