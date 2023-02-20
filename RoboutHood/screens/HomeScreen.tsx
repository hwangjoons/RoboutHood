import React, { useState, useEffect } from 'react';
import { RefreshControl, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';
import { useIsFocused } from "@react-navigation/native";

import axios from 'axios';

export default function HomeScreen({ navigation: { navigate}, route: { params }}) {
  const isFocused = useIsFocused();
  const database = params.database;

  const [ticker, setTicker] = useState('');
  const [watchlist, setWatchlist] = useState(database);
  const [refreshing, setRefreshing] = useState(false);
  // const handleAddTicker = () => {
  //   if (ticker.trim() !== '') {
  //     setWatchlist([...watchlist, ticker.trim()]);
  //     setTicker('');
  //   }
  // };

  const pressedRec = (item) => {
    navigate("Details", {
      id: item._id,
      ticker: item.ticker,
      industry: item.industry,
      price: item.price,
      date: item.date,
      recommendStock: item.recommendStock,
      recommendTicker: item.recommendTicker,
      recommendExplanation: item.recommendExplanation,
      record: item.record,
    })
  }

  useEffect(() => {
    refreshData();
  }, [isFocused]);

  const refreshData = async () => {
    try {
      const getRecorded = await axios.get(`http://192.168.1.159:3003/stocks`);
      setWatchlist(getRecorded.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Watchlist</Text>
      <View style={styles.inputContainer}>
        {/* <TextInput
          placeholder="Enter Ticker Symbol"
          value={ticker}
          onChangeText={(text) => setTicker(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddTicker}> */}

        <TouchableOpacity>
          <Text style={styles.button}>Add</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.watchlistContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refreshData();
              setRefreshing(false);
            }}
            />
        }>
        {watchlist.map((item, index) => (
          <Text key={index} style={styles.watchlistItem} onPress={() => pressedRec(item)}>
            {item['recommendStock']}
          </Text>
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalColors.primary,
    marginTop: 16,
    marginBottom: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: GlobalColors.primary,
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  watchlistContainer: {
    borderWidth: 1,
    // borderColor: GlobalColors.black,
    // backgroundColor: GlobalColors.primary,
    borderColor: GlobalColors.primary,
    backgroundColor: GlobalColors.black,
    borderRadius: 4,
    padding: 8,
    paddingBottom: 10,
    marginBottom: 80
  },
  watchlistItem: {
    fontSize: 18,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: GlobalColors.primary,
    borderWidth: 1,
    padding: 5,
    color: GlobalColors.primary,
    // backgroundColor: GlobalColors.secondary,
  },
});
