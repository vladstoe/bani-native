import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from './firebase';
import handleReset from './reset';
import custom_alert from './alert';

const GamePage = () => {
  const navigation = useNavigation();
  const [funds, setFunds] = useState(null); // State to hold the funds value
  const [answered, setAnswered] = useState(false); // State to hold the answered status

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser.uid;

      try {
        // Fetch user data from Firestore
        const userRef = firestore.collection('users').doc(userId);
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          setFunds(userData.funds);
          setAnswered(userData.answered);
        } else {
          console.log('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const handleResetAndFetchData = async () => {
      await handleReset(navigation); // Wait for handleReset to complete
      fetchUserData(); // Fetch user data after the reset is done
    };

    handleResetAndFetchData(); // Call the reset function and fetch user data


    // Add the event listener for the Android back button when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Clean up the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const handleBackPress = () => {
    // Prevent default behavior of the back button (navigating back or exiting the app)
    return true;
  };

  const handleAnswerQuestion = async () => {
    if (!answered) {
      // Check if funds are sufficient to proceed
      if (funds >= 1) {
        // Ask the user if they want to spend 1 LEI
        custom_alert(
          'Confirmation',
          'Do you want to spend 1 LEI to answer the question? Note: After selecting "OK", make sure to not refresh/close the page while answering the question, the money is taken whether you select an option or not and you only have one chance to answer it.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                // Proceed with the logic to answer the question
                navigation.replace('Question');
                console.log('Paid...');

                try {
                  // Update the answered status in Firestore
                  const userId = auth.currentUser.uid;
                  const userRef = firestore.collection('users').doc(userId);
                  await userRef.update({ answered: true });

                  // Decrease the funds by 1 in Firestore
                  await userRef.update({ funds: funds - 1 });
                  setFunds(funds - 1); // Update the local state as well
                } catch (error) {
                  console.error('Error updating answered status:', error);
                }
              },
            },
          ],
          { cancelable: true }
        );
      } else {
        // Show pop-up message for insufficient funds
        alert(
          'You do not have enough LEI to answer the question.'
        );
      }
    } else {
      console.log('You have already answered the question.');
    }
  };

  const handleMyAccount = () => {
    // Handle navigation to the MyAccountPage component with funds prop
    navigation.navigate('MyAccount');
  };

  const handleExplainGame = () => {
    alert('Game Explanation: Every day at 00:00 there is a new question. To answer the question you have to pay 1 LEU. If your answer is part of the minority, then you win money! The amount won is calculated by (total number of people that answered the question)/(number of people who chose the option in minority).');
  };

  return (


    <View style={styles.container}>
      <StatusBar
        backgroundColor="black" // Set the status bar color
        hidden={true} // Hide the status bar
      />


      {/* Display the funds at the top of the page */}
      <View style={styles.fundsContainer}>
        <Text style={styles.fundsText}>You have</Text>
        <Text style={[styles.fundsText, styles.fundsValue]}> {funds} LEI</Text>
      </View>

      <TouchableOpacity onPress={handleExplainGame} style={styles.infoButton} >
        <Ionicons name="help-circle-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, answered && styles.disabledButton]} // Disable the button if answered is true
        onPress={handleAnswerQuestion}
        disabled={answered} // Disable the button based on answered state
      >
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
    top: 45,
    right: 20,
  },
  fundsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  },
  fundsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fundsValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc', // Change the background color of the disabled button
  },

  infoButton: {
    position: 'absolute',
    top: 45,
    left: 20,
  },
});

export default GamePage;
