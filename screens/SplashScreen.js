import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function SplashScreen({ navigation }) {
  // Prefer a local asset named `assets/splash_wallpaper.jpg` (placed by the developer).
  // If the local asset is missing, the fallback remote image from Unsplash is used.
  let backgroundSource;
  try {
    // This will succeed when `assets/splash_wallpaper.jpg` exists in the project.
    // Save the attached image to `assets/splash_wallpaper.jpg` to use it.
    // eslint-disable-next-line global-require
    backgroundSource = require('../assets/splash_wallpaper.jpg');
  } catch (e) {
    backgroundSource = { uri: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80' };
  }

  return (
    <ImageBackground
      source={backgroundSource}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.center}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')} activeOpacity={0.9}>
          <Text style={styles.buttonText}>Enter Lorebrary</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Discover mythic characters & stories</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lorebrary — a catalog of mythologies</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#000' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    backgroundColor: '#ffd166',
    paddingHorizontal: 34,
    paddingVertical: 16,
    borderRadius: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8
  },
  buttonText: { fontSize: 18, fontWeight: '800', color: '#111', letterSpacing: 0.6 },
  subtitle: { color: '#ddd', marginTop: 12 },
  footer: { padding: 12, alignItems: 'center' },
  footerText: { color: '#888' }
});
