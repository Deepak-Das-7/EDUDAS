import React, { useContext, useRef } from 'react';
import {
    Button,
    DrawerLayoutAndroid,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Drawer from '@/Components/Drawer/Drawer';
import { AuthContext } from '@/Context/AuthContext';
import { ThemeContext } from '@/Context/ThemeContext';
import { router } from 'expo-router';

const Home = () => {
    const drawer = useRef<DrawerLayoutAndroid>(null);
    const { userDetails } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            renderNavigationView={() => <Drawer userDetails={userDetails} />}
        >
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <Button
                    title="Open drawer"
                    onPress={() => drawer.current?.openDrawer()}
                />
                <TouchableOpacity onPress={() => {
                    // console.log("goingggggg");
                    router.push("/Profile/Setting")
                }}>
                    <Text>Go to settings tab</Text>
                </TouchableOpacity>
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
});

export default Home;
