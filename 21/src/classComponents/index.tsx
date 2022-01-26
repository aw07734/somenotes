import React, { Component } from "react";

/**
 * 4 种监听事件的 this 指向方式
 */
class Test extends Component<any, any> {
    private handleClick2: OmitThisParameter<() => void>;

    constructor(props: any) {
        super(props);
        this.state = {
            num: 1,
            title: '11111'
        };
        this.handleClick2 = this.handleClick1.bind(this);
    }

    handleClick1() {
        this.setState({
            num: this.state.num + 1
        });
    }

    handleClick4 = () => this.setState({
        num: this.state.num + 1
    });

    render() {
        return (
            <div>
                {/* 由于 bind 每次都会返回新韩淑, 所以子组件永远都会随着父组件刷新 */}
                <button onClick={this.handleClick1.bind(this)}>btn1</button>

                {/* 不会造成性能问题 */}
                <button onClick={this.handleClick2}>btn2</button>

                <button onClick={() => this.handleClick1()}>btn3</button>

                <button onClick={this.handleClick4}>btn4</button>
            </div>
        );
    }
}
