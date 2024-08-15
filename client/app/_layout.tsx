import * as React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../Context/AuthContext';
import { ThemeProvider } from '../Context/ThemeContext';
import { RefreshProvider } from '@/Context/RefreshContext';
import { StatusBar } from 'react-native';

export default function Root() {
    return (
        <RefreshProvider>
            <AuthProvider>
                <ThemeProvider>
                    <StatusBar hidden={true} />
                    <Slot />
                </ThemeProvider>
            </AuthProvider>
        </RefreshProvider>
    );
}
