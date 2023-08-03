import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from './firebase';
import { doc, setDoc, increment } from 'firebase/firestore';

const QuestionPage = () => {
  const navigation = useNavigation();
  const [funds, setFunds] = useState(null); // State to hold the funds value
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');

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

    const fetchQuestionData = async () => {
      try {
        const questionRef = firestore.collection('question').doc('question');
        const questionSnapshot = await questionRef.get();
        if (questionSnapshot.exists) {
          const questionData = questionSnapshot.data();
          setQuestion(questionData.question);
        } else {
          console.log('Question data not found.');
        }

        const option1Ref = firestore.collection('question').doc('option1');
        const option1Snapshot = await option1Ref.get();
        if (option1Snapshot.exists) {
          const option1Data = option1Snapshot.data();
          setOption1(option1Data.option1);
        } else {
          console.log('Option 1 data not found.');
        }

        const option2Ref = firestore.collection('question').doc('option2');
        const option2Snapshot = await option2Ref.get();
        if (option2Snapshot.exists) {
          const option2Data = option2Snapshot.data();
          setOption2(option2Data.option2);
        } else {
          console.log('Option 2 data not found.');
        }
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchQuestionData();
  }, []);

  const handleOption1 = async () => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to select "${option1}" as your favorite color?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            console.log(`${option1} selected...`);

            // Add your logic for handling option 1 here

            // Subtract 1 from funds and update it in Firestore

            try {
              const userId = auth.currentUser.uid;

              // Add +1 to the corresponding field in fundsQuestions document
              const fundsQuestionsRef = doc(firestore, 'funds', 'FundsOption1');
              await setDoc(fundsQuestionsRef, { amount: increment(1), [userId]: true }, { merge: true });

            } catch (error) {
              console.error('Error updating funds:', error);
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
      `Are you sure you want to select "${option2}" as your favorite color?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            console.log(`${option2} selected...`);

            // Add your logic for handling option 2 here

            // Subtract 1 from funds and update it in Firestore

            try {
              const userId = auth.currentUser.uid;

              // Add +1 to the corresponding field in fundsQuestions document
              const fundsQuestionsRef = doc(firestore, 'funds', 'FundsOption2');
              await setDoc(fundsQuestionsRef, { amount: increment(1), [userId]: true }, { merge: true });
            } catch (error) {
              console.error('Error updating funds:', error);
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


      <Text style={styles.questionText}>{question}</Text>
      <TouchableOpacity style={styles.optionButton} onPress={handleOption1}>
        <Text style={styles.optionText}>{option1}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={handleOption2}>
        <Text style={styles.optionText}>{option2}</Text>
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
