import React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import CollectionsScreen from './screens/CollectionsScreen';
import MythListScreen from './screens/MythListScreen';
import MythDetailScreen from './screens/MythDetailScreen';
import AboutScreen from './screens/AboutScreen';
import StoriesScreen from './screens/StoriesScreen';
import SplashScreen from './screens/SplashScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import { BookmarksProvider, useBookmarks } from './context/BookmarksContext';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import GlobalBackButton from './components/GlobalBackButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CollectionsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="CollectionsMain" component={CollectionsScreen} options={{ title: 'Collections' }} />
      <Stack.Screen name="MythList" component={MythListScreen} options={({ route }) => ({ title: route.params?.mythology || 'List' })} />
      <Stack.Screen name="MythDetail" component={MythDetailScreen} options={({ route }) => ({ title: route.params?.name || 'Detail' })} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#0f0f0f' }, tabBarActiveTintColor: '#ffd166', tabBarInactiveTintColor: '#aaa' }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Collections" component={CollectionsStack} options={{ title: 'Collections' }} />
      <Tab.Screen name="Stories" component={StoriesScreen} options={{ title: 'Stories' }} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} options={{ title: 'Bookmarks', tabBarIcon: (props) => <BookmarksTabIcon {...props} /> }} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

function BookmarksTabIcon({ color, size }) {
  // useBookmarks requires being inside BookmarksProvider; MainTabs is rendered inside it
  const { bookmarks } = useBookmarks();
  const unread = Array.isArray(bookmarks) ? bookmarks.filter(b => b.unread).length : 0;

  return (
    <View style={{ width: 28, height: 28 }}>
      <MaterialIcons name="bookmark" size={size} color={color} />
      {unread > 0 && (
        <View style={styles.dot} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#ff5c5c',
    borderWidth: 1,
    borderColor: '#0f0f0f'
  }
});

export default function App() {
  return (
    <BookmarksProvider>
      <NavigationContainer theme={NavigationDarkTheme}>
        <GlobalBackButton />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </BookmarksProvider>
  );
}
