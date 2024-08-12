import React, { useContext } from 'react';
import { Text, StyleSheet, View, Image, Switch, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import { AuthContext } from '@/Context/AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

const Drawer = ({ userDetails }) => {
    const { theme, toggleTheme, isDarkMode } = useContext(ThemeContext);
    const { logout } = useContext(AuthContext);

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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: userDetails?.photo || 'https://via.placeholder.com/100' }}
                />
                <Text style={[styles.profileName, { color: theme.textColors.primaryText }]}>
                    {userDetails?.firstName ? `${userDetails.firstName} ${userDetails.lastName}` : 'John Doe'}
                </Text>
            </View>
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(main)/Dashboard/Course')}>
                <AntDesign name="home" size={24} color={theme.colors.primary} />
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(main)/Search')}>
                <AntDesign name="find" size={24} color={theme.colors.primary} />
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(main)/Profile')}>
                <AntDesign name="profile" size={24} color={theme.colors.primary} />
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <AntDesign name="logout" size={24} color={theme.colors.primary} />
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.switchContainer}>
                <Text style={[styles.menuText, { color: theme.textColors.primaryText }]}>Dark Mode</Text>
                <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuText: {
        fontSize: 16,
        marginLeft: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});

export default Drawer;
