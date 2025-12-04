import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from './BackButton';

export default function GlobalBackButton() {
  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1000,
    paddingTop: 8,
    paddingLeft: 8
  }
});
