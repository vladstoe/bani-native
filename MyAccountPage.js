import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from './firebase';
import handleReset from './reset';

const MyAccountPage = () => {
  const navigation = useNavigation();
  const [funds, setFunds] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser.uid;

      try {
        // Fetch user data from Firestore
        const userRef = firestore.collection('users').doc(userId);
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          setUsername(userData.username);
          setFunds(userData.funds);
        } else {
          console.log('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
  handleReset(navigation); // Call handleReset before logging out

    fetchUserData();
  }, []);

  const handleAddFunds = () => {
    // Add logic to handle adding funds
    console.log('Adding funds...');
  };

  const handleExtractFunds = () => {
    // Add logic to handle extracting funds
    console.log('Extracting funds...');
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Are you sure?',
      'This action is irreversible. All your data will be permanently deleted.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Step 1: Delete the user document from 'users' collection in Firestore
              const userId = auth.currentUser.uid;
              const userRef = firestore.collection('users').doc(userId);
              await userRef.delete();

              // Step 2: Delete the user account from Firebase Authentication
              await auth.currentUser.delete();

              // Step 3: Perform logout
              auth.signOut();
              navigation.replace('LoginRegister');
            } catch (error) {
              console.error('Error deleting account:', error);
              // Display an error message to the user (optional)
              alert('Failed to delete the account. Please try again.');
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            auth
              .signOut()
              .then(() => {
                navigation.replace('LoginRegister');
              })
              .catch((error) => alert(error.message));
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.replace('Game')}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
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
        top: 53,
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
