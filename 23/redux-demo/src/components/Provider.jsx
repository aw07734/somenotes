import React, {Children} from "react";

export default class Provider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = props.store;
    }

    getChildContext() {
        return {store: this.store};
    }

    render() {
        return Children.only(this.props.children);
    }
}
