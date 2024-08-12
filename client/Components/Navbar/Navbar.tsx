import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import { ThemeContext } from '../../Context/ThemeContext'; // Import ThemeContext
import Sidebar from './Sidebar';
import AntDesign from '@expo/vector-icons/AntDesign';

const Navbar = () => {
    const { userDetails } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [sidebarAnimation] = useState(new Animated.Value(-300));

    const handleSidebarToggle = () => {
        setIsSidebarVisible(!isSidebarVisible);
        Animated.timing(sidebarAnimation, {
            toValue: isSidebarVisible ? -300 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View>
            {userDetails && (
                <View style={[styles.navbar, { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.userText, { color: theme.colors.onPrimary }]}>
                        Welcome, {userDetails.firstName}
                    </Text>
                    {
                        isSidebarVisible ? (<TouchableOpacity
                            onPress={handleSidebarToggle}
                        >
                            <AntDesign name="menu-unfold" size={35} style={[styles.buttonText, { color: theme.buttonColors.primaryButtonText }]} />
                        </TouchableOpacity>) : (<TouchableOpacity
                            onPress={handleSidebarToggle}
                        >
                            <AntDesign name="menu-fold" size={35} style={[styles.buttonText, { color: theme.buttonColors.primaryButtonText }]} />
                        </TouchableOpacity>)
                    }
                </View>
            )}
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnimation }] }]}>
                <Sidebar />
            </Animated.View>
        </View>
    );
};

export default Navbar;

const styles = StyleSheet.create({
    navbar: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        elevation: 4,
    },
    userText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonText: {
        // fontSize: 14,
        fontWeight: 'bold',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '70%',
        elevation: 5,
        zIndex: 1,
    },
});
