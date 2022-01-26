import React, { Component } from "react";

interface State {
    name: string;
}

export const wrapWithUserName = (WrappedComponent: any) => {
    return class extends Component<any, any> {
        public state: State = {
            name: ""
        };

        componentWillMount() {
            const username = localStorage.getItem("name");
            this.setState({
                name: username
            });
        }

        render(): React.ReactNode {
            return <WrappedComponent name={this.state.name} {...this.props} />
        }
    }
}

export const wrapWithHeight = (height?: number) => {
    return (WrappedComponent: any) => {
        return class extends Component<any, any> {
            render(): React.ReactNode {
                return (
                    <div>
                        我的身高是{height}
                        <WrappedComponent {...this.props} />
                    </div>
                )
            }
        }
    }
}