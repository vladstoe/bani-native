import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, firestore } from './firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetStatus, setResetStatus] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchResetStatus = async () => {
      try {
        const resetDoc = await firestore.collection('reset').doc('reset').get();
        if (resetDoc.exists) {
          const resetData = resetDoc.data();
          setResetStatus(resetData.reset);
        }
      } catch (error) {
        console.error('Error fetching reset data:', error);
      }
    };

    fetchResetStatus();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLoginRegister = () => {
    if (resetStatus) {
      alert('Cannot log in or register while a reset is in progress.');
      return;
    }

    if (isLogin) {
      // Login logic
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
          navigation.replace('Game'); // Navigate to the Game page
        })
        .catch(error => alert(error.message));
    } else {
      // Register logic
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);

          firestore.collection('users').doc(user.uid).set({
            username: username,
            funds: 0,
            answered: false,
          });

          navigation.replace('Game'); // Navigate to the Game page
        })
        .catch(error => alert(error.message));
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert('Please enter your email in the box to receive a password reset');
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent. Please check your inbox or spam folder.');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>{isLogin ? 'Welcome back' : 'Create an account'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={text => setUsername(text)}
          value={username}
          placeholderTextColor="#aaa"
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.passwordVisibilityButton} onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#007bff"
          />
        </TouchableOpacity>
      </View>
      {!isLogin && (
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm your password"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={styles.passwordVisibilityButton}
            onPress={toggleConfirmPasswordVisibility}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLoginRegister}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(prevState => !prevState)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Register Now" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
      {isLogin && (
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000', // Updated text color to black
    backgroundColor: '#fff', // Updated background color to white
    opacity: 0.8,
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000', // Updated text color to black
    backgroundColor: '#fff', // Updated background color to white
    opacity: 0.8,
  },
  passwordVisibilityButton: {
    position: 'absolute',
    right: 16,
    top: 12,
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
  switchText: {
    color: '#18C6DE',
    fontSize: 16,
    marginTop: 20,
  },
  forgotPassword: {
    color: '#A9999A',
    fontSize: 16,
    marginTop: 20,
  },
});

export default LoginScreen;
