import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from './firebase';
import { doc, setDoc, increment } from 'firebase/firestore';

const QuestionPage = () => {
  const navigation = useNavigation();
  const [funds, setFunds] = useState(null); // State to hold the funds value

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
        } else {
          console.log('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleOption1 = async () => {
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
          onPress: async () => {
            console.log('Option 1 (Blue) selected...');
  
            // Add your logic for handling option 1 here
  
            // Subtract 1 from funds and update it in Firestore
            if (funds > 0) {
              try {
                const userId = auth.currentUser.uid;
                const updatedFunds = funds - 1;
  
                // Update the funds field in Firestore
                const userRef = firestore.collection('users').doc(userId);
                await userRef.update({ funds: updatedFunds });
  
                // Update the local state with the new funds value
                setFunds(updatedFunds);
  
                // Add +1 to the corresponding field in fundsQuestions document
                const fundsQuestionsRef = doc(firestore, 'funds', 'FundsOption1');
                await setDoc(fundsQuestionsRef, { amount: increment(1), [userId]: true }, { merge: true });
            
              } catch (error) {
                console.error('Error updating funds:', error);
              }
            }
  
            // Replace the current screen with the GamePage
            navigation.replace('Game');
          },
        },
      ],
    );
  };
  
  const handleOption2 = async () => {
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
          onPress: async () => {
            console.log('Option 2 (Red) selected...');
  
            // Add your logic for handling option 2 here
  
            // Subtract 1 from funds and update it in Firestore
            if (funds > 0) {
              try {
                const userId = auth.currentUser.uid;
                const updatedFunds = funds - 1;
  
                // Update the funds field in Firestore
                const userRef = firestore.collection('users').doc(userId);
                await userRef.update({ funds: updatedFunds });
  
                // Update the local state with the new funds value
                setFunds(updatedFunds);
  
                // Add +1 to the corresponding field in fundsQuestions document
                const fundsQuestionsRef = doc(firestore, 'funds', 'FundsOption2');
                await setDoc(fundsQuestionsRef, { amount: increment(1), [userId]: true }, { merge: true });
            } catch (error) {
                console.error('Error updating funds:', error);
              }
            }
  
            // Replace the current screen with the GamePage
            navigation.replace('Game');
          },
        },
      ],
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Display the funds at the top of the page */}


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
    color: 'white',
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

export default QuestionPage;
