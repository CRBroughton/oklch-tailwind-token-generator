import { ColourState } from "@/store/colours";

export const loadStateFromLocalStorage = (key: string, defaultValue: ColourState) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return defaultValue;
  }
};

export const saveStateToLocalStorage = (key: string, state: ColourState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

export const removeStateFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing state from localStorage:', error);
  }
};