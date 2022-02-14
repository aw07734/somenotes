import React from "react";
import TabbarWrapper, {TabbarItem} from "./style";
import {NavLink} from "react-router-dom";

export interface Tabber {
    name: string;
    route: string;
}

interface IProps {
    value: Array<Tabber>;
}

const Tabbar: React.FC<IProps> = (props: IProps) => {
    return (
        <TabbarWrapper>
            {
                props.value.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.route}
                        activeClassName={'active'}>
                        <TabbarItem>{item.name || ''}</TabbarItem>
                    </NavLink>
                ))
            }
        </TabbarWrapper>
    );
}

export default React.memo(Tabbar);
