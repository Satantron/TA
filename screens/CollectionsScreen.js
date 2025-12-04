import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { MYTHOLOGIES } from '../data/seed';
import SearchBar from '../components/SearchBar';
import usePagination from '../utils/usePagination';
import PaginationControls from '../components/PaginationControls';
import useWebBack from '../utils/useWebBack';

export default function CollectionsScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const pool = MYTHOLOGIES.filter(n => (query || '').trim() === '' ? true : n.toLowerCase().includes(query.trim().toLowerCase()));
  const pager = usePagination({ items: pool, initialPageSize: 6 });

  if (Platform.OS === 'web') useWebBack(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collections</Text>
      <SearchBar value={query} onChange={setQuery} placeholder="Search collections..." />
      <FlatList
        data={pager.pageData}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MythList', { mythology: item })}>
            <Text style={styles.cardTitle}>{item}</Text>
            <Text style={styles.cardSub}>Tap to view 10 entries</Text>
          </TouchableOpacity>
        )}
      />
      <PaginationControls page={pager.page} setPage={pager.setPage} totalPages={pager.totalPages} />
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
