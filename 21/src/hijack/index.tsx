import React, {Component} from "react";
import {hijackHoc} from "../hoc/hijackHoc";

interface Props {
    name?: string;
}

interface State {
    weight?: number;
    height?: number;
}

@hijackHoc
class HijackComponent extends Component<Props, State> {
    constructor(p: Readonly<Props> | Props, context: State) {
        super(p);
        React.createContext(this.state);
        this.handleClick = this.handleClick.bind(this);
    }

    state: State = {
        weight: 70,
        height: 190
    };

    handleClick() {
        this.setState({
            weight: this.state.weight! + 1
        });
    }

    render(): React.ReactNode {
        return (
            <div onClick={this.handleClick}>
                hello world, my name is {this.state.weight}
            </div>
        )
    }
}

export default HijackComponent;
