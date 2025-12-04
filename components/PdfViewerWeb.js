import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PdfViewerWeb({ url }) {
  if (!url) return null;
  const isPdf = typeof url === 'string' && url.toLowerCase().endsWith('.pdf');
  if (!isPdf) return null;

  if (Platform.OS !== 'web') {
    return (
      <TouchableOpacity style={styles.openBtn} onPress={() => {
        try { require('expo-linking').openURL(url); } catch (e) {}
      }}>
        <MaterialIcons name="picture-as-pdf" size={20} color="#111" />
        <Text style={styles.openText}>Buka PDF</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.wrap}>
      <iframe src={url} title="PDF" style={styles.iframe} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 480, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#222', marginTop: 12 },
  iframe: { width: '100%', height: '100%', border: 'none' },
  openBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ffd166', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginTop: 12 },
  openText: { color: '#111', fontWeight: '700' }
});
