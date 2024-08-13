import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@/Context/ThemeContext';
import axios from 'axios';
import { AuthContext } from '@/Context/AuthContext';

const Home = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);
    const { userDetails } = useContext(AuthContext);


    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get(`https://edudas.onrender.com/submitted-tests-user/${userDetails.id}`);
                setTests(response.data);
            } catch (error) {
                console.error("error fetching performance", error)
            } finally {
                setLoading(false);
            }
        };
        fetchTests();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView
            style={{ backgroundColor: theme.colors.background, padding: 16 }}
        >
            {tests.map((test) => (
                <Text key={test._id} style={{ color: "white" }}>{test.total_marks}</Text>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({

});


export default Home
