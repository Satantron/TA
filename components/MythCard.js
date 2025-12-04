import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function MythCard({ item, onPress, onLongPress, unread }) {
  return (
    <TouchableOpacity onPress={() => onPress(item)} onLongPress={() => onLongPress && onLongPress(item)} style={[styles.card, unread ? styles.unreadCard : null]}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        {unread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.short_desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#161616',
    marginVertical: 6,
    borderRadius: 8,
    overflow: 'hidden'
  },
  unreadCard: {
    borderWidth: 1,
    borderColor: '#ff5c5c'
  },
  imageWrap: {
    position: 'relative'
  },
  image: {
    width: 90,
    height: 130,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover'
  },
  body: {
    padding: 10,
    flex: 1
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  subtitle: {
    color: '#bbb',
    marginTop: 6
  }
  ,unreadDot: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#ff5c5c',
    borderWidth: 1,
    borderColor: '#161616'
  }
  
});
