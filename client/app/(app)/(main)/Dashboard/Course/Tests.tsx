import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { ThemeContext } from '@/Context/ThemeContext';


const Tests = () => {
    const { id } = useLocalSearchParams();
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`https://edudas.onrender.com/course_tests/${id}`);
                setVideos(response.data.videos);
                console.log("getting all videos of ", response.data.videos);
            } catch (error) {
                console.error('Error getting video list:', error);
            }
        };
        fetchVideos();
    }, []);
    return (
        <View style={styles.container}>
            {id ? (
                <Text style={styles.text}>Tests {id}</Text>
            ) : (
                <Text style={styles.text}>No data found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: '#000',
    },
});

export default Tests;
