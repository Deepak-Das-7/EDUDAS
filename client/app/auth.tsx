import React, { useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { View, Text, Button, Alert, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { ThemeContext } from '../Context/ThemeContext';
import TeacherLoginForm from '../Components/Login/TeacherLoginForm';
import StudentLoginForm from '../Components/Login/StudentLoginForm';
import TeacherSignupForm from '../Components/Login/TeacherSignupForm';
import StudentSignupForm from '../Components/Login/StudentSignupForm';
import { router } from 'expo-router';
import { BASE_URL } from '@env';

type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
};

export default function Auth() {
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [userType, setUserType] = useState<'teacher' | 'student'>('student');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { login } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    const handleLoginError = (error: any) => {
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const data = error.response.data;

            switch (status) {
                case 400:
                    if (data.message === 'Email and password are required') {
                        Alert.alert('Error', 'Please provide both email and password.');
                    } else if (data.message === 'Invalid credentials') {
                        Alert.alert('Error', 'The email or password you entered is incorrect.');
                    } else {
                        Alert.alert('Error', data.message || 'Bad Request');
                    }
                    break;

                case 404:
                    if (data.message === 'Student not found' || data.message === 'Teacher not found') {
                        Alert.alert('Error', 'No account found for this email.');
                    } else {
                        Alert.alert('Error', data.message || 'Resource not found');
                    }
                    break;

                case 500:
                    Alert.alert('Error', 'An internal server error occurred. Please try again later.');
                    break;

                default:
                    Alert.alert('Error', 'An unexpected error occurred.');
                    break;
            }
        } else {
            // Network or other error without a response
            Alert.alert('Error', 'Network Error: Unable to connect to the server.');
        }
    };

    const handleLogin = async (formData: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            let response: AxiosResponse<any, any>;
            if (userType === 'teacher') {
                response = await axios.post(`${BASE_URL}/teachers/login`, formData);
            } else {
                response = await axios.post(`${BASE_URL}/students/login`, formData);
            }
            const token = response.data.token;
            login(token);
            router.replace('/(main)/Dashboard/Course');
        } catch (error) {
            console.error('Error logging in:', error);
            handleLoginError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (formData: FormData) => {
        setIsLoading(true);
        try {
            console.log("input", formData);
            let response: AxiosResponse<any, any>;
            if (userType === 'teacher') {
                response = await axios.post(`${BASE_URL}/teachers`, formData);
            } else {
                response = await axios.post(`${BASE_URL}/students`, formData);
            }
            Alert.alert('Success', 'Registration successful!');
            setIsSignup(false);
        } catch (error) {
            console.error('Error registering:', error);
            Alert.alert('Error', 'An error occurred while registering.');
        } finally {
            setIsLoading(false);
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

                {isLoading ? (
                    <ActivityIndicator size="large" color={theme.buttonColors.primaryButtonBackground} />
                ) : (
                    <>
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
                    </>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        padding: 20,
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    switchContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    link: {
        fontWeight: 'bold',
    },
});
