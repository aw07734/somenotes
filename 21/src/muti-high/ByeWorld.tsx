import React, { Component } from "react";
import { wrapWithHeight, wrapWithUserName } from "../hoc";

interface Props {
    name?: string;
}

@wrapWithUserName
@wrapWithHeight(170)
class ByeWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>再见 世界, my name is {this.props.name}</div>
    }
}

export default ByeWorld;