import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { ThemeContext } from '@/Context/ThemeContext';
import TestCard from '@/Components/Cards/TestCard';
import { AuthContext } from '@/Context/AuthContext';


const Tests = () => {
    const { userDetails } = useContext(AuthContext);
    const { id } = useLocalSearchParams();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext);



    useEffect(() => {
        const fetchTests = async () => {
            try {
                console.log(userDetails);
                const response = await axios.get(`https://edudas.onrender.com/course_tests/${id}`);
                setTests(response.data.tests);
            } catch (error) {
                setError('Failed to fetch tests');
            } finally {
                setLoading(false);
            }
        };
        fetchTests();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <ScrollView
            style={{ backgroundColor: theme.colors.background, padding: 16 }}
        >
            {tests.map((test) => (
                <TestCard key={test._id} test={test} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
});
export default Tests;
