import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton({ color = '#ffd166', size = 26, style }) {
  const navigation = useNavigation();
  if (!navigation || !navigation.canGoBack()) return null;

  return (
    <View style={[styles.wrap, style]} pointerEvents="box-none">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btn}
        accessibilityLabel="Back"
      >
        <MaterialIcons name="arrow-back" size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 12,
    top: Platform.OS === 'android' ? 12 : 36,
    zIndex: 30
  },
  btn: {
    backgroundColor: 'transparent',
    padding: 6,
    borderRadius: 6
  }
});
