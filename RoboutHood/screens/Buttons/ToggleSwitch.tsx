import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styling/GlobalColors'

export default function ToggleSwitch({ label, value, onToggle, filterToggle }) {
  // const [isOn, setIsOn] = useState(value);

  const handleToggle = () => {
    // console.log(showTicker, '1111')
    console.log(filterToggle, 'filterToggleIs');
    // setIsOn(!isOn);
    onToggle(!filterToggle);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Text style={styles.filterText}>{label}</Text>
      <TouchableOpacity
        style={{
          width: 50,
          height: 24,
          borderRadius: 12,
          backgroundColor: filterToggle ? '#4cd964' : '#e5e5ea',
          justifyContent: 'center',
          alignItems: filterToggle ? 'flex-end' : 'flex-start',
          paddingHorizontal: 2,
        }}
        onPress={handleToggle}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#fff',
            borderWidth: filterToggle ? 0 : 1,
            borderColor: '#999',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterText: {
    flex: 1,
    color: GlobalColors.primary,
  },
});