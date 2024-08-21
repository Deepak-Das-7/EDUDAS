// app/courses/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';

const CourseDetail: React.FC = () => {
    const { id } = useLocalSearchParams(); // Get course ID from route params
    const [courseName, setCourseName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Fetch course details if not in editing mode
        if (!isEditing && id) {
            axios.get(`${BASE_URL}/courses/${id}`)
                .then(response => setCourseName(response.data.courseName))
                .catch(error => console.error(error));
        }
    }, [id, isEditing]);

    const handleUpdate = () => {
        if (id) {
            axios.put(`${BASE_URL}/courses/${id}`, { courseName })
                .then(() => {
                    Alert.alert('Course updated successfully');
                    router.push('/Admin/Video');
                })
                .catch(error => {
                    Alert.alert('Error updating course');
                    console.error(error);
                });
        }
    };

    const handleDelete = () => {
        if (id) {
            axios.delete(`${BASE_URL}/courses/${id}`)
                .then(() => {
                    Alert.alert('Course deleted successfully');
                    router.push('/Admin/Video');
                })
                .catch(error => {
                    Alert.alert('Error deleting course');
                    console.error(error);
                });
        }
    };

    return (
        <View>
            {isEditing ? (
                <>
                    <TextInput
                        placeholder="Course Name"
                        value={courseName}
                        onChangeText={setCourseName}
                    />
                    <Button title="Update Course" onPress={handleUpdate} />
                    <Button title="Cancel" onPress={() => setIsEditing(false)} />
                </>
            ) : (
                <>
                    <TextInput
                        placeholder="Course Name"
                        value={courseName}
                        editable={false}
                    />
                    <Button title="Edit" onPress={() => setIsEditing(true)} />
                    <Button title="Delete" onPress={handleDelete} />
                </>
            )}
        </View>
    );
};

export default CourseDetail;
