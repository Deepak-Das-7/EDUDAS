import React, { useState, useRef, useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Text, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/Context/AuthContext';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from '@env';
import { ThemeContext } from '@/Context/ThemeContext';
import { io } from 'socket.io-client';
import { format } from 'date-fns';

type Message = {
    sender_id: {
        _id: string;
        firstName: string;
    };
    chat: string;
    createdAt: string;
};

const ChatBox = () => {
    const { id } = useLocalSearchParams();
    const { userDetails } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const flatListRef = useRef<FlatList<Message>>(null);
    const socket = useRef(io(`${BASE_URL}`));

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/doubts/${id}`);
                setMessages(response.data.chats || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
                Alert.alert('Error', 'Failed to load messages');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [id]);

    useEffect(() => {
        socket.current.on('receive_message', (newMessage: Message) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
        });

        return () => {
            socket.current.off('receive_message');
        };
    }, []);

    const sendMessage = async (text: string) => {
        const newMessage = {
            sender_id: {
                _id: userDetails.id,
                firstName: userDetails.firstName,
            },
            chat: text,
            createdAt: new Date().toISOString(),
        };

        try {
            socket.current.emit('send_message', newMessage);

            await axios.post(`${BASE_URL}/doubts/${id}/chats`, { sender_id: userDetails.id, chat: text });
            // setMessages(prevMessages => [...prevMessages, newMessage]);
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Failed to send message');
        }
    };

    const handleSend = () => {
        if (currentMessage.trim()) {
            sendMessage(currentMessage.trim());
            setCurrentMessage('');
        }
    };

    const renderItem = ({ item }: { item: Message }) => {
        const senderName = item.sender_id.firstName || 'Teacher';
        const isCurrentUser = item.sender_id._id === userDetails.id;

        return (
            <View style={[styles.messageContainer, isCurrentUser ? styles.currentUser : styles.otherUser]}>
                <Text style={[styles.senderName, { color: theme.textColors.primaryText }]}>{senderName}</Text>
                <Text style={[styles.messageText, { color: theme.textColors.primaryText }]}>{item.chat}</Text>
                <Text style={[styles.timestamp, { color: theme.textColors.secondaryText }]}>
                    {format(new Date(item.createdAt), 'HH:mm')}
                </Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={[styles.container, { backgroundColor: theme.colors.background }]} behavior="padding">
            <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.headerText, { color: theme.textColors.primaryText }]}>Doubt Section</Text>
            </View>
            {messages.length === 0 ? (
                <View style={styles.noMessagesContainer}>
                    <Text style={[styles.noMessagesText, { color: theme.textColors.secondaryText }]}>No messages yet</Text>
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                    style={[styles.messagesList, { backgroundColor: theme.colors.background }]}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText }]}
                    placeholder="Type a message..."
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                />
                <TouchableOpacity
                    style={[styles.sendButton, { backgroundColor: theme.buttonColors.successButtonBackground }]}
                    onPress={handleSend}
                >
                    <Text style={[styles.sendButtonText, { color: theme.buttonColors.secondaryButtonText }]}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    noMessagesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMessagesText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 25,
        marginRight: 10,
    },
    sendButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    sendButtonText: {
        fontSize: 16,
    },
    messageContainer: {
        maxWidth: '80%',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    currentUser: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    otherUser: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
    },
    senderName: {
        fontWeight: 'bold',
        marginBottom: 3,
        fontSize: 10
    },
    messageText: {
        fontSize: 13,
    },
    timestamp: {
        fontSize: 8,
        textAlign: 'right',
        marginTop: 5,
    },
});

export default ChatBox;
