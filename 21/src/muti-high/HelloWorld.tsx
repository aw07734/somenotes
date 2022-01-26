import React, { Component } from "react";
import { wrapWithHeight, wrapWithUserName } from "../hoc";

interface Props {
    name?: string;
}

@wrapWithUserName
@wrapWithHeight(180)
class HelloWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>你好 世界, my name is {this.props.name}</div>
    }
}

export default HelloWorld;

// export default wrapWithUserName(wrapWithHeight(170)(HelloWorld));