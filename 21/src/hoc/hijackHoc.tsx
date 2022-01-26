import React from "react";

export function hijackHoc<T extends { new(...args: any[]): any }>(component: T) {
    return class extends component {

        // 继承 劫持
        handleClick = () => {
            super.handleClick();
            alert('你被我劫持啦!');
        }

        render() {
            const parent = super.render();

            return React.cloneElement(parent, {
                onClick: this.handleClick
            });
        }
    }
}
