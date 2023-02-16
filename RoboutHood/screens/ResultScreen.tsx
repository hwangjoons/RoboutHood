import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Lottie from 'lottie-react-native';

import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Text, View } from '../components/Themed';

// import RememberButton from './Buttons/RememberButton';


const Separator = () => <View style={styles.separator} />;

export default function ResultScreen({ navigation: { navigate }, route: { params }}) {
  const search = params.search;
  const stockTicker = params.ticker;
  const stockIndustry = params.industry;
  const stockPrice = params.price;

  const [generateResult, setGenerateResult] = useState(undefined);

  useEffect(() => {
    // console.log(search[0].text, 'in resultscreen');
    // console.log(search, stockTicker, stockIndustry, stockPrice, 'in resultscreen');
    setGenerateResult(search[0].text);
  }, [search])

  const favoriteRec = async () => {
    try {
      // console.log(search, stockTicker, stockIndustry, stockPrice, 'in resultscreen');
      const rememberResult = await axios.post(`http://192.168.1.159:3003/stocks/add`, {
        search: search,
        ticker: stockTicker,
        industry: stockIndustry,
        price: stockPrice
      })
    } catch (error) {
      console.log(error, 'in resultScreen')
    }
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.smallContainer}>
          <Text style={styles.title}>{generateResult ? generateResult : null}</Text>
        </View>
        <Separator />
        {/* <RememberButton search={search} stockTicker={stockTicker} stockIndustry={stockIndustry} stockPrice={stockPrice} navigate={navigate} /> */}
        <View style={styles.buttons}>
          <TouchableOpacity
            title="Favorite"
            onPress={favoriteRec}
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  smallContainer: {
    flex: 1,
    flexDirection: "column",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    // marginTop: 16,
    // marginLeft: 8,
    // marginRight: 8,
    // marginBottom: 16,
    fontSize: 20,
    // fontWeight: 'bold',
    // textAlign: 'center',
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // justifyContent: 'start'
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginLeft: 40,
    marginRight: 40
  },
  recordButton: {
    justifyContent: "center"
  },
  separator: {
    marginVertical: 8,
    // height: 1,
    // width: '80%',
    borderBottomColor: '#737373',
  },
});
