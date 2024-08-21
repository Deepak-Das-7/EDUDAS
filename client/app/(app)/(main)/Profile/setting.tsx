import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{}}>
            <Drawer />
        </GestureHandlerRootView>
    );
}
