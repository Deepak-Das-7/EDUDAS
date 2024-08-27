import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Alert, RefreshControl } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { BASE_URL } from '@env';
import { Course } from '@/Constants/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '@/Context/ThemeContext';
import CourseRow from '@/Components/Course/CourseRow';
import PaginationControls from '@/Components/General/PaginationControls';

const ITEMS_PER_PAGE = 10;

const CoursesList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/courses`);
            setCourses(response.data);
            applyPagination(response.data, 1, searchQuery);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        applyPagination(courses, currentPage, searchQuery);
    }, [currentPage, courses, searchQuery]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCourses();
        setRefreshing(false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyPagination(courses, 1, query);
    };

    const applyPagination = (allCourses: Course[], page: number, query: string) => {
        const filtered = allCourses.filter(course =>
            course.courseName.toLowerCase().includes(query.toLowerCase())
        );
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setFilteredCourses(filtered.slice(startIndex, endIndex));
        setCurrentPage(page);
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        const newPage = direction === 'next'
            ? Math.min(currentPage + 1, totalPages)
            : Math.max(currentPage - 1, 1);

        applyPagination(courses, newPage, searchQuery);
    };

    const handleDelete = (courseId: string) => {
        Alert.alert(
            "Delete Confirmation",
            "Are you sure you want to delete this course?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        axios.delete(`${BASE_URL}/courses/${courseId}`)
                            .then(() => {
                                const updatedCourses = courses.filter(course => course._id !== courseId);
                                setCourses(updatedCourses);
                                applyPagination(updatedCourses, currentPage, searchQuery);
                            })
                            .catch(error => console.error(error));
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchBox, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText, flex: 1 }]}
                    placeholder="Search Courses"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <Ionicons name="add-circle" size={40} color={theme.buttonColors.primaryButtonBackground} onPress={() => router.push('/Admin/Course/create')} style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} />
            </View>
            <FlatList
                data={filteredCourses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <CourseRow course={item} onDelete={handleDelete} />
                )}
                contentContainerStyle={styles.table}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[theme.buttonColors.primaryButtonBackground]}
                    />
                }
            />
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        padding: 5
    },
    searchBox: {
        padding: 7,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
    },
    table: {
        borderTopWidth: 1,
    },
    searchContainer: {
        marginBottom: 7,
        display: 'flex',
        flexDirection: "row",
        gap: 10
    }
});

export default CoursesList;
