import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function HomeScreen({route: { params }}) {
  const database = params.database;

  const [ticker, setTicker] = useState('');
  const [watchlist, setWatchlist] = useState(database);

  // const handleAddTicker = () => {
  //   if (ticker.trim() !== '') {
  //     setWatchlist([...watchlist, ticker.trim()]);
  //     setTicker('');
  //   }
  // };

  useEffect(() => {
    console.log(database, 'in the database');
  });

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
      <View style={styles.watchlistContainer}>
        {watchlist.map((item, index) => (
          <Text key={index} style={styles.watchlistItem}>
            {item['recommendStock']}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: '#007AFF',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  watchlistContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  watchlistItem: {
    fontSize: 18,
    marginBottom: 8,
  },
});
