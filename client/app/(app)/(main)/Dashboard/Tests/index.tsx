import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, RefreshControl } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import axios from 'axios';
import TestCard from '@/Components/Cards/TestCard';
import { Test } from '@/Constants/types';

const Home = () => {
    const [tests, setTests] = useState<Test[]>([]);
    const [filteredTests, setFilteredTests] = useState<Test[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext);

    const fetchTests = async () => {
        try {
            const response = await axios.get('https://edudas.onrender.com/tests');
            setTests(response.data);
            setFilteredTests(response.data); // Initialize filteredTests
        } catch (error) {
            setError('Failed to fetch tests');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    useEffect(() => {
        const results = tests.filter(test =>
            (test.name.toLowerCase().includes(searchQuery.toLowerCase()) || test.course.class.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredTests(results);
    }, [searchQuery, tests]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchTests();
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <ScrollView
            style={{ backgroundColor: theme.colors.background, padding: 16 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[theme.colors.primary]}
                    tintColor={theme.colors.primary}
                />
            }
        >
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchBox, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText }]}
                    placeholder="Search tests"
                    placeholderTextColor={theme.textColors.secondaryText}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                    <TestCard key={test._id} test={test} />
                ))
            ) : (
                <Text style={[styles.noItemsText, { color: theme.textColors.errorText }]}>No items found</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginBottom: 16,
    },
    searchBox: {
        padding: 7,
        borderRadius: 7,
        fontSize: 16,
        paddingLeft: 20
    },
    noItemsText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default Home;
