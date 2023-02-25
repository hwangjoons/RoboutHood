import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Lottie from 'lottie-react-native';

import { StyleSheet, SafeAreaView, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';
import ResultScreen from './ResultScreen';

export default function LoadingScreen({ navigation: { navigate }, route: { params }}) {
  const stockTicker = params.stockInput;
  const stockIndustry = params.industryInput;
  const stockPrice = params.priceInput;
  const searchAgain = params.searchAgain;

  const searchStock = async (stockTicker, stockIndustry, stockPrice) => {
    try {
      const searchResult = await axios.post(`http://192.168.1.159:3003/search`, {
        ticker: stockTicker,
        industry: stockIndustry,
        price: stockPrice
      })
      navigate("Result", {
        search: searchResult.data,
        ticker: stockTicker,
        industry: stockIndustry,
        price: stockPrice
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    searchStock(stockTicker, stockIndustry, stockPrice);
  }, [stockTicker, stockIndustry, stockPrice])

  return (
    <View style={styles.container}>
      <Lottie source={require('/Users/joonhwang/myGit/RoboutHood/RoboutHood/39701-robot-bot-3d.json')} autoPlay loop/>
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    backgroundColor: GlobalColors.black,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalColors.third,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
