import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'lorebrary:bookmarks';
const BookmarksContext = createContext(null);

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
        if (raw) {
          // normalize older entries to include `unread` flag
          const parsed = JSON.parse(raw);
          const normalized = (Array.isArray(parsed) ? parsed : []).map(b => ({ ...b, unread: b.unread === undefined ? false : b.unread }));
          setBookmarks(normalized);
        }
      } catch (e) {
        console.warn('Failed to load bookmarks', e?.message || e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      } catch (e) {
        console.warn('Failed to save bookmarks', e?.message || e);
      }
    })();
  }, [bookmarks, loaded]);

  function addBookmark(item) {
    setBookmarks(prev => {
      if (prev.find(b => b.id === item.id)) return prev;
      // mark new bookmarks as unread
      const toAdd = { ...item, unread: true };
      return [toAdd, ...prev];
    });
  }

  function removeBookmark(id) {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }

  function markAllSeen() {
    setBookmarks(prev => prev.map(b => (b.unread ? { ...b, unread: false } : b)));
  }

  function markSeen(id) {
    setBookmarks(prev => prev.map(b => (b.id === id && b.unread ? { ...b, unread: false } : b)));
  }

  const value = { bookmarks, addBookmark, removeBookmark, markAllSeen, markSeen, loaded };
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error('useBookmarks must be used within BookmarksProvider');
  return ctx;
}

export default BookmarksContext;
