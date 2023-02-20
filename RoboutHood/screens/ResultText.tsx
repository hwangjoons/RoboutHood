import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';

export default function ResultText(props) {
  const search = props.searchRes[0].text;

  const tickerIndex = search.indexOf("Ticker:");
  const explanationIndex = search.indexOf("Explanation for Recommendation:");

  const companyName = search.substring(16, tickerIndex).trim();
  const stockTicker = search.substring(tickerIndex + 8, explanationIndex).trim();
  const explanation = search.substring(explanationIndex + 31).trim();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{companyName}</Text>
      <Text style={styles.subtitle}>Ticker: {stockTicker}</Text>
      <View style={styles.scrollContainer}>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.primary,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalColors.black,
    marginBottom: 20,
  },
  scrollContainer: {
    maxHeight: 150,
    overflow: "scroll",
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: GlobalColors.primary,
    color: GlobalColors.black,
  },
});
