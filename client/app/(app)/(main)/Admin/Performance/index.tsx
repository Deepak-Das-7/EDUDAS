import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { ThemeContext } from '@/Context/ThemeContext';
import { AuthContext } from '@/Context/AuthContext';
import TestList from '@/Components/Cards/TestList';
import { BASE_URL } from '@env';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Performance = () => {
    const { userDetails } = useContext(AuthContext);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                if (!userDetails || !userDetails.id) return;
                const response = await axios.get(`${BASE_URL}/tests/submit/user/${userDetails.id}`);
                setTests(response.data);
            } catch (error) {
                setError('Failed to fetch tests');
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, [userDetails]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons name="analytics" size={50} color="black" />
                <Text style={{ textAlign: 'center', fontSize: 15, color: theme.textColors.errorText }}>
                    No performance
                </Text>
            </View>
        );
    }

    return (
        <View
            style={{ backgroundColor: theme.colors.background, padding: 16 }}
        >
            <TouchableOpacity
                onPress={() => {
                    router.push('/Dashboard/Performance/Chart')
                }}
                style={{ backgroundColor: theme.colors.background, padding: 16, alignContent: "center" }}
            >
                <Text>Show chart</Text>
            </TouchableOpacity>
            <TestList tests={tests} />
        </View>
    );
};

const styles = StyleSheet.create({
});
export default Performance;
