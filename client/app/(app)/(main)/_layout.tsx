import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../../../Context/ThemeContext';

export default function _layout() {
    const { theme } = useContext(ThemeContext);

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.textColors.secondaryText,
            tabBarStyle: {
                minHeight: 55,
                padding: 10,
                backgroundColor: theme.colors.background,
            },
            headerShown: false,
        }}>
            <Tabs.Screen
                name="Dashboard"
                options={{
                    headerShown: false,
                    title: "Dashboard",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons name="dashboard" size={30} color={theme.colors.primary} />
                        ) : (
                            <MaterialIcons name="dashboard" size={26} color={theme.textColors.secondaryText} />
                        ),
                }}
            />
            <Tabs.Screen
                name="Search"
                options={{
                    headerShown: false,
                    title: "Search",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="search" size={30} color={theme.colors.primary} />
                        ) : (
                            <Ionicons name="search" size={26} color={theme.textColors.secondaryText} />
                        ),
                }}
            />
            <Tabs.Screen
                name="AddCourse"
                options={{
                    headerShown: false,
                    title: "AddCourse",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="add-circle" size={30} color={theme.colors.primary} />
                        ) : (
                            <Ionicons name="add-circle" size={26} color={theme.textColors.secondaryText} />
                        ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="people" size={30} color={theme.colors.primary} />
                        ) : (
                            <Ionicons name="people" size={26} color={theme.textColors.secondaryText} />
                        ),
                }}
            />
        </Tabs>
    );
}
