import { useEffect } from 'react';

// Hook to integrate browser back (popstate) with react-navigation.goBack()
// Usage: call useWebBack(navigation) from a screen component that should
// register a web history entry so the browser back button navigates back.
export default function useWebBack(navigation) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (!navigation || !navigation.canGoBack()) return undefined;

    // push a state entry so browser back triggers popstate
    try {
      window.history.pushState({ app: 'lorebrary' }, '');
    } catch (e) {
      // ignore
    }

    const onPop = (e) => {
      // When popstate occurs, try to navigate back within the app
      if (navigation && navigation.canGoBack()) {
        navigation.goBack();
      }
    };

    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      // try to clean up the state we pushed
      try {
        // replaceState to avoid leaving an extra empty entry
        window.history.replaceState(null, '');
      } catch (e) {}
    };
  }, [navigation]);
}
