import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import { GlobalColors } from '../assets/styling/GlobalColors';

export default function ResultText(props) {
  const search = props.searchRes[0].text;
  return (
    <Text>
      {search}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  smallContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: GlobalColors.primary,
    borderRadius: 5,
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
