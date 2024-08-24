// app/Admin/CourseRow.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Course } from '@/Constants/types';
import { router } from 'expo-router';
import { ThemeContext } from '@/Context/ThemeContext';

interface CourseRowProps {
    course: Course;
    onDelete: (courseId: string) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, onDelete }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{course.courseName}</Text>
            </View>
            <View style={styles.cell2}>
                <MaterialIcons name="edit" size={24} color={theme.textColors.primaryText} onPress={() => router.push(`/Admin/Course/${course._id}`)} />
                <MaterialIcons name="delete" size={24} color={theme.textColors.primaryText} onPress={() => onDelete(course._id)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        flexDirection: 'row',
    },
    cellText: {
        fontSize: 16,
    },
});

export default CourseRow;
