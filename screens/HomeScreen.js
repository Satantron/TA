import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { fetchMyths } from '../supabase';
import { LOCAL_SEED, MYTHOLOGIES } from '../data/seed';
import SearchBar from '../components/SearchBar';
import MythCard from '../components/MythCard';
import usePagination from '../utils/usePagination';
import PaginationControls from '../components/PaginationControls';
import useWebBack from '../utils/useWebBack';

export default function HomeScreen({ navigation }) {
  const [myths, setMyths] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      const data = await fetchMyths();
      if (data && data.length) setMyths(data);
      else setMyths(LOCAL_SEED);
    })();
  }, []);
  // Enable browser back to return from nested routes to Home
  if (Platform.OS === 'web') useWebBack(navigation);

  // filtered results for query (client-side filter) and paginated
  const filtered = myths.filter(m => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return false;
    const name = (m.name || '').toLowerCase();
    const tags = (m.tags || '').toLowerCase();
    const short = (m.short_desc || '').toLowerCase();
    return name.includes(q) || tags.includes(q) || short.includes(q);
  });

  const filteredPager = usePagination({ items: filtered, initialPageSize: 6 });
  const collectionsPager = usePagination({ items: MYTHOLOGIES, initialPageSize: 6 });

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Collections', { screen: 'MythList', params: { mythology: item } })} style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderResult = ({ item }) => (
    <View style={{ marginBottom: 8 }}>
      <MythCard item={item} onPress={() => navigation.navigate('Collections', { screen: 'MythDetail', params: item })} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lorebrary</Text>
      <Text style={styles.subtitle}>Katalog tokoh mitos dunia</Text>

      <SearchBar value={query} onChange={setQuery} placeholder="Search by name, tag, or description..." />

      {query ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.section}>Search results</Text>
          {filteredPager.pageData.length === 0 ? (
            <Text style={{ color: '#888', marginTop: 8 }}>No results.</Text>
          ) : (
            <>
              <FlatList data={filteredPager.pageData} keyExtractor={(i) => String(i.id)} renderItem={renderResult} />
              <PaginationControls page={filteredPager.page} setPage={filteredPager.setPage} totalPages={filteredPager.totalPages} />
            </>
          )}
        </View>
      ) : (
        <>
          <Text style={styles.section}>Mythology Collections</Text>
          <FlatList data={collectionsPager.pageData} keyExtractor={(i) => i} renderItem={renderItem} />
          <PaginationControls page={collectionsPager.page} setPage={collectionsPager.setPage} totalPages={collectionsPager.totalPages} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b0b0b' },
  title: { color: '#ffd166', fontSize: 28, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#ccc', marginBottom: 12 },
  section: { color: '#fff', marginTop: 12, marginBottom: 6, fontSize: 18 },
  item: { padding: 12, backgroundColor: '#151515', marginVertical: 6, borderRadius: 8 },
  itemText: { color: '#fff', fontSize: 16 }
});
