import * as React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../Context/AuthContext';
import { ThemeProvider } from '../Context/ThemeContext';
import { RefreshProvider } from '@/Context/RefreshContext';
import { StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Root() {
    return (
        <RefreshProvider>
            <AuthProvider>
                <ThemeProvider>
                    <RootSiblingParent>
                        <StatusBar hidden={true} />
                        <Slot />
                    </RootSiblingParent>
                </ThemeProvider>
            </AuthProvider>
        </RefreshProvider>
    );
}
