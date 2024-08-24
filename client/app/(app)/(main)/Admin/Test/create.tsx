// app/courses/create.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { BASE_URL } from '@env';

const CreateCourse: React.FC = () => {
    const [courseName, setCourseName] = useState('');
    const router = useRouter();

    const handleCreate = () => {
        axios.post(`${BASE_URL}/courses/`, { courseName })
            .then(() => {
                Alert.alert('Course created successfully');
                router.push('/Admin/Video');
            })
            .catch(error => {
                Alert.alert('Error creating course');
                console.error(error);
            });
    };

    return (
        <View>
            <TextInput placeholder="Course Name" value={courseName} onChangeText={setCourseName} />
            <Button title="Create Course" onPress={handleCreate} />
        </View>
    );
};

export default CreateCourse;
