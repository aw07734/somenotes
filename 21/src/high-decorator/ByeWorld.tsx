import React, { Component } from "react";
import { wrapWithUserName } from "../hoc";

interface Props {
    name?: string;
}

@wrapWithUserName
class ByeWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>εθ§ δΈη, my name is {this.props.name}</div>
    }
}

export default ByeWorld;