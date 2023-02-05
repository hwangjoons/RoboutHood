import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Lottie from 'lottie-react-native';

import { StyleSheet, SafeAreaView, Image } from 'react-native';

import { Text, View } from '../components/Themed';

import ResultScreen from './ResultScreen';

export default function LoadingScreen({ navigation: { navigate }, route: { params }}) {
  const stockTicker = params.stockInput;
  const stockIndustry = params.industryInput;
  const stockPrice = params.priceInput;

  // const [loadingText, setLoadingText] = useState('Generating Content')

  // setTimeout(() => {
  //   setLoadingText("Coming through ...");
  // }, 3000);

  const searchStock = async (stockTicker, stockIndustry, stockPrice) => {
    try {
      const searchResult = await axios.post(`http://192.168.1.159:3003/search`, {
        ticker: stockTicker,
        industry: stockIndustry,
        price: stockPrice
      })
      navigate("Result", {search: searchResult.data })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // setLoadingText('Generating Content')
    searchStock(stockTicker, stockIndustry, stockPrice);
  }, [stockTicker, stockIndustry, stockPrice])
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
