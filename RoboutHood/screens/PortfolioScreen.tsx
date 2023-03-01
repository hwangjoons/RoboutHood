import React, { useState, useEffect } from 'react';
import { TextInput, RefreshControl, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import axios from 'axios';

import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';
import { useIsFocused } from "@react-navigation/native";

import ToggleSwitch from './Buttons/ToggleSwitch';

// import PortfolioItem from './PortfolioScreenDetails/PortfolioItem';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

interface Props {
  showFilterModal: boolean;
  handleModalClose: () => void;
  categoryTicker?: any[];
  categoryIndustry?: any[];
  categoryPrice?: any[];
}

const Stack = createNativeStackNavigator();

export default function PortfolioScreen({ navigation: { navigate}, route: { params }}) {
  const isFocused = useIsFocused();
  const favoritesData = params.database;

  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteslist, setFavoriteslist] = useState(favoritesData);
  const [searchTemp, setSearchTemp] = useState(favoritesData);

  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    refreshData();
  }, [isFocused]);

  const [refreshing, setRefreshing] = useState(false);


  const handleSearchAdvice = () => {
    if (searchQuery.trim().length > 1) {
      const filteredFavoriteslist = favoriteslist.filter(item => item['recommendStock'].toLowerCase().includes(searchQuery.toLowerCase()));
      setFavoriteslist(filteredFavoriteslist);
    } else {
      setFavoriteslist(searchTemp);
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
      console.log(error, );
    }
  }

  const refreshData = async () => {
    try {
      const getRecorded = await axios.get(`http://192.168.1.159:3003/stocks/getallfavorites`);
      setFavoriteslist(getRecorded.data);
      setSearchTemp(getRecorded.data);
      filterByCategory(getRecorded.data);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   console.log(filterToggle)
  //   console.log(filterToggle)
  //   console.log(filterToggle)
  // }, [filterToggle.ticker]);

  const filterFunc = async () => {
    try {
      console.log(showTicker, '1111')
      console.log(showIndustry, '2222')
      console.log(showPrice, '3333')

      let filteredFavoritesCopy = [...favoriteslist];
      let filteredFavorites;
      if (showTicker && showIndustry && showPrice) {
        setFavoriteslist(searchTemp);
      } else if (showTicker === false && showIndustry === false && showPrice === false ) {
        setFavoriteslist([]);
      } else {
        // setFavoriteslist(searchTemp);
        // let filteredFavoritesCopy = favoriteslist;
        // let filteredFavorites;
        console.log(filteredFavoritesCopy, '777');
        if (showTicker) {
          if (showIndustry) {
            if (showPrice === false) {
              filteredFavorites = filteredFavoritesCopy.filter(item => item.ticker !== undefined && item.industry !== undefined && item.price === undefined);
              console.log(filteredFavorites, '1T 2T 3F');
              console.log(favoriteslist, '11');
            }
          } else {
            if (showPrice === false) {
              filteredFavorites = filteredFavoritesCopy.filter(item => item.ticker !== undefined && item.industry === undefined && item.price === undefined);
              console.log(filteredFavorites, '1T 2F 3F');
              console.log(favoriteslist, '11');
            } else if (showPrice) {
              filteredFavorites = filteredFavoritesCopy.filter(item => item.ticker !== undefined && item.industry === undefined && item.price !== undefined);
              console.log(filteredFavorites, '1T 2F 3T');
              console.log(favoriteslist, '11');
            }
          }
        } else if (showIndustry) {
          if (showPrice) {
            filteredFavorites = filteredFavoritesCopy.filter(item => item.industry !== undefined && item.price !== undefined && item.ticker === undefined);
            console.log(filteredFavorites, '1F 2T 3T');
            console.log(favoriteslist, '11');
          } else if (showPrice === false) {
            filteredFavorites = filteredFavoritesCopy.filter(item => item.industry !== undefined && item.price === undefined && item.ticker === undefined);
            console.log(filteredFavorites, '1F 2T 3F');
            console.log(favoriteslist, '11');
          }
        } else if (showPrice) {
          filteredFavorites = filteredFavoritesCopy.filter(item => item.price !== undefined && item.ticker === undefined && item.industry === undefined);
          console.log(filteredFavorites, '1F 2F 3T');
          console.log(favoriteslist, '11');
        }
      }
      setFavoriteslist(filteredFavorites);
    } catch (err) {
      console.log(err);
    }
  }

//  const [filterToggle, setFilterToggle] = useState({
//     ticker: showTicker,
//     industry: showIndustry,
//     price: showPrice,
//   })

  // const toggleTicker = () => {
  //   setFilterToggle(prevState => ({
  //     ...prevState,
  //     ticker: !prevState.ticker
  //   }));
  // }

  // const toggleIndustry = () => {
  //   setFilterToggle(prevState => ({
  //     ...prevState,
  //     industry: !prevState.industry
  //   }));
  // }

  // const togglePrice = () => {
  //   setFilterToggle(prevState => ({
  //     ...prevState,
  //     price: !prevState.price
  //   }));
  // }

  const [categoryTicker, setCategoryTicker] = useState([]);
  const [categoryIndustry, setCategoryIndustry] = useState([]);
  const [categoryPrice, setCategoryPrice] = useState([]);

  const filterByCategory = (favorites) => {
    let allTickers = [];
    let allIndustries = [];
    let allPrices = [];

    for (let i = 0; i < favorites.length; i++) {
      let currAdvice = favorites[i];
      if (currAdvice.ticker) {
        allTickers.push(currAdvice)
        /*later below can be updated if necessary, if we need to keep track of which advice has 2 or more inputs when search instead of just keeping it in order of ticker > industry > price
        */
      } else if (currAdvice.industry) {
        allIndustries.push(currAdvice)
      } else if (currAdvice.price) {
        allPrices.push(currAdvice)
      }
    }

    setCategoryTicker(allTickers);
    setCategoryIndustry(allIndustries);
    setCategoryPrice(allPrices);
  }

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleModalClose = () => {
    setShowFilterModal(false);
  };

  const [showTicker, setShowTicker] = useState(true);
  const [showIndustry, setShowIndustry] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const handleToggleTicker = (value) => {
    setShowTicker(value);
    console.log(showTicker, 'test ticker')
    console.log(value);
  };

  const handleToggleIndustry = (value) => {
    setShowIndustry(value);
    console.log(showIndustry, 'test industry')
    console.log(value);
  };

  const handleTogglePrice = (value) => {
    setShowPrice(value);
    console.log(showPrice, 'test price')
    console.log(value);
  };

  useEffect(() => {
    const filterFunc = async () => {
      try {
        // console.log(showTicker, '1111')
        // console.log(showIndustry, '2222')
        // console.log(showPrice, '3333')

        let filteredFavoritesCopy = [...favoriteslist];
        let filteredFavorites;
        if (showTicker && showIndustry && showPrice) {
          setFavoriteslist(searchTemp);
        } else {
          // setFavoriteslist(searchTemp);
          // let filteredFavoritesCopy = favoriteslist;
          // let filteredFavorites;
          console.log(filteredFavoritesCopy, '777');
          if (showTicker) {
            if (showIndustry) {
              if (showPrice === false) {
                filteredFavorites = filteredFavoritesCopy.filter(item => item.ticker !== undefined && item.industry !== undefined && item.price === undefined);
                console.log(filteredFavorites, '1T 2T 3F');
              }
            } else {
              if (showPrice === false) {
                filteredFavorites = filteredFavoritesCopy.filter(item => item.ticker !== undefined && item.industry === undefined && item.price === undefined);
                console.log(filteredFavorites, '1T 2F 3F');
              } else if (showPrice) {
                filteredFavorites = filteredFavoritesCopy.filter(item => item.ticker !== undefined && item.industry === undefined && item.price !== undefined);
                console.log(filteredFavorites, '1T 2F 3T');
              }
            }
          } else if (showIndustry) {
            if (showPrice) {
              filteredFavorites = filteredFavoritesCopy.filter(item => item.industry !== undefined && item.price !== undefined && item.ticker === undefined);
              console.log(filteredFavorites, '1F 2T 3T');
            } else if (showPrice === false) {
              filteredFavorites = filteredFavoritesCopy.filter(item => item.industry !== undefined && item.price === undefined && item.ticker === undefined);
              console.log(filteredFavorites, '1F 2T 3F');
            }
          } else if (showPrice) {
            filteredFavorites = filteredFavoritesCopy.filter(item => item.price !== undefined && item.ticker === undefined && item.industry === undefined);
            console.log(filteredFavorites, '1F 2F 3T');
          } else {
            filteredFavorites = [];
          }
        }
        setFavoriteslist(filteredFavorites);
      } catch (err) {
        console.log(err);
      }
    }

    filterFunc();
  }, [showTicker, showIndustry, showPrice]);

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
        <ScrollView
          style={styles.favoriteslistContainer}
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
          {favoriteslist ? (
            favoriteslist.map((item, index) => (
              <View key={index} style={[styles.favoriteslistItemContainer, { justifyContent: 'space-between' }]}>
                <Text style={styles.favoriteslistItem} onPress={() => pressedRec(item)}>
                  {item['recommendStock']}
                </Text>
                <TouchableOpacity style={[styles.favoriteslistItemIcon, styles.trashCan]} onPress={() => removeRec(item)}>
                  <AntDesign name="delete" size={24} color={GlobalColors.primary} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.errorMessage}>No data available</Text>
          )}
        </ScrollView>
        <Modal visible={showFilterModal} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Options</Text>
          <ToggleSwitch label="Search Keyword: Ticker" value={showTicker} onToggle={handleToggleTicker} filterToggle={showTicker} />
          <ToggleSwitch label="Search Keyword: Industry" value={showIndustry} onToggle={handleToggleIndustry} filterToggle={showIndustry} />
          <ToggleSwitch label="Search Keyword: Price" value={showPrice} onToggle={handleTogglePrice} filterToggle={showPrice} />
          <TouchableOpacity onPress={handleModalClose} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalColors.black,
  },
  modalContent: {
    backgroundColor: GlobalColors.black,
    padding: 20,
    width: '80%',
    maxWidth: 400,
    maxHeight: 600,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: GlobalColors.white,
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 16,
    color: GlobalColors.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: GlobalColors.primary,
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalColors.black,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: GlobalColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});