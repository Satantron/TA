import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import StoryCard from '../components/StoryCard';
import usePagination from '../utils/usePagination';
import PaginationControls from '../components/PaginationControls';
import { fetchStories, fetchStoriesPage } from '../supabase';
import useWebBack from '../utils/useWebBack';

export default function StoriesScreen({ navigation }) {
  const [stories, setStories] = useState([]);
  const [useServer, setUseServer] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetchStories();
      if (Array.isArray(res) && res.length) {
        setStories(res);
      } else {
        setUseServer(false);
        setStories([]);
      }
    })();
  }, []);

  const pager = usePagination({ items: stories, fetchPage: useServer ? async (page, pageSize) => {
    const result = await fetchStoriesPage(page, pageSize);
    return result;
  } : null, initialPageSize: 8 });

  function openStory(item) {
    // Always open detail; sources (including PDF) are shown at the bottom there
    navigation.navigate('MythDetail', { id: item.id, name: item.title, mythology: item.mythology, short_desc: item.summary, long_desc: item.content, image_url: item.image_url, source_url: item.source_url });
  }

  if (Platform.OS === 'web') useWebBack(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stories</Text>
      {pager.pageData.length === 0 ? (
        <Text style={{ color: '#888', marginTop: 8 }}>No stories yet.</Text>
      ) : (
        <>
          <FlatList data={pager.pageData} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => <StoryCard item={item} onPress={openStory} />} />
          <PaginationControls page={pager.page} setPage={pager.setPage} totalPages={pager.totalPages} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b0b0b' },
  title: { color: '#ffd166', fontSize: 24, marginBottom: 12 }
});
