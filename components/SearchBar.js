import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchBar({ value, onChange, placeholder = 'Search myths...' }) {
  const [text, setText] = useState(value || '');
  const timer = useRef(null);

  useEffect(() => {
    setText(value || '');
  }, [value]);

  function handleChange(t) {
    setText(t);
    if (timer.current) clearTimeout(timer.current);
    // debounce 250ms
    timer.current = setTimeout(() => onChange && onChange(t), 250);
  }

  function clear() {
    setText('');
    onChange && onChange('');
  }

  return (
    <View style={styles.wrapper}>
      <MaterialIcons name="search" size={20} color="#888" style={{ marginLeft: 8 }} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#777"
        value={text}
        onChangeText={handleChange}
        style={styles.input}
        underlineColorAndroid="transparent"
      />
      {text.length > 0 ? (
        <TouchableOpacity onPress={clear} style={{ padding: 8 }}>
          <MaterialIcons name="close" size={18} color="#aaa" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 10,
    paddingHorizontal: 4,
    marginBottom: 12,
    height: 44
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 8,
    fontSize: 15
  }
});
