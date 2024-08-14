import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import axios from 'axios';
import CourseCard from '@/Components/Cards/CourseCard';
import { Course } from '@/Constants/types';

const Home = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://192.168.31.161:5000/courses');
                setCourses(response.data);
                setFilteredCourses(response.data);
            } catch (error) {
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const results = courses.filter(course =>
            (course.courseName.toLowerCase().includes(searchQuery.toLowerCase())) || (course.class.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredCourses(results);
    }, [searchQuery, courses]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <ScrollView style={{ backgroundColor: theme.colors.background, padding: 16 }}>
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
        paddingLeft: 20
    },
    noItemsText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default Home;
