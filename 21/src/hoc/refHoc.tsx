import React, { Component } from "react";

export const refHoc = (WrappedComponent: any) => class extends Component<any, any> {

    ref: any = null;

    componentDidMount() {
        console.log(this.ref);
        // 子组件 componentDidMount
        // 父组件 componentDidMount
    }

    render(): React.ReactNode {
        return (
            <div>
                <WrappedComponent {...this.props} ref={(instance: any) => (this.ref = instance)} />
            </div>
        );
    }
};