import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import NewsScreen from "./NewsScreen";
import FindScreen from "./FindScreen";

const Tab = createBottomTabNavigator();

export default function () {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="News"
                options={
                    {
                        title: "新闻",
                        tabBarIcon: ({focused}) => {
                            return null;
                        }
                    }
                }
                component={NewsScreen}
            />
            <Tab.Screen
                name="Find"
                options={
                    {
                        title: "发现",
                        tabBarIcon: ({focused}) => {
                            return null;
                        }
                    }
                }
                component={FindScreen}
            />
        </Tab.Navigator>
    );
}
