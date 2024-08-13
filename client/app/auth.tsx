import React, { useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { View, Text, Button, Alert, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext
import TeacherLoginForm from '../Components/Login/TeacherLoginForm';
import StudentLoginForm from '../Components/Login/StudentLoginForm';
import TeacherSignupForm from '../Components/Login/TeacherSignupForm';
import StudentSignupForm from '../Components/Login/StudentSignupForm';
import { router } from 'expo-router';

type FormData = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
};

export default function Auth() {
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [userType, setUserType] = useState<'teacher' | 'student'>('student');
    const { login } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext); // Access the color context

    const handleLogin = async (formData: { email: string; password: string }) => {
        try {
            let response: AxiosResponse<any, any>;
            if (userType === 'teacher') {
                response = await axios.post(`https://edudas.onrender.com/teachers/login`, formData);
            } else {
                response = await axios.post(`https://edudas.onrender.com/students/login`, formData);
            }
            const token = response.data.token;
            login(token);
            router.replace('/(main)/Dashboard/Course');
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Error', 'An error occurred while logging in.');
        }
    };

    const handleSignup = async (formData: FormData) => {
        try {
            let response: AxiosResponse<any, any>;
            if (userType === 'teacher') {
                response = await axios.post(`https://edudas.onrender.com/teachers`, formData);
            } else {
                response = await axios.post(`https://edudas.onrender.com/students`, formData);
            }
            Alert.alert('Success', 'Registration successful!');
            setIsSignup(false);
        } catch (error) {
            console.error('Error registering:', error);
            Alert.alert('Error', 'An error occurred while registering.');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <Text style={[styles.title, { color: theme.textColors.primaryText }]}>
                    {isSignup ? 'Create Your Account' : 'Login to Your Account'}
                </Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Teacher"
                        onPress={() => setUserType('teacher')}
                        color={userType === 'teacher' ? theme.buttonColors.primaryButtonBackground : theme.buttonColors.disabledButtonBackground}
                    />
                    <Button
                        title="Student"
                        onPress={() => setUserType('student')}
                        color={userType === 'student' ? theme.buttonColors.primaryButtonBackground : theme.buttonColors.disabledButtonBackground}
                    />
                </View>
                {userType === 'teacher' && (
                    isSignup
                        ? <TeacherSignupForm onSubmit={handleSignup} />
                        : <TeacherLoginForm onSubmit={handleLogin} />
                )}
                {userType === 'student' && (
                    isSignup
                        ? <StudentSignupForm onSubmit={handleSignup} />
                        : <StudentLoginForm onSubmit={handleLogin} />
                )}
                <View style={styles.switchContainer}>
                    {!isSignup ? (
                        <Text style={{ color: theme.textColors.primaryText }}>
                            Don’t have an account?{' '}
                            <Text style={[styles.link, { color: theme.textColors.linkText }]} onPress={() => setIsSignup(true)}>Sign Up</Text>
                        </Text>
                    ) : (
                        <Text style={{ color: theme.textColors.primaryText }}>
                            Already have an account?{' '}
                            <Text style={[styles.link, { color: theme.textColors.linkText }]} onPress={() => setIsSignup(false)}>Login</Text>
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    switchContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    link: {
        fontWeight: 'bold',
    },
});
