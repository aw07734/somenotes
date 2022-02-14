import React from 'react';

import {ArticleLink} from '../../types';
import sdk from '../../service/cnode-sdk';
import useAsync from '../../hooks/useAsync';
import useInitPosition from '../../hooks/useInitPosition';
import Image from "../../components/image";
import {format} from "timeago.js";
import {
    InfoPanel,
    InfoContent,
    ListItem,
    ListPanel,
    SkeletonInfo,
    SkeletonList
} from './style';
import {Link, useParams} from 'react-router-dom';

interface UserDetail {
    avatar_url: string;
    create_at: string;
    githubUsername: string;
    loginname: string;
    recent_replies: ArticleLink[];
    recent_topics: ArticleLink[];
    score: number;
}

interface InfoProps {
    loginname?: string;
    avatar_url?: string;
    score?: number;
    create_at: string;
}

interface ListProps {
    title: string;
    value: ArticleLink[];
}

const Info: React.FC<{value: InfoProps | undefined}> = React.memo((props) => {
    const info = props.value || ({} as InfoProps);

    // TODO 判断 info 是否为空, 如果为空, 显示骨架图
    // 如果不为空, 显示数据
    return (
        <InfoPanel>
            <Image
                src={info?.avatar_url || ''}
                width={60}
                height={60}
                radius={4}
            />
            <InfoContent>
                <h3>{info?.loginname}</h3>
                <ul>
                    <li>积分: {info.score || 0}</li>
                    <li>注册于{format(info.create_at, 'zh_CN')}</li>
                </ul>
            </InfoContent>
        </InfoPanel>
    );
});

const List: React.FC<ListProps> = React.memo((props) => {
    const {title, value = []} = props;
    // TODO 判断 info 是否为空, 如果为空, 显示骨架图
    // 如果不为空, 显示数据
    return (
        <ListPanel>
            <h3>{title}</h3>
            {
                value.map(link => (
                    <ListItem key={link.id}>
                        <Link to={`/article/${link.id}`}>{link.title}</Link>
                        <span className='create-at'>
                            {format(link.last_reply_at, 'zh_CN')}
                        </span>
                    </ListItem>
                ))
            }
        </ListPanel>
    );
});

const User: React.FC<{}> = (props) => {
    // @ts-ignore
    const {name = ""} = useParams();

    let {result: infoResult} = useAsync<{data: UserDetail}>(() => sdk.getUserDetail(name));

    let {result: collectionResult} = useAsync<{data: ArticleLink[]}>(() => sdk.getUserCollection(name));

    // 在列表页的时候, 滚动条可能已经滚下去了, 需要重置一下
    useInitPosition(0, 0);

    const info = infoResult ? infoResult.data : ({} as UserDetail);
    const collection = collectionResult ? collectionResult.data : ([] as ArticleLink[]);

    return (
        <section>
            <Info value={info} />
            <List title='最近发布话题' value={info?.recent_topics} />
            <List title='最近回复' value={info?.recent_replies} />
            <List title='收藏话题' value={collection} />
        </section>
    );
};

export default User;
