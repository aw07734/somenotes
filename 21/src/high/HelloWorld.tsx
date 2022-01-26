import React, {Component} from "react";
import { wrapWithUserName } from "../hoc";

interface Props {
    name: string;
}

class HelloWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>hello world, my name is {this.props.name}</div>
    }
}

export default wrapWithUserName(HelloWorld);