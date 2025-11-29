import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MYTHOLOGIES } from '../data/seed';
import SearchBar from '../components/SearchBar';

export default function CollectionsScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return MYTHOLOGIES;
    return MYTHOLOGIES.filter(m => m.toLowerCase().includes(q));
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collections</Text>
      <SearchBar value={query} onChange={setQuery} placeholder="Search collections..." />
      <FlatList
        data={filtered}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MythList', { mythology: item })}>
            <Text style={styles.cardTitle}>{item}</Text>
            <Text style={styles.cardSub}>Tap to view 10 entries</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b0b0b' },
  title: { color: '#ffd166', fontSize: 24, marginBottom: 12 },
  card: { padding: 12, backgroundColor: '#141414', marginVertical: 8, borderRadius: 8 },
  cardTitle: { color: '#fff', fontSize: 18 },
  cardSub: { color: '#bbb', marginTop: 4 }
});
