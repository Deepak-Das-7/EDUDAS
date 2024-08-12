import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeContext } from '../../Context/ThemeContext'; // Import ThemeContext

interface TeacherSignupFormProps {
    onSubmit: (formData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
    }) => void;
}

const TeacherSignupForm: React.FC<TeacherSignupFormProps> = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const { theme } = useContext(ThemeContext); // Access the color context

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        if (event.type === 'set') {
            setDateOfBirth(currentDate);
        }
        setShowPicker(false);
    };

    const handleSubmit = () => {
        if (!firstName || !lastName || !email || !password || !dateOfBirth) {
            Alert.alert('Please fill in all fields.');
            return;
        }
        const formData = {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
        };

        onSubmit(formData);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>First Name</Text>
            <TextInput
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                placeholder="Enter your first name"
                placeholderTextColor={theme.textColors.placeholderText}
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Last Name</Text>
            <TextInput
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                placeholder="Enter your last name"
                placeholderTextColor={theme.textColors.placeholderText}
                value={lastName}
                onChangeText={setLastName}
            />
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Email address</Text>
            <TextInput
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                placeholder="Enter your email"
                placeholderTextColor={theme.textColors.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Password</Text>
            <TextInput
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textColors.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Date of Birth</Text>
            <View style={styles.dateContainer}>
                <TextInput
                    style={[styles.input, styles.dateInput, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                    placeholder="Enter date 2000-01-13"
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
                    editable={false}
                />
                <Pressable onPress={() => setShowPicker(true)}>
                    <FontAwesome name="calendar" size={38} color={theme.colors.primary} />
                </Pressable>
            </View>
            {showPicker && (
                <DateTimePicker
                    value={dateOfBirth || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Button
                title="Sign Up"
                onPress={handleSubmit}
                color={theme.buttonColors.primaryButtonBackground}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
    },
    label: {
        fontSize: 12,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    dateContainer: {
        flexDirection: 'row',
        gap: 5
        // alignItems: 'center',
    },
    dateInput: {
        flex: 1,
    },
});

export default TeacherSignupForm;
