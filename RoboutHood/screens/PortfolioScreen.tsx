import React, { useState, useEffect } from 'react';
import { TextInput, RefreshControl, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';
import { useIsFocused } from "@react-navigation/native";

import PortfolioItem from './PortfolioScreenDetails/PortfolioItem';

export default function HomeScreen({ navigation: { navigate}, route: { params }}) {
  const isFocused = useIsFocused();
  const favoritesData = params.database;

  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteslist, setFavoriteslist] = useState(favoritesData);
  const [searchTemp, setSearchTemp] = useState(favoritesData);

  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    console.log(favoritesData);
  })

  // const [refreshing, setRefreshing] = useState(false);


  const handleSearchAdvice = () => {
    console.log(searchQuery);
    if (searchQuery.trim().length > 1) {
      const filteredFavoriteslist = favoriteslist.filter(item => item['recommendStock'].toLowerCase().includes(searchQuery.toLowerCase()));
      setFavoriteslist(filteredFavoriteslist);
    } else {
      // console.log('in else', searchTemp)
      setFavoriteslist(searchTemp);
    }
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
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

  // useEffect(() => {
  //   refreshData();
  // }, [isFocused]);

  // const removeRec = async (item) => {
  //   try {
  //     const deleted = await axios.delete(`http://192.168.1.159:3003/stocks/${item._id}`);
  //     refreshData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const refreshData = async () => {
  //   try {
  //     const getRecorded = await axios.get(`http://192.168.1.159:3003/stocks`);
  //     setWatchlist(getRecorded.data);
  //     setSearchTemp(getRecorded.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleModalClose = () => {
    setShowFilterModal(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Portfolio</Text>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <FontAwesome name="filter" size={24} color={GlobalColors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search Portfolio..."
            placeholderTextColor={GlobalColors.primary}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearchAdvice();
            }}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSearchAdvice}>
            <Text style={styles.button}>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.favoriteslistContainer}>
          {favoriteslist.map((item, index) => (
              <View key={index} style={[styles.favoriteslistItemContainer, { justifyContent: 'space-between' }]}>
                <Text style={styles.favoriteslistItem} onPress={() => pressedRec(item)}>
                  {item['recommendStock']}
                </Text>
                <TouchableOpacity style={[styles.favoriteslistItemIcon, styles.trashCan]} onPress={() => removeRec(item)}>
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: GlobalColors.black,
    },
    title: {
      flex: 1,
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
      padding: 8,
      marginRight: 8,
      color: GlobalColors.primary,
    },
    button: {
      backgroundColor: GlobalColors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
      marginBottom: 1,
    },
    favoriteslistContainer: {
      borderWidth: 1,
      borderColor: GlobalColors.primary,
      backgroundColor: GlobalColors.black,
      borderRadius: 4,
      padding: 8,
      paddingBottom: 10,
      marginBottom: 80,
    },
    favoriteslistItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: GlobalColors.black,
      borderRadius: 8,
      borderColor: GlobalColors.primary,
      borderWidth: 1,
      marginBottom: 5,
    },
    favoriteslistItem: {
      fontSize: 18,
      marginBottom: 5,
      // borderRadius: 5,
      borderColor: GlobalColors.primary,
      // borderWidth: 1,
      padding: 5,
      color: GlobalColors.primary,
      flex: 1,
    },
  favoriteslistItemIcon: {
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
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 1,
    alignSelf: 'flex-end',
    },
    filterButtonText: {
    color: GlobalColors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    },
});