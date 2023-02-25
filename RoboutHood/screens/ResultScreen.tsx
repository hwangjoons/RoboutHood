import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';
const Separator = () => <View style={styles.separator} />;

import ResultText from './ResultText.tsx';

export default function ResultScreen({ navigation: { navigate }, route: { params } }) {
  const search = params.search;
  const stockTicker = params.ticker;
  const stockIndustry = params.industry;
  const stockPrice = params.price;

  const [generateResult, setGenerateResult] = useState(undefined);

  useEffect(() => {
    setGenerateResult(search);
  }, [search])

  const recordRec = async () => {
    try {
      const rememberResult = await axios.post(`http://192.168.1.159:3003/stocks/add`, {
        search: search,
        ticker: stockTicker,
        industry: stockIndustry,
        price: stockPrice
      });
      Alert.alert('Remembered', `Saved ${rememberResult.data.name}`,
        [
          {
            text: 'Go back!',
            onPress: () => navigate("Search")
          }
        ]);
    } catch (error) {
      console.log(error, 'in resultScreen')
    }
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.smallContainer}>
          <Text style={styles.title}>
            {generateResult ?
            <ResultText searchRes={generateResult}></ResultText>
            : null}
          </Text>
        </View>
        <Separator></Separator>
        <View style={styles.buttons}>
          <TouchableOpacity
            title="Favorite"
            onPress={recordRec}
          >
            <Text style={styles.button}>
              Record
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Cancel"
            onPress={(() => navigate("Search"))}
          >
            <Text style={styles.button}>
              Search Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalColors.black,
  },
  smallContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: GlobalColors.black,
  },
  title: {
    fontSize: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: GlobalColors.black,
  },
  button: {
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: GlobalColors.primary,
    borderRadius: 10,
    padding: 10,
    color: GlobalColors.black,
    fontWeight: 'bold',
  },
  recordButton: {
    justifyContent: "center"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
