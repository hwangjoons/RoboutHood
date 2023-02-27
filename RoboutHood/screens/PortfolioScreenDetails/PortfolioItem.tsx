import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '../../components/Themed';
import { GlobalColors } from '../../assets/styling/GlobalColors';
import axios from 'axios';

export default function PortfolioItem({ navigation: { navigate }, route: { params } }) {
  const [loading, setLoading] = useState(true);
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    axios.get(`your-endpoint-url-here`)
      .then(response => {
        setFavoritesData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  function removeRec(item) {
    // remove recommendation
  }

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={GlobalColors.primary} />
      </View>
    );
  }

  return (
    <View>
      {favoritesData ? (
        <ScrollView>
          {favoritesData.map((item, index) => (
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
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});