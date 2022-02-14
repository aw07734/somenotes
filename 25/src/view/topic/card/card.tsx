import React from 'react';
import {useHistory} from 'react-router-dom';

import {Topic as TopicType} from "../../../types";
import CardWrapper, {CarBody, CarHead, Info, Time} from "./style";
import {format} from 'timeago.js';
import Image from "../../../components/image";
import Tag from "../../../components/tag";

interface IProps {
    data: TopicType;
    onClick?: (e: React.MouseEvent) => void;
}

const Card: React.FC<IProps> = (props: IProps) => {
    const {
        data,
        onClick
    } = props;
    const history = useHistory();

    // 获取 tag 的类型
    const genTagType = () => {
        if (data.top) {
            return 'top';
        }
        if (data.good) {
            return 'good';
        }
        return data.tab;
    }

    const toUser = (e: React.MouseEvent, name: string) => {
        e.stopPropagation();
        history.push(`/user/${name}`);
    };

    return (
        <CardWrapper onClick={onClick}>
            <CarHead>
                <Tag type={genTagType()}></Tag>
                <h4>{data.title}</h4>
            </CarHead>
            <CarBody>
                <Image
                    src={data.author?.avatar_url || ""}
                    width={44}
                    height={44}
                    radius={4}
                    onClick={e => toUser(e, data.author.loginname)}
                />
                <Info>
                    <ul>
                        <li>查看数: {data.visit_count}</li>
                        <li>回复数: {data.reply_count}</li>
                    </ul>
                    <Time>{format(data.last_reply_at, 'zh_CN')}</Time>
                </Info>
            </CarBody>
        </CardWrapper>
    );
};

export {createSkeleton} from './style';

export default React.memo(Card);
