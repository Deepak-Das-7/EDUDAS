import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import CommonFormCRUD, { FieldType } from '@/Components/General/CommonFormCRUD';
import { VideosList, Video } from '@/Constants/types';  // Ensure this import is correct
import Loader from '@/Components/General/Loader';
import { Text, View, StyleSheet } from 'react-native';
import { durationOptions } from '@/Constants/Duration';
import { classLevelOptions } from '@/Constants/Class';

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




    const handleUpdate = () => {
        console.log("Updating video");
        // if (id) {
        //     axios.put(${BASE_URL}/videos/${id}, { videoName })  // Changed from tests to videos
        //         .then(() => {
        //             Alert.alert('Video updated successfully');  // Changed message
        //             router.replace('/Admin/Video');  // Changed route
        //         })
        //         .catch(error => {
        //             Alert.alert('Error updating video');  // Changed message
        //             console.error(error);
        //         });
        // }
    };

    const handleDelete = () => {
        console.log("Video deleted");
        // if (id) {
        //     axios.delete(${BASE_URL}/videos/${id})  // Changed from tests to videos
        //         .then(() => {
        //             Alert.alert('Video deleted successfully');  // Changed message
        //             router.replace('/Admin/Video');  // Changed route
        //         })
        //         .catch(error => {
        //             Alert.alert('Error deleting video');  // Changed message
        //             console.error(error);
        //         });
        // }
    };

    if (loading) {
        return <Loader />;
    }

    if (error || !video) {
        return (
            <Text>{error || "Video not found"}</Text>  // Changed message
        );
    }

    const fields: FieldType[] = [
        { name: 'videoName', label: 'Video Name', type: 'text', value: videoName, onChange: setVideoName },
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
