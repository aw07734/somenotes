// TODO 实现具体的接口请求
import Service, {SuccessFormat} from './base';

class CnodeSDK extends Service {
    constructor() {
        super({
            baseURL: 'https://cnodejs.org/api/v1',
            timeout: 10000
        });
    }

    /**
     * 获取对应 tab 的列表
     * @param tab 类型
     * @param page 页码
     * @param limit 每页请求的数量
     */
    getTopicByTab(tab: string, page: number = 1, limit: number = 20): Promise<SuccessFormat> {
        return this.get('/topics', {
            page,
            limit,
            tab
        });
    }

    getTopicDetail(topicId: string | number): Promise<SuccessFormat> {
        return this.get(`/topic/${topicId}`);
    }

    getUserDetail(username: string): Promise<SuccessFormat> {
        return this.get(`/user/${username}`);
    }

    getUserCollection(username: string): Promise<SuccessFormat> {
        return this.get(`/topic_collect/${username}`);
    }


}

export default new CnodeSDK();
