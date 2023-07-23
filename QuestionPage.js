import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const QuestionPage = ({ route }) => {
    const navigation = useNavigation();
    const { username, email, funds } = route.params; // Receive the username and funds from the route parameters

    const handleOption1 = () => {
        // Show the confirmation dialog when option 1 is selected
        Alert.alert(
            'Confirmation',
            'Are you sure you want to select "Blue" as your favorite color?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        console.log('Option 1 (Blue) selected...');
                        // Add your logic for handling option 1 here

                        // Replace the current screen with the GamePage
                        navigation.replace('Game', { username, email, funds });
                    },
                },
            ],
        );
    };

    const handleOption2 = () => {
        // Show the confirmation dialog when option 2 is selected
        Alert.alert(
            'Confirmation',
            'Are you sure you want to select "Red" as your favorite color?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        console.log('Option 2 (Red) selected...');
                        // Add your logic for handling option 2 here

                        // Replace the current screen with the GamePage
                        navigation.replace('Game', { username, email, funds });
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>What is your favorite color?</Text>
            <TouchableOpacity style={styles.optionButton} onPress={handleOption1}>
                <Text style={styles.optionText}>Blue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handleOption2}>
                <Text style={styles.optionText}>Red</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    optionButton: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        color: '#007bff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default QuestionPage;
