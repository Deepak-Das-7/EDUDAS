import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import CommonFormCRUD, { FieldType } from '@/Components/General/CommonFormCRUD';
import { Test } from '@/Constants/types';
import Loader from '@/Components/General/Loader';
import { Text } from 'react-native';
import { languageOptions } from '@/Constants/Languages';
import { durationOptions } from '@/Constants/Duration';

const TestDetail: React.FC = () => {
    const { id } = useLocalSearchParams();
    const [test, setTest] = useState<Test>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchTest = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tests/${id}`);
            console.log(response.data.startDate);
            setTest(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch test');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTest();
    }, [id]);

    const [testName, setTestName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [startDate, setStartDate] = useState<{ date: Date; showPicker: boolean }>({ date: new Date(), showPicker: false });
    // Update form state when test data is fetched
    useEffect(() => {
        if (test) {
            setTestName(test.name);
            setDescription(test.description);
            setDuration(test.duration);
            setClassLevel(test.class);
            setStartDate({ date: new Date(test.startDate), showPicker: false });
        }
    }, [test]);

    const handleUpdate = () => {
        console.log("Updating");
        // console.log(testName);
        // console.log(description);
        // console.log(duration);
        // console.log(language);
        // console.log(classLevel);
        // console.log(startDate);

        // if (id) {
        //     axios.put(${BASE_URL}/tests/${id}, { testName })
        //         .then(() => {
        //             Alert.alert('test updated successfully');
        //             router.replace('/Admin/Test');
        //         })
        //         .catch(error => {
        //             Alert.alert('Error updating test');
        //             console.error(error);
        //         });
        // }
    };

    const handleDelete = () => {
        console.log("test deleted");
        // if (id) {
        //     axios.delete(${BASE_URL}/tests/${id})
        //         .then(() => {
        //             Alert.alert('test deleted successfully');
        //             router.replace('/Admin/Test');
        //         })
        //         .catch(error => {
        //             Alert.alert('Error deleting test');
        //             console.error(error);
        //         });
        // }
    };

    if (loading) {
        return <Loader />;
    }

    if (error || !test) {
        return (
            <Text>{error || "Test not found"}</Text>
        );
    }

    const fields: FieldType[] = [
        { name: 'testName', label: 'Test Name', type: 'text', value: testName, onChange: setTestName },
        { name: 'description', label: 'Description', type: 'textarea', value: description, onChange: setDescription },
        { name: 'duration', label: 'Duration', type: 'select', value: duration, onChange: setDuration, options: durationOptions },
        { name: 'classLevel', label: 'Class Level', type: 'text', value: classLevel, onChange: setClassLevel },
        { name: 'startDate', label: 'Start Date', type: 'date', value: startDate, onChange: setStartDate },
    ];

    return (
        test &&
        <CommonFormCRUD
            fields={fields}
            onSave={handleUpdate}
            onDelete={handleDelete}
        />
    );
};

export default TestDetail;
