import React, { Component } from "react";
import { wrapWithUserName } from "../hoc";

interface Props {
    name?: string;
}

@wrapWithUserName
class HelloWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>你好 世界, my name is {this.props.name}</div>
    }
}

export default HelloWorld;