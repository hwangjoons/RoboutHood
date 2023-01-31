import { warmUpAsync } from 'expo-web-browser';
import React, { useState, useEffect } from 'react';import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Lottie from 'lottie-react-native';

export default function SearchScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [stockInput, setStockInput] = useState('');

  const handleSubmit = async () => {
    if (input) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
    <Lottie source={require('/Users/joonhwang/myGit/RoboutHood/RoboutHood/39701-robot-bot-3d.json')} autoPlay loop />
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <TextInput
        value = {stockInput}
        onChangeText={input => setStockInput(input)}
        placeholder="Enter stock to search..."
        style={styles.searchBar}
        />
        <TextInput
        value = {stockInput}
        onChangeText={input => setStockInput(input)}
        placeholder="Enter industry of stock..."
        style={styles.searchBar}
        />
        <TextInput
        value = {stockInput}
        onChangeText={input => setStockInput(input)}
        placeholder="Enter price of stock..."
        style={styles.searchBar}
        />
        <TouchableOpacity
          title="Search"
          onPress={handleSubmit}
          // style={styles.submitButton}
        >
        <Text style={styles.submitButton}>Search</Text>
        </TouchableOpacity>
      </View>
    {/* <View style={styles.container}>
      <TextInput
      value = {stockInput}
      onChangeText={input => setStockInput(input)}
      placeholder="Be creative with your search.."
      style={styles.searchBar}
      />
      <TouchableOpacity
        title="Submit"
        onPress={handleSubmit}
        // style={styles.submitButton}
      >
      <Text style={styles.submitButton}>Search</Text>
      </TouchableOpacity>
    </View> */}
    </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  searchBar: {
    // flex: 1,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#83f28f',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    padding: 10,
    width: 270,
  },
  submitButton: {
    color: '#5ced73',
  }
});
