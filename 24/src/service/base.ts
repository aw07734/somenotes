// 封装项目要用到的公共请求层
import axios, {AxiosResponse, AxiosInstance, AxiosRequestConfig} from "axios";

export interface SuccessFormat {
    success?: boolean;
    data?: any;
}

const handleCommonError = (err: any) => {
    const msg = err.message || err.msg || '';
    alert(`请求失败, 请刷新页面重新尝试: ${msg}`);
};

const handleCommonResponse = (res: AxiosResponse, resolve: (res: any) => void) => {
    const response: SuccessFormat = res.data;
    if (response.hasOwnProperty('success')) {
        if (response.success) {
            resolve(response);
        } else {
            handleCommonError(response);
        }
    } else {
        handleCommonError(response);
    }
}

class SDK {
    $http: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.$http = axios.create(config || {});
    }

    get(url: string, params?: object): Promise<SuccessFormat> {
        return new Promise((resolve, reject) => {
            this.$http.get(url, {params})
                .then(res => handleCommonResponse(res, resolve))
                .catch(handleCommonError);
        });
    }

    post(url: string, data?: object): Promise<SuccessFormat> {
        return new Promise((resolve, reject) => {
            this.$http.post(url, data)
                .then(res => handleCommonResponse(res, resolve))
                .catch(handleCommonError);
        });
    }
}

export default SDK;
