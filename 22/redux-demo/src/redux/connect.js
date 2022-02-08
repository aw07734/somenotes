import React, {Component} from "react";

function connect(mapStateToProps, mapDispatchToProps) {
    return function (WrappedComponent) {
        return class Connect extends Component {
            constructor(props, context) {
                super(props, context);
                this.store = context.store;
            }
            componentDidMount() {
                this.store.subscribe(this.hasChanged);
            }
            hasChanged() {
                this.forceUpdate();
            }

            render() {
                return (
                    <WrappedComponent
                        {...this.props}
                        {...mapStateToProps(this.store.getState(), this.props)}
                        {...mapDispatchToProps(this.store.dispatch, this.props)}
                    />
                )
            }
        };
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}
