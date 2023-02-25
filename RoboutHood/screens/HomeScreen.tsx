import React, { useState, useEffect } from 'react';
import { TextInput, RefreshControl, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';
import { useIsFocused } from "@react-navigation/native";

import axios from 'axios';

export default function HomeScreen({ navigation: { navigate}, route: { params }}) {
  const isFocused = useIsFocused();
  const database = params.database;

  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState(database);
  const [searchTemp, setSearchTemp] = useState(database);

  const [refreshing, setRefreshing] = useState(false);


  const handleSearchAdvice = () => {
    console.log(searchQuery);
    if (searchQuery.trim().length > 1) {
      const filteredWatchlist = watchlist.filter(item => item['recommendStock'].toLowerCase().includes(searchQuery.toLowerCase()));
      setWatchlist(filteredWatchlist);
    } else {
      // console.log('in else', searchTemp)
      setWatchlist(searchTemp);
    }
  };


  function pressedRec(item) {
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
    });
  }

  const removeRec = async (item) => {
    try {
      const deleted = await axios.delete(`http://192.168.1.159:3003/stocks/${item._id}`);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    refreshData();
  }, [isFocused]);

  const refreshData = async () => {
    try {
      const getRecorded = await axios.get(`http://192.168.1.159:3003/stocks`);
      setWatchlist(getRecorded.data);
      setSearchTemp(getRecorded.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>My Advices</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search Stock Advice..."
            placeholderTextColor={GlobalColors.primary}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearchAdvice();
            }}
            style={styles.input}
          />
          {/* <TouchableOpacity onPress={() => handleSearchAdvice(search)} /> */}
          <TouchableOpacity onPress={handleSearchAdvice}>
            <Text style={styles.button}>Search</Text>
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
          }
        >
          {watchlist.map((item, index) => (
            <View key={index} style={[styles.watchlistItemContainer, { justifyContent: 'space-between' }]}>
              <Text style={styles.watchlistItem} onPress={() => pressedRec(item)}>
                {item['recommendStock']}
              </Text>
              <TouchableOpacity style={[styles.watchlistItemIcon, styles.trashCan]} onPress={() => removeRec(item)}>
                <AntDesign name="delete" size={24} color={GlobalColors.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: GlobalColors.black,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: GlobalColors.primary,
    // borderRadius: 3,
    padding: 8,
    marginRight: 8,
    color: GlobalColors.primary,
  },
  button: {
    backgroundColor: GlobalColors.primary,
    // color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 1,
  },
  watchlistContainer: {
    borderWidth: 1,
    borderColor: GlobalColors.primary,
    backgroundColor: GlobalColors.black,
    borderRadius: 4,
    padding: 8,
    paddingBottom: 10,
    marginBottom: 80,
  },
  watchlistItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GlobalColors.black,
    borderRadius: 8,
    borderColor: GlobalColors.primary,
    borderWidth: 1,
    marginBottom: 5,
    // padding: 5,
  },
  watchlistItem: {
    fontSize: 18,
    marginBottom: 5,
    // borderRadius: 5,
    borderColor: GlobalColors.primary,
    // borderWidth: 1,
    padding: 5,
    color: GlobalColors.primary,
    flex: 1,
  },
  watchlistItemIcon: {
    fontSize: 18,
    marginBottom: 5,
    borderColor: GlobalColors.primary,
    padding: 5,
    color: GlobalColors.primary,
    alignContent: 'center'
  },
  trashCan: {
    alignSelf: 'flex-end',
  },
});