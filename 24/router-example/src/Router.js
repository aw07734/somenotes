import React from 'react';
import {createBrowserHistory} from 'history';
import {match as matchPath} from 'path-to-regexp';

const history = createBrowserHistory();

export class Route extends React.Component {
    componentWillMount() {
        const unlisten = history.listen((location, action) => {
            this.forceUpdate();
        });
        this.setState({unlisten});
    }

    componentWillUnmount() {
        const {unlisten} = this.state;
        unlisten();
    }

    render() {
        const pathname = window.location.pathname;
        const {
            path,
            component: Component,
            render,
            children
        } = this.props;
        const match = matchPath(path);
        const matchResult = match(pathname);

        if (!matchResult) return null;
        if (render) return render({match: matchResult});
        if (children) return children;
        return (
            <Component match={matchResult}/>
        );
    }
}

export class Link extends React.Component {
    /* 注意这里需要用箭头函数来 bind this指向 */
    handleClick = e => {
        const {to} = this.props;
        e.preventDefault();
        history.push(to);
    }

    render() {
        const {to, children} = this.props;
        return (
            <a href={to} onClick={this.handleClick}>{children}</a>
        );
    }
}
