import React, { Component } from "react";
import { refHoc } from "../hoc/refHoc";

interface Props {
    name?: string;
}

interface State {
    weight?: number;
    height?: number;
}

@refHoc
class Test extends Component<Props, State> {

    state: State = {
        weight: 70,
        height: 190
    }

    render(): React.ReactNode {
        return (
            <div>hello world, my name is {this.state.height}</div>
        )
    }
}

export default Test;