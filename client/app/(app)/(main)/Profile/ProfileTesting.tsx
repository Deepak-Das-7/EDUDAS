import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import { AuthContext } from '@/Context/AuthContext';
import { router } from 'expo-router';

export default function Profile() {
    const { theme } = useContext(ThemeContext);
    const { userDetails, logout } = useContext(AuthContext); // Make sure updateUserDetails is defined
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userDetails });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const updateUserDetails = (formData: any) => {
        console.log(formData);
    };

    const handleSave = () => {
        updateUserDetails(formData);
        setIsEditing(false);
    };

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
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: userDetails.profilePicture || 'https://via.placeholder.com/100' }} // Use a placeholder if no profile picture
                    style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                    {isEditing ? (
                        <>
                            <TextInput
                                style={[styles.input, { color: theme.textColors.primaryText, borderColor: theme.colors.primary }]}
                                value={formData.firstName}
                                onChangeText={(text) => handleInputChange('firstName', text)}
                                placeholder="First Name"
                            />
                            <TextInput
                                style={[styles.input, { color: theme.textColors.primaryText, borderColor: theme.colors.primary }]}
                                value={formData.lastName}
                                onChangeText={(text) => handleInputChange('lastName', text)}
                                placeholder="Last Name"
                            />
                        </>
                    ) : (
                        <>
                            <Text style={[styles.name, { color: theme.textColors.primaryText }]}>{userDetails.firstName} {userDetails.lastName}</Text>
                        </>
                    )}
                    <Text style={[styles.email, { color: theme.textColors.secondaryText }]}>{userDetails.email}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Bio:</Text>
                {isEditing ? (
                    <TextInput
                        style={[styles.input, { color: theme.textColors.primaryText, borderColor: theme.colors.primary }]}
                        value={formData.bio}
                        onChangeText={(text) => handleInputChange('bio', text)}
                        placeholder="Bio"
                    />
                ) : (
                    <Text style={[styles.text, { color: theme.textColors.secondaryText }]}>{userDetails.bio}</Text>
                )}

                <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Date of Birth:</Text>
                {isEditing ? (
                    <TextInput
                        style={[styles.input, { color: theme.textColors.primaryText, borderColor: theme.colors.primary }]}
                        value={formData.dateOfBirth}
                        onChangeText={(text) => handleInputChange('dateOfBirth', text)}
                        placeholder="YYYY-MM-DD"
                    />
                ) : (
                    <Text style={[styles.text, { color: theme.textColors.secondaryText }]}>{userDetails.dateOfBirth}</Text>
                )}
            </View>

            {isEditing ? (
                <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.colors.primary }]} onPress={handleEditToggle}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.buttonColors.errorButtonBackground }]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
    detailsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    text: {
        fontSize: 18,
        marginBottom: 15,
    },
    input: {
        fontSize: 18,
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    editButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});


