import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import MythCard from '../components/MythCard';
import { fetchMythsPage, fetchMyths } from '../supabase';
import { LOCAL_SEED } from '../data/seed';
import usePagination from '../utils/usePagination';
import PaginationControls from '../components/PaginationControls';
import useWebBack from '../utils/useWebBack';

export default function MythListScreen({ route, navigation }) {
  const mythology = route.params?.mythology || route.params;
  const [useServer, setUseServer] = useState(true);

  // server fetchPage function tries to fetch myths filtered by mythology using range
  const fetchPage = async (page, pageSize) => {
    // Supabase doesn't support easy where+range with count in our helper, so we fetch with RPC-like approach:
    try {
      const start = (page - 1) * pageSize;
      const end = start + pageSize - 1;
      const { data, error, count } = await fetchMythsPageWithFilter(mythology, start, end);
      if (data) return { data, total: typeof count === 'number' ? count : data.length };
      return null;
    } catch (err) {
      return null;
    }
  };

  // fallback: client-side items from LOCAL_SEED or full fetch
  const [allLocal, setAllLocal] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchMyths();
      if (data && data.length) {
        const filtered = data.filter(m => m.mythology === mythology);
        setAllLocal(filtered);
      } else {
        const filtered = LOCAL_SEED.filter(m => m.mythology === mythology);
        setAllLocal(filtered);
        setUseServer(false);
      }
    })();
  }, [mythology]);

  const pager = usePagination({ items: allLocal, fetchPage: useServer ? fetchPage : null, initialPageSize: 8 });

  const handlePress = (item) => {
    navigation.navigate('MythDetail', item);
  };

  if (Platform.OS === 'web') useWebBack(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{mythology}</Text>
      <FlatList data={pager.pageData} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => <MythCard item={item} onPress={handlePress} />} />
      <PaginationControls page={pager.page} setPage={pager.setPage} totalPages={pager.totalPages} />
    </View>
  );
}

// Helper: fetch Myths filtered by mythology with range and exact count using supabase client
import { supabase } from '../supabase';
async function fetchMythsPageWithFilter(mythology, start, end) {
  try {
    const { data, error, count } = await supabase
      .from('myths')
      .select('*', { count: 'exact' })
      .eq('mythology', mythology)
      .order('id', { ascending: true })
      .range(start, end);
    if (error) throw error;
    return { data, count };
  } catch (err) {
    console.warn('Paged filtered fetch failed', err?.message || err);
    return null;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#070707' },
  header: { color: '#ffd166', fontSize: 22, marginBottom: 8 }
});
