import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PaginationControls({ page, setPage, totalPages }) {
  const prev = () => setPage(Math.max(1, page - 1));
  const next = () => setPage(Math.min(totalPages, page + 1));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={prev} style={styles.btn} disabled={page <= 1}>
        <Text style={[styles.btnText, page <= 1 && styles.disabled]}>Prev</Text>
      </TouchableOpacity>
      <Text style={styles.info}>{page} / {totalPages}</Text>
      <TouchableOpacity onPress={next} style={styles.btn} disabled={page >= totalPages}>
        <Text style={[styles.btnText, page >= totalPages && styles.disabled]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#1a1a1a', borderRadius: 6, marginHorizontal: 8 },
  btnText: { color: '#ffd166' },
  disabled: { color: '#555' },
  info: { color: '#fff' }
});
