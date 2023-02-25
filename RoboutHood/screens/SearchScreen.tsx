import { warmUpAsync } from 'expo-web-browser';
import React, { useState, useEffect } from 'react';import { Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Image } from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Lottie from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

import { GlobalColors } from '../assets/styling/GlobalColors';

export default function SearchScreen({ navigation: { navigate } }: RootTabScreenProps<'TabOne'>) {
  const [stockInput, setStockInput] = useState('');
  const [industryInput, setIndustryInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  const handleSubmit = async () => {
    if (stockInput || industryInput || priceInput) {
      Keyboard.dismiss();
      console.log(stockInput, industryInput, priceInput);
      navigate("Loading", {
        stockInput: stockInput,
        industryInput: industryInput,
        priceInput: priceInput
      })
    }
  };

  const initializeRecorded = async () => {
    try {
      const getRecorded = await axios.get(`http://192.168.1.159:3003/stocks`);
      navigate("Home", {
        database: getRecorded.data
      })
      const getFavs = await axios.get(`http://192.168.1.159:3003/stocks/getallfavorites`);
      navigate("Portfolio", {
        database: getFavs.data
      })
    } catch (error) {
      console.log('error in getAllStocks')
    }
  }

  useEffect(() => {
    initializeRecorded();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Lottie
        style={styles.logo}
        options={defaultOptions}
        height={100}
        width={100}
        source={require('/Users/joonhwang/myGit/RoboutHood/RoboutHood/39701-robot-bot-3d.json')} autoPlay loop
        />
        <Animatable.View style={styles.formContainer}>
          <TextInput
          value = {stockInput}
          onChangeText={input => setStockInput(input)}
          placeholder="Enter stock to search..."
          style={styles.searchBar}
          />
          <TextInput
          value = {industryInput}
          onChangeText={input2 => setIndustryInput(input2)}
          placeholder="Enter industry of stock..."
          style={styles.searchBar}
          />
          <TextInput
          value = {priceInput}
          onChangeText={input3 => setPriceInput(input3)}
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
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalColors.black,
  },
  formContainer: {
    // height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // height: 100,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    borderRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    padding: 10,
    width: 270,
  },
  submitButton: {
    color: '#5ced73',
    justifyContent: 'center',
  }
});
