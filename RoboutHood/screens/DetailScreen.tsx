import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';

import axios from 'axios';

export default function DetailScreen({route: { params }}) {
  const id = params.id;
  const ticker = params.ticker;
  const industry = params.industry;
  const price = params.price;
  const date = params.date;
  const recommendStock = params.recommendStock;
  const recommendTicker = params.recommendTicker;
  const recommendExplanation = params.recommendExplanation;
  const record = params.record;

  const [isFavorite, setIsFavorite] = useState(record);


  const toggleFavorite = async (id) => {
    try {
      console.log(id, 'test');
      const favoriteAdvice = await axios.put(`http://192.168.1.159:3003/stocks/favorite`, {
        _id: id
      })
      console.log('after click', favoriteAdvice.data);
      const getAdvice = await axios.get(`http://192.168.1.159:3003/stocks/getone`, {
        params: {
          _id: id
        }
      })
      setIsFavorite(!!getAdvice.data.record);
    } catch (error) {
      console.log('error favoriting')
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleContent}>
          <Text style={styles.titleText}>Recommended stock</Text>
          <Text style={styles.subtitleText}>
            {
              ticker ?
              `Similar to ${ticker}`
              : industry ?
              `In the ${industry} sector`
              : `In ${price} price range`
            }
          </Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name={isFavorite ? 'star' : 'star-o'} size={24} color={GlobalColors.secondary} style={styles.favoriteIcon} onPress={() => toggleFavorite(id)}/>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.watchlistContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.stockName}>
            {recommendStock} ({recommendTicker})
          </Text>
        </View>
        <Text style={styles.explanationText}>
          {recommendExplanation}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalColors.black,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: GlobalColors.black,
  },
  titleContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: GlobalColors.black,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: GlobalColors.secondary,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 23,
    color: GlobalColors.secondary,
  },
  stockName: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: GlobalColors.black,
    // backgroundColor: GlobalColors.primary,
    color: GlobalColors.primary,
    backgroundColor: GlobalColors.black,
  },
  favoriteIcon: {
    marginLeft: 8,
  },
  watchlistContainer: {
    borderWidth: 1,
    borderColor: GlobalColors.primary,
    backgroundColor: GlobalColors.black,
    // borderColor: GlobalColors.black,
    // backgroundColor: GlobalColors.primary,
    borderRadius: 4,
    padding: 8,
    paddingBottom: 10,
    marginBottom: 80,
  },
  subtitleContainer: {
    marginBottom: 15,
  },
  explanationText: {
    fontSize: 16,
    color: GlobalColors.primary,
  },
});