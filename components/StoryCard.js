import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function StoryCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress && onPress(item)} style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.mythology}</Text>
        {item.summary ? <Text style={styles.summary} numberOfLines={3}>{item.summary}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#161616', marginVertical: 6, borderRadius: 8, overflow: 'hidden' },
  image: { width: 90, height: 130, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, resizeMode: 'cover' },
  body: { padding: 10, flex: 1 },
  title: { color: '#fff', fontSize: 16, fontWeight: '600' },
  meta: { color: '#ffd166', marginTop: 4 },
  summary: { color: '#bbb', marginTop: 6 }
});
