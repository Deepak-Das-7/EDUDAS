import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Theories = () => {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            {id ? (
                <Text style={styles.text}>Theories {id}</Text>
            ) : (
                <Text style={styles.text}>No data found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: '#000',
    },
});

export default Theories;
