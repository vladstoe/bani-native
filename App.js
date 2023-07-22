// App.js

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginRegisterPage from './LoginRegisterPage';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginRegisterPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
