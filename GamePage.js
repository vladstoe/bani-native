import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const GamePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, email, funds } = route.params; // Receive the username and funds from the route parameters

  const handleAnswerQuestion = () => {
    // Show the confirmation dialog when option 1 is selected
    Alert.alert(
        'Confirmation',
        'Are you sure you want to pay 1 LEU to answer the question?',
        [
            {
                text: 'No',
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    console.log('Paid...');
                    // Add your logic for handling option 1 here

                    // Replace the current screen with the GamePage
                    navigation.replace('Question', { username, email, funds });
                },
            },
        ],
    );
};

  const handleMyAccount = () => {
    // Handle navigation to the MyAccountPage component with funds prop
    navigation.navigate('MyAccount', { username, email, funds });
  };

  return (
    <View style={styles.container}>
      {/* Display the funds at the top of the page */}
      <View style={styles.fundsContainer}>
        <Text style={styles.fundsText}>You have {funds} LEI</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAnswerQuestion}>
        <Text style={styles.buttonText}>Pay and answer the question</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.myAccountButton} onPress={handleMyAccount}>
        <Ionicons name="person-circle" size={30} color="#fff" />
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
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  myAccountButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  fundsContainer: {
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    alignItems: 'center',
  },
  fundsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GamePage;
