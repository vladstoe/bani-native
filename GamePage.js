import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const GamePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, funds } = route.params; // Receive the username and funds from the route parameters

  const handleAnswerQuestion = () => {
    // Add your logic for handling the "Answer the Question" button press
    console.log('Answering the question...');
  };

  const handleMyAccount = () => {
    // Handle navigation to the MyAccountPage component with funds prop
    navigation.navigate('MyAccount', { username, funds });
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
