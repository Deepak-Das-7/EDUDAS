import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe';
import { ThemeContext } from '@/Context/ThemeContext';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const Videos = () => {
    const { id } = useLocalSearchParams();
    console.log("id", id);
    const { theme } = useContext(ThemeContext);
    const [playing, setPlaying] = useState<string | null>(null);
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>("vRAp1w3-BHg");

    const screenWidth = Dimensions.get('window').width;
    const playerWidth = screenWidth * 0.9;
    const playerHeight = (playerWidth * 9) / 16;

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`https://edudas.onrender.com/videos/${id}`);
                setVideos(response.data.videos);
                console.log("getting all videos of ", response.data.videos);
            } catch (error) {
                console.error('Error getting video list:', error);
            }
        };
        fetchVideos();
    }, []);

    const onStateChange = useCallback((state, videoId) => {
        if (state === 'ended') {
            setPlaying(null);
            alert(`Video with ID: ${videoId} has finished playing!`);
        }
    }, []);

    const renderSelectedVideo = () => {
        const selectedVideo = videos.find((video) => video.videoId === selectedVideoId);
        if (!selectedVideo) return null;

        return (
            <View style={[styles.selectedVideoContainer, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.videoName, { color: theme.textColors.primaryText }]}>{selectedVideo.videoName}</Text>
                <YouTubeIframe
                    height={playerHeight}
                    width={playerWidth}
                    play={playing === selectedVideo.videoId}
                    videoId={selectedVideo.videoId}
                    volume={50}
                    mute={false}
                    onChangeState={(state) => onStateChange(state, selectedVideo.videoId)}
                    initialPlayerParams={{
                        loop: false,
                        controls: true,
                    }}
                />
            </View>
        );
    };

    const renderVideoItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.videoListItem, { backgroundColor: theme.colors.surface }]}
            onPress={() => setSelectedVideoId(item.videoId)}
        >
            <Image
                source={{ uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` }}
                style={styles.thumbnail}
            />
            <View style={styles.videoInfo}>
                <Text style={[styles.videoName, { color: theme.textColors.primaryText }]}>{item.videoName}</Text>
                <Text style={[styles.videoDetails, { color: theme.textColors.secondaryText }]}>Class: {item.class}</Text>
                <Text style={[styles.videoDetails, { color: theme.textColors.secondaryText }]}>Duration: {item.duration}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {renderSelectedVideo()}
            <FlatList
                data={videos}
                keyExtractor={(item) => item._id}
                renderItem={renderVideoItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    selectedVideoContainer: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        width: '95%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 20,
    },
    videoListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        width: '95%',
        marginVertical: 5,
        elevation: 3,
    },
    thumbnail: {
        width: 100,
        height: 56,
        borderRadius: 4,
    },
    videoInfo: {
        marginLeft: 10,
    },
    videoName: {
        fontSize: 13,
    },
    videoDetails: {
        marginTop: 2,
        fontSize: 10
    },
});

export default Videos;
