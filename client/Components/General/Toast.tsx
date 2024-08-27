import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-root-toast';

// Updated showToast function
export const showToast = (type, text1, text2) => {
    console.log(type, text1, text2);

    // Determine the style based on the type
    const toastStyle = styles[type] || styles.info;

    // Show the toast with the dynamic content and style
    Toast.show(
        "Successfull",
        {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            backgroundColor: 'transparent', // Ensure the background is transparent for custom styling
            shadow: false,
            animation: true,
        }
    );
};

const styles = StyleSheet.create({
    success: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
    },
    error: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
    },
    info: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
    },
    text: {
        color: 'white',
        fontSize: 16, // Adjust font size if needed
    },
});
