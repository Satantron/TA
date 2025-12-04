import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { useBookmarks } from '../context/BookmarksContext';
import { MaterialIcons } from '@expo/vector-icons';
import useWebBack from '../utils/useWebBack';
import PdfViewerWeb from '../components/PdfViewerWeb';
import { getBackgroundFor } from '../utils/backgrounds';

export default function MythDetailScreen({ route, navigation }) {
  const item = route.params;
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  // register web back behaviour when applicable
  if (Platform.OS === 'web') useWebBack(navigation);

  const [bgUrl, setBgUrl] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const url = await getBackgroundFor(item.mythology);
      setBgUrl(url);
    })();
  }, [item?.mythology]);

  const bookmarked = bookmarks.find(b => b.id === item.id);

  function toggleBookmark() {
    if (bookmarked) removeBookmark(item.id);
    else addBookmark(item);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 12 }}>
      <ImageBackground source={bgUrl ? { uri: bgUrl } : null} style={styles.bg} imageStyle={styles.bgImage}>
      <View style={styles.headerRow}>
        <Image source={{ uri: item.image_url }} style={styles.portrait} />
        <View style={styles.headerTextWrap}>
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
        </View>
      </View>

      {item.long_desc ? (
        <>
          <Text style={styles.sectionTitle}>Detail</Text>
          <Text style={styles.more}>{item.long_desc}</Text>
        </>
      ) : null}

      {Array.isArray(item.entries) && item.entries.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Entries</Text>
          {item.entries.map((entry, idx) => (
            <View key={String(entry.id || idx)} style={styles.entryRow}>
              {!!entry.image_url && (
                <Image source={{ uri: entry.image_url }} style={styles.entryPortrait} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.entryTitle}>{entry.name || entry.title}</Text>
                {!!entry.mythology && <Text style={styles.entryMeta}>{entry.mythology}</Text>}
                {!!entry.short_desc && <Text style={styles.entryDesc} numberOfLines={3}>{entry.short_desc}</Text>}
              </View>
            </View>
          ))}
        </>
      ) : null}

      {/* Sources consolidated at bottom */}
      <View style={{ height: 12 }} />
      </ImageBackground>

      {/* Bottom Sources Section */}
      <View style={{ paddingHorizontal: 12, paddingBottom: 20 }}>
        <Text style={styles.sectionTitle}>Sumber</Text>
        {item.source_url ? (
          String(item.source_url).toLowerCase().endsWith('.pdf') ? (
            <PdfViewerWeb url={item.source_url} />
          ) : (
            <TouchableOpacity onPress={() => Linking.openURL(item.source_url)}>
              <Text style={styles.link}>Buka sumber utama</Text>
            </TouchableOpacity>
          )
        ) : (
          <Text style={styles.note}>Sumber utama tidak tersedia.</Text>
        )}

        {/* Entry-level sources listed here, not inline */}
        {Array.isArray(item.entries) && item.entries.length > 0 && (
          <View style={{ marginTop: 10 }}>
            {item.entries.map((entry, idx) => (
              <View key={`src-${entry.id || idx}`} style={{ marginTop: 8 }}>
                {(entry.source_url || (Array.isArray(entry.sources) && entry.sources.length > 0)) ? (
                  <>
                    <Text style={styles.entryTitle}>{entry.name || entry.title}</Text>
                    {entry.source_url && (
                      String(entry.source_url).toLowerCase().endsWith('.pdf') ? (
                        <PdfViewerWeb url={entry.source_url} />
                      ) : (
                        <TouchableOpacity onPress={() => Linking.openURL(entry.source_url)}>
                          <Text style={styles.link}>Buka sumber</Text>
                        </TouchableOpacity>
                      )
                    )}
                    {Array.isArray(entry.sources) && entry.sources.map((s, i) => (
                      <TouchableOpacity key={`s-${i}`} onPress={() => Linking.openURL(s)}>
                        <Text style={styles.link}>Sumber {i + 1}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                ) : null}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#060606' },
  portrait: { width: 120, height: 170, borderRadius: 8 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  headerTextWrap: { flex: 1 },
  bg: { flex: 1 },
  bgImage: { opacity: 0.12 },
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
  notBookmarked: { borderWidth: 1, borderColor: '#ffd166', backgroundColor: 'transparent' },
  entryRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10, backgroundColor: 'rgba(17,17,17,0.5)', padding: 10, borderRadius: 8 },
  entryPortrait: { width: 90, height: 130, borderRadius: 6, backgroundColor: '#333' },
  entryTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  entryMeta: { color: '#ffd166', marginTop: 2 },
  entryDesc: { color: '#ddd', marginTop: 6 }
});
