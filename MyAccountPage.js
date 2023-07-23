import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const MyAccountPage = ({ route }) => {
    const navigation = useNavigation();
    const { username, funds } = route.params; // Receive the username and funds from the route parameters
    const handleAddFunds = () => {
        // Add logic to handle adding funds
        console.log('Adding funds...');
    };

    const handleExtractFunds = () => {
        // Add logic to handle extracting funds
        console.log('Extracting funds...');
    };

    const handleDeleteAccount = () => {
        // Add logic to handle account deletion
        console.log('Deleting account...');
    };

    const handleLogout = () => {
        // Add logic to handle log out
        console.log('Logging out...');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.usernameContainer}>
                <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.fundsContainer}>
                <Text style={styles.myFundsText}>My Funds</Text>
                <Text style={styles.fundsAmount}>{funds} LEI</Text>
                <View style={styles.fundsButtonsContainer}>
                    <TouchableOpacity style={styles.fundsButton} onPress={handleAddFunds}>
                        <Ionicons name="add" size={24} color="#007bff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fundsButton} onPress={handleExtractFunds}>
                        <Ionicons name="remove" size={24} color="#007bff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.deleteAccountContainer}>
                <View style={[styles.buttonContainer, { backgroundColor: 'grey' }]}>
                    <TouchableOpacity style={styles.logoutAccountButton} onPress={handleLogout}>
                        <Text style={styles.deleteAccountText}>Log out Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.buttonContainer, { backgroundColor: 'red' }]}>
                    <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
                        <Text style={styles.deleteAccountText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Separate sections with space
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 50, // Add padding to the top and bottom
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 1,
    },
    usernameContainer: {
        alignItems: 'center',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    fundsContainer: {
        alignItems: 'center',
    },
    myFundsText: {
        fontSize: 18,
        color: '#fff',
    },
    fundsAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    fundsButtonsContainer: {
        flexDirection: 'row',
    },
    fundsButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    deleteAccountContainer: {
        alignItems: 'center',
    },
    deleteAccountButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 20,
    },
    deleteAccountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    logoutAccountButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 20,
    },
    buttonContainer: {
        width: 200, // You can adjust the width according to your preference
        borderRadius: 20,
        marginTop: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyAccountPage;
