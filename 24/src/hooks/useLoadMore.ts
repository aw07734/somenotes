import {useEffect, useRef, useCallback} from "react";
import useAsync from "./useAsync";

const defaultOption = {
    initPage: 1,
    initPageSize: 10
};

interface Option extends Partial<typeof defaultOption> {
    defaultResult?: { list: any[] };

    formatResult?<T>(result: any): { list: any[] };

    isNoMore?(result: any): boolean;
}

/**
 *
 * @param {Function} action should return a Promise
 * @param {Object} option
 * @param {Array} deps dependencies
 */
export default (
    action: (res: any) => Promise<any>,
    option: Option = defaultOption,
    deps: React.DependencyList = []
) => {
    option = Object.assign({}, defaultOption, option || {});

    const defaultList = option.defaultResult?.list || [];

    const infoRef = useRef({
        completed: false,
        page: 1,
        list: [] as any[]
    });

    const actionHandler = useCallback(() => {
        return action({
            page: infoRef.current.page,
            pageSize: option.initPageSize
        });
    }, [action]);

    const {loading, run} = useAsync(actionHandler, {
        mannual: true, // 是否手动触发
        onSuccess: (res: { list?: any }) => {
            const prevList = infoRef.current.list;
            const currentPage = infoRef.current.page;

            const resultList = option.formatResult
                ? option.formatResult({
                    response: res,
                    page: currentPage
                }).list
                : res.list;

            infoRef.current.list = currentPage !== 1 ? prevList.concat(resultList) : resultList;

            infoRef.current.completed = option.isNoMore ? option.isNoMore(res) : false;
        }
    });

    const loadMore = useCallback(() => {
        infoRef.current = {
            ...infoRef.current,
            page: infoRef.current.page + 1
        };
        run();
    }, []);

    useEffect(() => {
        infoRef.current = {
            page: 1,
            list: defaultList || [],
            completed: false
        };
        if (!defaultList?.length) {
            run();
        }
    }, [...deps]);

    return {
        loading,
        loadMore,
        ...infoRef.current
    };
};
