import React, { useContext, useRef } from 'react';
import {
    Button,
    DrawerLayoutAndroid,
    StyleSheet,
    View,
} from 'react-native';
import Drawer from '@/Components/Drawer/Drawer';
import { AuthContext } from '@/Context/AuthContext';
import { ThemeContext } from '@/Context/ThemeContext';

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
