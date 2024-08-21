import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { useContext } from 'react';
import { ThemeContext } from '@/Context/ThemeContext';
import { TabNavigationState, ParamListBase } from '@react-navigation/native';
import { MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <MaterialTopTabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.onPrimary,
                tabBarInactiveTintColor: theme.textColors.secondaryText,
                tabBarStyle: {
                    backgroundColor: theme.colors.primary,
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                    paddingVertical: 0,
                    marginHorizontal: 0,
                },

                tabBarScrollEnabled: true,
            }}
        >
            <MaterialTopTabs.Screen name='Course' options={{ title: 'Courses' }} />
            <MaterialTopTabs.Screen name='Performance' options={{ title: 'Performance' }} />
            <MaterialTopTabs.Screen name='Tests' options={{ title: 'Tests' }} />
        </MaterialTopTabs>
    );
};

export default Layout;
