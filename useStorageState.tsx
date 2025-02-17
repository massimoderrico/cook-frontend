import  { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];


function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState<T>(key: string): [[boolean, T | null], (value: T | null) => void] {
  const [state, setState] = useAsyncState<T>();

  useEffect(() => {
    (async () => {
      try {
        const storedValue = await SecureStore.getItemAsync(key);
        if (storedValue) {
          setState(JSON.parse(storedValue)); // ✅ Parse stored JSON
        }
      } catch (e) {
        console.error('Error reading storage:', e);
      }
    })();
  }, [key]);

  const setValue = useCallback(
    async (value: T | null) => {
      setState(value);
      if (value === null) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await SecureStore.setItemAsync(key, JSON.stringify(value)); // ✅ Store as JSON
      }
    },
    [key]
  );

  return [state, setValue];
}
