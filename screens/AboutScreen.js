import React from 'react';
import { View, Text, StyleSheet, Linking, Platform } from 'react-native';
import useWebBack from '../utils/useWebBack';

export default function AboutScreen() {
  // register web back for About page
  if (Platform.OS === 'web') useWebBack(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lorebrary</Text>
      <Text style={styles.desc}>Katalog tokoh mitos dunia — koleksi awal mencakup Mesir, Mesopotamia, Yunani, Nordik, Celtic, Jepang, China, Aztec.</Text>
      <Text style={styles.note}>Aplikasi ini menggunakan Supabase sebagai backend API. Anda dapat menambah/mengedit data melalui Supabase SQL editor atau dashboard.</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://supabase.com')}>Learn about Supabase</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#050505' },
  title: { color: '#ffd166', fontSize: 26, fontWeight: '700', marginBottom: 8 },
  desc: { color: '#ddd' },
  note: { color: '#bbb', marginTop: 12 },
  link: { color: '#8fd3ff', marginTop: 12 }
});
