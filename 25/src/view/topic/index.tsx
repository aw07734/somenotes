import React, {useCallback, useMemo} from 'react';
import Card, {createSkeleton} from "./card/card";
import {useHistory, useParams} from 'react-router-dom';

import sdk from '../../service/cnode-sdk';
import useLoadMore from "../../hooks/useLoadMore";
import {Topic as TopicType} from "../../types";
import ScrollList from "../../components/scroll-list";

const PAGE_SIZE = 20;
const Skeleton = createSkeleton(5);

const Topic = () => {
    const {tag = ''} = useParams<{tag: string}>();
    const history = useHistory();

    const getTopicByTab = useCallback((info) => {
        return sdk.getTopicByTab(tag, info.page || 1, info.initPageSize);
    }, [tag]);

    const {list, loading, loadMore, completed} = useLoadMore(getTopicByTab, {
        initPageSize: 20,
        formatResult: ({response: {data = []} = {}}) => ({
            list: data
        }),
        isNoMore: ({data}: { data: { length: number } }) => {
            return data && data.length > PAGE_SIZE;
        }
    });

    const hasList = useMemo(() => list?.length, [list]);

    const toDetailArticle = (info: TopicType) => {
        history.push({
            pathname: `/article/${info.id}`,
            state: info
        });
    }
    return (
        <div>
            {hasList && (
                <ScrollList
                    loading={loading}
                    completed={completed}
                    onLoad={loadMore}
                >
                    {
                        list.map((item: TopicType) => (
                            <Card
                                key={item.id}
                                data={item}
                                onClick={() => toDetailArticle(item)}
                            />
                        ))
                    }
                </ScrollList>
            )}
            {!hasList && Skeleton}
        </div>
    );
};

export default Topic;
