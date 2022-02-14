import {TDate} from "timeago.js";

interface Author {
    loginname: string;
    avatar_url: string;
}

export interface Topic {
    id: string;
    tab: string;
    title: boolean;
    author_id: string;
    author: Author;
    content?: string,
    good?: boolean,
    top?: boolean,
    visit_count: number;
    reply_count: number;
    last_reply_at: TDate;
}

export interface ArticleLink {
    id: string;
    title: string;
    last_reply_at: TDate;
}
