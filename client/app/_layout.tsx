import * as React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../Context/AuthContext';
import { ThemeProvider } from '../Context/ThemeContext';
import { StatusBar } from 'react-native';

export default function Root() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <StatusBar hidden={true} />
                <Slot />
            </ThemeProvider>
        </AuthProvider>
    );
}
