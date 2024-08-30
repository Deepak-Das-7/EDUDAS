import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MyTabBar from '@/Components/TopTab/MyTabBar';
import Home from './index';
import Spinner from './setting';
import { ThemeContext } from '@/Context/ThemeContext';
import { StatusBar } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const _layout = () => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.onPrimary,
                tabBarInactiveTintColor: theme.textColors.secondaryText,
                tabBarStyle: {
                    backgroundColor: theme.colors.primary,
                    paddingTop: StatusBar.currentHeight
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                    paddingVertical: 0,
                    marginHorizontal: 0,
                },

                tabBarScrollEnabled: true,
            }}
        >
            <Tab.Screen name="index" component={Home} />
            <Tab.Screen name="setting" component={Spinner} />
        </Tab.Navigator>
    )
}
export default _layout;