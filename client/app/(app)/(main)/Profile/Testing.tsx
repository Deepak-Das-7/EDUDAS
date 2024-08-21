import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import PDFViewer from '@/Components/Pdf/PDFViewer';

interface Book {
    id: string;
    title: string;
    url: string;
}

const books: Book[] = [
    { id: '1', title: 'Maths Book', url: 'https://drive.google.com/file/d/1R3HraejyO48HyuUn2HYqavuvnxG0HPYh/view?usp=sharing' },
    { id: '2', title: 'Maths Book1', url: 'https://drive.google.com/file/d/1R3HraejyO48HyuUn2HYqavuvnxG0HPYh/view?usp=sharing' },
    { id: '3', title: 'Maths Book2', url: 'https://drive.google.com/file/d/1R3HraejyO48HyuUn2HYqavuvnxG0HPYh/view?usp=sharing' },
    { id: '4', title: 'Maths Book3', url: 'https://drive.google.com/file/d/1R3HraejyO48HyuUn2HYqavuvnxG0HPYh/view?usp=sharing' },
    { id: '5', title: 'Maths Book4', url: 'https://drive.google.com/file/d/1R3HraejyO48HyuUn2HYqavuvnxG0HPYh/view?usp=sharing' },
];

const Testing: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<string | null>(null);

    const openPDF = (url: string) => {
        setSelectedBook(url);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => openPDF(item.url)}
                        style={styles.card}
                    >
                        <Text style={styles.cardTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.bookList}
            />

            <PDFViewer selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bookList: {
        // padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        elevation: 2, // For Android shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Testing;
