import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Context/ThemeContext';
import { router } from 'expo-router';

const VideoTestCard = ({ course }) => {
    const { theme } = useContext(ThemeContext);

    const goTo = (path: string, ID: any) => () => {
        const query = new URLSearchParams({ id: ID }).toString();
        router.push(`/(main)/Dashboard/Course/${path}?${query}`);
    };
    const image = "https://picsum.photos/600";
    return (
        <View>
            <View style={styles.cardRow}>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background }]}
                    onPress={goTo("Tests", course._id)}
                >
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={[styles.overlayTitle, { color: theme.textColors.primaryText }]}>Tests</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background }]}
                    onPress={goTo("Videos", course.videos)}
                >
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={[styles.overlayTitle, { color: theme.textColors.primaryText }]}>Videos</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.cardRow}>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background }]}
                    onPress={goTo("Theories", course.content)}
                >
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={[styles.overlayTitle, { color: theme.textColors.primaryText }]}>Theories</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background }]}
                    onPress={goTo("DoubtSection", course._id)}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={[styles.overlayTitle, { color: theme.textColors.primaryText }]}>DoubtSection</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VideoTestCard

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    card: {
        flex: 1,
        borderRadius: 8,
        margin: 5,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 10,
    },
    overlayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 20,
    },
})