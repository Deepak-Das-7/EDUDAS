import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import { VideosList, Video } from '@/Constants/types';  // Ensure this import is correct
import Loader from '@/Components/General/Loader';
import { Text, View, StyleSheet } from 'react-native';
import { durationOptions } from '@/Constants/Duration';
import { classLevelOptions } from '@/Constants/Class';
import Toast from 'react-native-root-toast';

const VideoDetail = () => {
    const { id } = useLocalSearchParams();
    const [video, setVideo] = useState<VideosList>();  // Changed from Test to Video
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const [videoName, setVideoName] = useState('');
    const [classLevel, setClassLevel] = useState('');

    const fetchVideo = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/videos/${id}`);  // Changed endpoint from tests to videos
            setVideo(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch video');  // Changed error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (video) {
            setVideoName(video.name);
            setClassLevel(video.class);
        }
    }, [video]);


    useEffect(() => {
        setLoading(true);
        fetchVideo();
    }, [id]);




    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`${BASE_URL}/videos/${id}`, {
                name: videoName,
                class: classLevel,
            });

            if (response.status === 200) {
                //show toast
                setLoading(false);
                let toast = Toast.show('Video updated!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);
                //Go to list
                router.replace('/Admin/Video')
            }

        } catch (error) {
            console.error('Error editing Video:', error);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`${BASE_URL}/videos/${id}`);

            if (response.status === 200) {
                //show toast
                setLoading(false);
                let toast = Toast.show('Video deleted!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);
                //Go to list
                router.replace('/Admin/Video')
            }

        } catch (error) {
            console.error('Error deleting Video:', error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error || !video) {
        return (
            <Text>{error || "Video not found"}</Text>
        );
    }

    const fields: Field[] = [
        { name: 'videoName', label: 'Video Name', type: 'text', value: videoName, onChange: setVideoName, options: undefined },
        { name: 'classLevel', label: 'Class Level', type: 'select', value: classLevel, onChange: setClassLevel, options: classLevelOptions },
    ];


    return (video &&
        <View style={styles.container}>
            <Text style={styles.title}>Updating Video</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={handleUpdate}
                onDelete={handleDelete}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    }
});

export default VideoDetail;
