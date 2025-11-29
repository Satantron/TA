import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MythCard from '../components/MythCard';
import { fetchMyths } from '../supabase';
import { LOCAL_SEED } from '../data/seed';

export default function MythListScreen({ route, navigation }) {
  const mythology = route.params?.mythology || route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchMyths();
      const source = (data && data.length) ? data : LOCAL_SEED;
      const filtered = source.filter((m) => m.mythology === mythology).slice(0, 100);
      setItems(filtered);
    })();
  }, [mythology]);

  const handlePress = (item) => {
    navigation.navigate('MythDetail', item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{mythology}</Text>
      <FlatList data={items} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => <MythCard item={item} onPress={handlePress} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#070707' },
  header: { color: '#ffd166', fontSize: 22, marginBottom: 8 }
});
