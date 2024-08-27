import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Test } from '@/Constants/types';
import { router } from 'expo-router';
import { ThemeContext } from '@/Context/ThemeContext';

interface CourseRowProps {
    test: Test;
    onDelete: (courseId: string) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ test, onDelete }) => {
    const { theme } = useContext(ThemeContext);

    const styles = getStyles(theme);

    return (
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.cellText1}>{test.name}</Text>
                <Text style={styles.cellText2}>{test.class ? test.class.slice(0, -6) : 'N/A'}</Text>
            </View>
            <View style={styles.cell2}>
                <MaterialIcons
                    name="edit"
                    size={24}
                    color={theme.buttonColors.secondaryButtonBackground}
                    onPress={() => router.push(`/Admin/Test/${test._id}`)}
                />
                <MaterialIcons
                    name="delete"
                    size={24}
                    color={theme.buttonColors.errorButtonBackground}
                    onPress={() => onDelete(test._id)}
                />
            </View>
        </View>
    );
};

const getStyles = (theme: any) => StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderColor: theme.borderColors.defaultBorder, // Using theme's border color
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: theme.backgroundColor, // Background color for the row
    },
    cell: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 8,
        alignItems: "center",
    },
    cell2: {
        gap: 10,
        paddingHorizontal: 8,
        flexDirection: 'row',
    },
    cellText1: {
        fontSize: 16,
        flex: 1,
        color: theme.textColors.primaryText, // Primary text color from theme
    },
    cellText2: {
        fontSize: 10,
        color: theme.textColors.secondaryText, // Secondary text color from theme
    },
});

export default CourseRow;
