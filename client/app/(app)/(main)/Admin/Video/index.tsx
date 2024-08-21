// app/Admin/CoursesList.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { router, useRouter } from 'expo-router';
import { BASE_URL } from '@env';
import { Course } from '@/Constants/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeContext } from '@/Context/ThemeContext';

const ITEMS_PER_PAGE = 3; // Number of items to show per page

const CoursesList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { theme } = useContext(ThemeContext);


    useEffect(() => {
        axios.get(`${BASE_URL}/courses`)
            .then(response => {
                setCourses(response.data);
                setFilteredCourses(response.data);
                setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setFilteredCourses(courses.slice(startIndex, endIndex));
    }, [currentPage, courses]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = courses.filter(course =>
            course.courseName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCourses(filtered);
        setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
        setCurrentPage(1); // Reset to first page when searching
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        setCurrentPage(prevPage => {
            if (direction === 'next') {
                return Math.min(prevPage + 1, totalPages);
            } else {
                return Math.max(prevPage - 1, 1);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Ionicons name="add-circle" size={40} color={theme.buttonColors.primaryButtonBackground} onPress={() => router.push('/Admin/Video/create')} style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} />
            <TextInput
                style={styles.searchBox}
                placeholder="Search Courses"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredCourses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText}>{item.courseName}</Text>
                        </View>
                        <View style={styles.cell2}>
                            <MaterialIcons name="edit" size={24} color="black" onPress={() => router.push(`/Admin/Video/${item._id}`)} />
                            <MaterialIcons name="delete" size={24} color="black" onPress={() => {
                                axios.delete(`${BASE_URL}/courses/${item._id}`)
                                    .then(() => {
                                        const updatedCourses = courses.filter(course => course._id !== item._id);
                                        setCourses(updatedCourses);
                                        handleSearch(searchQuery); // Refresh filtered courses
                                    })
                                    .catch(error => console.error(error));
                            }} />
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.table}
            />
            <View style={styles.pagination}>
                <FontAwesome name="arrow-circle-left" size={24} color={theme.buttonColors.primaryButtonBackground} onPress={() => handlePageChange('prev')} disabled={currentPage === 1} />
                <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
                <FontAwesome name="arrow-circle-right" size={24} color={theme.buttonColors.primaryButtonBackground} onPress={() => handlePageChange('next')} disabled={currentPage === totalPages} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    searchBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    table: {
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        paddingHorizontal: 8,
    },
    cell2: {
        gap: 10,
        paddingHorizontal: 8,
        display: "flex",
        flexDirection: "row",
    },
    cellText: {
        fontSize: 16,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageInfo: {
        fontSize: 10,
    },
});

export default CoursesList;
