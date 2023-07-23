import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const LoginRegisterPage = () => {
    const navigation = useNavigation(); // Initialize the navigation object

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        clearFields(); // Clear fields when component mounts and when toggling between login and register
    }, [isLogin]);

    const clearFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleLoginRegister = () => {
        if (isLogin) {
            // Simulate login - Add your actual login logic here
            if (email === '' || password === '') {
                Alert.alert('Error', 'Please enter your email and password.');
            } else {
                // Perform successful login logic here
                console.log('Login:', email, password);

                // Redirect to GamePage after successful login
                navigation.navigate('Game');
            }
        } else {
            // Simulate registration - Add your actual registration logic here
            if (username === '' || email === '' || password === '' || confirmPassword === '') {
                Alert.alert('Error', 'Please fill in all fields.');
            } else if (!isValidEmail(email)) {
                Alert.alert('Error', 'Please enter a valid email address.');
            } else if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match.');
            } else {
                // Perform successful registration logic here
                console.log('Registration successful:', username, email, password);

                // Redirect to GamePage after successful registration
                navigation.navigate('Game', { username, email }); // Pass the username as a parameter
            }
        }
    };

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    placeholderTextColor="#aaa"
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#aaa"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity
                    style={styles.passwordVisibilityButton}
                    onPress={togglePasswordVisibility}
                >
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
                        onChangeText={(text) => setConfirmPassword(text)}
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
            <TouchableOpacity onPress={() => setIsLogin((prevState) => !prevState)}>
                <Text style={styles.switchText}>
                    {isLogin ? "Don't have an account? Register Now" : 'Already have an account? Login'}
                </Text>
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
        color: '#fff',
        fontSize: 16,
    },
});

export default LoginRegisterPage;
