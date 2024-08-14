import * as React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../Context/AuthContext';
import { ThemeProvider } from '../Context/ThemeContext';
import { RefreshProvider } from '@/Context/RefreshContext';

export default function Root() {
    return (
        <RefreshProvider>
            <AuthProvider>
                <ThemeProvider>
                    <Slot />
                </ThemeProvider>
            </AuthProvider>
        </RefreshProvider>
    );
}
