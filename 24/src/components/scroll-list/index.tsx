import React, {useEffect, useCallback, useRef} from "react";

// polyfill 兼容低版本浏览器, 使其可以使用 observer 功能
import 'intersection-observer';
import Loading from '../loading';
import styled from 'styled-components';

export interface IProps {
    loading: boolean;
    completed: boolean;
    children: React.ReactNode;
    onLoad: () => void;
}

const Tip = styled.div`
  margin: 10px auto;
  color: #333;
  text-align: center;
`;

// Function Component
const ScrollList: React.FC<IProps> = (props: IProps) => {
    const {
        loading,
        completed,
        children,
        onLoad
    } = props;

    // 如果一个函数需要传给另外的组件或者函数, 最好使用 useCallback
    const handler = useCallback((entries) => {
        if (completed) {
            return;
        }
        if (entries[0].intersectionRatio > 0) {
            // 如果在可视区域
            onLoad();
        }
    }, [completed, onLoad]);

    const observer: React.RefObject<IntersectionObserver> = useRef(
        new IntersectionObserver(handler)
    );

    const bottomElement: any = useRef<HTMLDivElement>();

    // Class 监听和取消监听会在两个生命周期里实现

    useEffect(() => {
        // 监听
        observer.current && observer.current.observe(bottomElement.current);

        // 取消监听
        return () => {
            observer.current && observer.current.unobserve(bottomElement.current);
        }
    });

    return (
        <div>
            {children}
            <div ref={bottomElement}>
                {loading && !completed && <Loading text={"正在拼命加载中"}/>}
                {!loading && completed && <Tip>加载完成</Tip>}
            </div>
        </div>
    );
};

// useMemo

// 建议大家在有 props 的函数组件, 都包裹上 React.memo
export default React.memo(ScrollList);
