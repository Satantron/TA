import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Platform } from 'react-native';
import MythCard from '../components/MythCard';
import { useBookmarks } from '../context/BookmarksContext';
import usePagination from '../utils/usePagination';
import PaginationControls from '../components/PaginationControls';
import BackButton from '../components/BackButton';
import useWebBack from '../utils/useWebBack';

export default function BookmarksScreen({ navigation }) {
  const { bookmarks, removeBookmark, clearAll, markSeen } = useBookmarks();

  function openDetail(item) {
    // mark this item seen since user opened it from bookmarks
    if (typeof markSeen === 'function') markSeen(item.id);
    navigation.navigate('Collections', { screen: 'MythDetail', params: { ...item } });
  }

  function confirmRemove(id) {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (window.confirm('Remove this item from bookmarks?')) removeBookmark(id);
      return;
    }

    Alert.alert('Remove bookmark', 'Remove this item from bookmarks?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeBookmark(id) }
    ]);
  }

  function confirmClearAll() {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (window.confirm('Remove all bookmarks?')) clearAll();
      return;
    }

    Alert.alert('Clear bookmarks', 'Remove all bookmarks?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => clearAll() }
    ]);
  }

  // Note: we intentionally do NOT mark all seen on screen focus.
  // Items are marked seen individually via `markSeen` when opened.

  const renderItem = ({ item }) => (
    <View style={styles.itemWrap}>
      <MythCard
        item={item}
        onPress={() => openDetail(item)}
        onLongPress={() => confirmRemove(item.id)}
        unread={!!item.unread}
      />
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.removeBtn} onPress={() => confirmRemove(item.id)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const pager = usePagination({ items: bookmarks, initialPageSize: 6 });

  if (Platform.OS === 'web') useWebBack(navigation);

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
        {bookmarks.length > 0 && (
          <TouchableOpacity onPress={confirmClearAll} style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {bookmarks.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>No bookmarks yet. Long-press an item to save it.</Text></View>
      ) : (
        <>
          <FlatList
            data={pager.pageData}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
          <PaginationControls page={pager.page} setPage={pager.setPage} totalPages={pager.totalPages} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#070707' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  clearBtn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#2b2b2b', borderRadius: 8 },
  clearText: { color: '#f88' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', textAlign: 'center', paddingHorizontal: 20 },
  itemWrap: { marginBottom: 10 },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  removeBtn: { backgroundColor: '#2b2b2b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  removeText: { color: '#f88', fontWeight: '700' }
});
