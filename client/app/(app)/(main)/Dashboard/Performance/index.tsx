import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { ThemeContext } from '@/Context/ThemeContext';
import TestCard from '@/Components/Cards/TestCard';
import { AuthContext } from '@/Context/AuthContext';
import TestList from '@/Components/Cards/TestList';
import AllChart from '@/Components/Charts/AllChart';


const Performance = () => {
    const { userDetails } = useContext(AuthContext);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext);

    // const id = "66bb456adb5a7b0c7acc7adb"


    useEffect(() => {
        const fetchTests = async () => {
            try {
                if (!userDetails || !userDetails.id) return;
                const response = await axios.get(`http://192.168.31.161:5000/submitted-tests-user/${userDetails.id}`);
                // console.log("Helloo", response.data);
                setTests(response.data);
            } catch (error) {
                console.error(error);
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
        return <Text>Error: {error}</Text>;
    }

    return (
        <View
            style={{ backgroundColor: theme.colors.background, padding: 16 }}
        >
            <TouchableOpacity
                onPress={() => {
                    router.push('/(main)/Dashboard/Performance/Chart')
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
