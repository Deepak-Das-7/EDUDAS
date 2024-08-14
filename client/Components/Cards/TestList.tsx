import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext'; // Adjust the import path as needed

const TestList = ({ tests }) => {
    const { theme } = useContext(ThemeContext);

    const renderItem = ({ item }) => {
        const [date, time] = item.createdAt.split('T');
        const formattedDate = `${date}`;
        const formattedTime = time.split('.')[0];
        return (

            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: theme.colors.surface }]}>
                <View style={[styles.marksContainer, { backgroundColor: theme.buttonColors.primaryButtonBackground }]}>
                    <Text style={[styles.marksText, { color: theme.buttonColors.primaryButtonText }]}>{item.total_marks}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={[styles.testName, { color: theme.textColors.primaryText }]}>{item.test_id.name}</Text>
                    <Text style={[styles.testDate, { color: theme.textColors.secondaryText }]}>
                        {formattedDate} {formattedTime}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={tests}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
        />
    );
};

export default TestList;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginBottom: 2,
    },
    marksContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 16,
    },
    marksText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flex: 1,
    },
    testName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    testDate: {
        fontSize: 12,
    },
});
