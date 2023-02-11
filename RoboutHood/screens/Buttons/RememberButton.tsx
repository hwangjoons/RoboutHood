import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';


export default function RememberButton({navigate, search, stockTicker, stockIndustry, stockPrice}) {

  // console.log(search, stockTicker, stockIndustry, stockPrice, 'in RemeemberButton');

  const rememberStock = () => {
    console.log(search, stockTicker, stockIndustry, stockPrice, 'in RemeemberButton');
  }
  return(
    <View style={styles.buttons}>
    <TouchableOpacity
      title="Favorite"
      onPress={rememberStock}
    >
      <Text style={styles.button}>Favorite</Text>
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