import {useEffect} from 'react';

// 定义页面的滚动条位置
function useInitPosition(...args: any): void {
    // 只执行一次, 类似于 componentDidMount
    useEffect(() => {
        window.scrollTo.apply(null, args);
    }, []);
}

export default useInitPosition;
