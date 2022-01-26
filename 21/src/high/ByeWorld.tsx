import React, {Component} from "react";
import { wrapWithUserName } from "../hoc";

interface Props {
    name: string;
}

class ByeWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>bye, ugly world, my name is {this.props.name}</div>
    }
}

export default wrapWithUserName(ByeWorld);