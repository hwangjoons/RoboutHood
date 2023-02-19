import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';


export default function RememberButton({navigate, search, stockTicker, stockIndustry, stockPrice}) {

  // console.log(search, stockTicker, stockIndustry, stockPrice, 'in RemeemberButton');

  const rememberStock = async (search, stockTicker, stockIndustry, stockPrice) => {
    // console.log(search, stockTicker, stockIndustry, stockPrice, 'in RememberButton');
    try {
      console.log(search, stockTicker, stockIndustry, stockPrice, 'in RememberButton');
      const rememberResult = await axios.post(`http://192.168.1.159:3003/stocks/add`, {
        ticker: stockTicker,
        industry: stockIndustry,
        price: stockPrice
      })
      Alert.alert('Saved the stock', 'there is an error');
      // console.log(rememberResult.data.name, '696969');
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <View style={styles.buttons}>
    <TouchableOpacity
      title="Remember"
      onPress={rememberStock}
    >
      <Text style={styles.button}>Remember</Text>
    </TouchableOpacity>
    <TouchableOpacity
      title="Cancel"
      onPress={(() => navigate("Search"))}
    >
      <Text style={styles.button}>Search Again</Text>
    </TouchableOpacity>
  </View>

  );

};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginLeft: 40,
    marginRight: 40
  },
});