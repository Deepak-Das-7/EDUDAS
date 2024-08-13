import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import Navbar from '../../../../Components/Navbar/Navbar';
import { ThemeContext } from '../../../../Context/ThemeContext';
import axios from 'axios';
import CourseCard from '../../../../Components/Cards/CourseCard';


const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://edudas.onrender.com/courses');
                setCourses(response.data);
            } catch (error) {
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
            <Navbar />
            <ScrollView style={styles.container}>
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );

};


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});

export default Home;
