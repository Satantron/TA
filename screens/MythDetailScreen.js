import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useBookmarks } from '../context/BookmarksContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function MythDetailScreen({ route }) {
  const item = route.params;
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const bookmarked = bookmarks.find(b => b.id === item.id);

  function toggleBookmark() {
    if (bookmarked) removeBookmark(item.id);
    else addBookmark(item);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 12 }}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.myth}>{item.mythology}</Text>
        </View>
        <TouchableOpacity onPress={toggleBookmark} style={[styles.bookmarkButton, bookmarked ? styles.bookmarked : styles.notBookmarked]} accessibilityLabel="Toggle bookmark">
          <MaterialIcons name={bookmarked ? 'bookmark' : 'bookmark-border'} size={22} color={bookmarked ? '#111' : '#ffd166'} />
        </TouchableOpacity>
      </View>

      <Text style={styles.desc}>{item.short_desc}</Text>
      {item.long_desc ? (
        <>
          <Text style={styles.sectionTitle}>Detail</Text>
          <Text style={styles.more}>{item.long_desc}</Text>
        </>
      ) : null}

      {item.source_url ? (
        <TouchableOpacity onPress={() => Linking.openURL(item.source_url)}>
          <Text style={styles.link}>Buka sumber</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.note}>Sumber tidak tersedia.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#060606' },
  image: { width: '100%', height: 220, borderRadius: 8 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 12 },
  myth: { color: '#ffd166', marginTop: 6 },
  desc: { color: '#ddd', marginTop: 10, lineHeight: 20 },
  sectionTitle: { color: '#fff', marginTop: 14, fontSize: 18 },
  more: { color: '#bbb', marginTop: 6 },
  link: { color: '#8fd3ff', marginTop: 10 },
  note: { color: '#666', marginTop: 10 }
  ,bookmarkButton: { backgroundColor: '#ffd166', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginLeft: 8 },
  bookmarkText: { color: '#111', fontWeight: '700' },
  bookmarked: { backgroundColor: '#ffd166' },
  notBookmarked: { borderWidth: 1, borderColor: '#ffd166', backgroundColor: 'transparent' }
});
