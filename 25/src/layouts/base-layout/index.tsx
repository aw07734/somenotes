import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import Header from '../../components/header';
import Tabbar, {Tabber} from '../../components/tabbar';
import Topic from '../../view/topic';
import Article from '../../view/article';
import User from '../../view/user';
import About from '../../view/about';
import NotFound from '../../view/not-found';
import Layout, {Fixed, Main} from './style';
import logo from '../../assets/logo.svg';

const navList: Tabber[] = [
    { name: '全部', route: '/topic/all'},
    { name: '精华', route: '/topic/good'},
    { name: '分享', route: '/topic/share'},
    { name: '问答', route: '/topic/ask'},
    { name: '招聘', route: '/topic/job'},
    { name: '关于', route: '/about'}
];

const BaseLayout = () => {
    return (
        <Layout>
            <Fixed>
                <Header logo={logo} />
                <Tabbar value={navList} />
            </Fixed>

            <Main>
                <Switch>
                    <Redirect from={'/'} to={'/topic/all'} exact />
                    <Route path={'/topic/:tag'} component={Topic} key={new Date().getTime()} exact />
                    <Route path={'/article/:id'} component={Article} exact />
                    <Route path={'/user/:name'} component={User} exact />
                    <Route path={'/about'} component={About} exact />
                    <Route path={'*'} component={NotFound} exact />
                </Switch>
            </Main>
        </Layout>
    );
};

export default React.memo(BaseLayout);
