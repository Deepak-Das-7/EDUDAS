import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import { useRefresh } from '@/Context/RefreshContext'; // Correctly import useRefresh
import axios from 'axios';
import CourseCard from '@/Components/Cards/CourseCard';
import { Course } from '@/Constants/types';
import { AuthContext } from '@/Context/AuthContext';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = () => {
    const { theme } = useContext(ThemeContext);
    const { refreshing, setRefreshing } = useRefresh(); // Use useRefresh correctly
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const { userDetails } = useContext(AuthContext);

    const fetchCourses = async () => {
        if (!userDetails || !userDetails.id) return; // Early return if userDetails or userDetails.id is null

        try {
            // console.log(userDetails.id);
            const response = await axios.get(`https://edudas.onrender.com/coursesOfUser/${userDetails.id}`);
            // console.log(response.data);
            setCourses(response.data);
            setFilteredCourses(response.data);
            setError(''); // Clear any previous error
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to fetch courses');
        } finally {
            setLoading(false);
            setRefreshing(false); // Stop the refresh indicator
        }
    };

    useEffect(() => {
        if (userDetails && userDetails.id) {
            fetchCourses();
        }
    }, [userDetails]);

    useEffect(() => {
        const results = courses.filter(course =>
            (course.courseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (course.class.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredCourses(results);
    }, [searchQuery, courses]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCourses();
    };

    if (loading && !refreshing) { // Show loading only on initial load, not during refresh
        return <Text>Loading...</Text>;
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        router.push("/AddCourse/");
                    }}
                >
                    <Ionicons name="add-circle" size={50} color="black" />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 15, color: theme.textColors.errorText }}>
                    {error} {/* Display the actual error message */}
                </Text>
            </View>
        );
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
                    placeholder="Search courses"
                    placeholderTextColor={theme.textColors.secondaryText}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))
            ) : (
                <Text style={[styles.noItemsText, { color: theme.textColors.errorText }]}>No items found</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginBottom: 10,
    },
    searchBox: {
        padding: 7,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
    },
    noItemsText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default Home;
