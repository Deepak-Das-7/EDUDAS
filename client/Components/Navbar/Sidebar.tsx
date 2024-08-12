import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { AuthContext } from '../../Context/AuthContext';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const Sidebar: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { userDetails, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        logout();
                        router.replace('/auth');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={[styles.sidebar, { backgroundColor: theme.colors.background }]}>
            <View style={styles.userInfo}>
                <AntDesign name="user" size={50} color={theme.colors.onBackground} />
                <Text style={[styles.userName, { color: theme.textColors.primaryText }]}>
                    {userDetails?.firstName} {userDetails?.lastName}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/(main)/AddPost')}
            >
                <AntDesign name="home" size={24} color={theme.colors.primary} />
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={toggleTheme}
            >
                <AntDesign name="bulb1" size={24} color={theme.colors.primary} />
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>
                    Change Mode
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/(main)/AddPost')}
            >
                <AntDesign name="profile" size={24} color={theme.colors.primary} />
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>
                    Profile
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={handleLogout}
            >
                <AntDesign name="logout" size={24} color={theme.colors.primary} />
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        flex: 1,
        padding: 20,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 30,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    menuText: {
        fontSize: 18,
        marginLeft: 15,
    },
});

export default Sidebar;
