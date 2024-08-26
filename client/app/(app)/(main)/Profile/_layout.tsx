import { Stack } from 'expo-router'
import * as React from 'react'

const _layout = () => {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#009170',
            },
            headerTintColor: "white",
            headerTitleStyle: {
                color: 'white',
                fontWeight: "400"
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
            <Stack.Screen name="Setting" options={{ title: "Setting" }} />
            <Stack.Screen name="Testing" options={{ title: "Testing" }} />
            <Stack.Screen name="ProfileTesting" options={{ title: "Profile" }} />
        </Stack>
    )
}
export default _layout;