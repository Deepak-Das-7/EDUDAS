import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MyTabBar from '@/Components/TopTab/MyTabBar';
import Home from './index';
import Spinner from './setting';

const Tab = createMaterialTopTabNavigator();

const _layout = () => {
    return (
        <Tab.Navigator
        >
            <Tab.Screen name="index" component={Home} />
            <Tab.Screen name="setting" component={Spinner} />
        </Tab.Navigator>
    )
}
export default _layout;