import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';

const MyAccountPage = ({ route }) => {
    const navigation = useNavigation();
    const { username, email, funds } = route.params; // Receive the username and funds from the route parameters
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
        navigation.reset({
            index: 0, // The index of the screen you want to navigate to in the new stack
            routes: [{ name: 'LoginRegister', params: { /* optional params */ } }],
          });
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
                <Text style={styles.email}>{email}</Text>
            </View>
            <View style={styles.fundsContainer}>
                <Text style={styles.myFundsText}>My Funds</Text>
                <Text style={styles.fundsAmount}>{funds} LEI</Text>
                <View style={styles.fundsButtonsContainer}>
                    <TouchableOpacity style={styles.fundsButton} onPress={handleAddFunds}>
                        <Text style={styles.Add}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fundsButton} onPress={handleExtractFunds}>
                        <Text style={styles.Add}>Extract</Text>
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
    email: {
        fontSize: 20,
        color: 'grey',
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
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',

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
    Add: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default MyAccountPage;
