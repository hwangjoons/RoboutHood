import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Lottie from 'lottie-react-native';

import { StyleSheet, SafeAreaView, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function LoadingScreen() {

  // setTimeOut(() => {

  // }, 5000);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading...</Text>
      <Lottie source={require('/Users/joonhwang/myGit/RoboutHood/RoboutHood/39701-robot-bot-3d.json')} autoPlay loop/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
