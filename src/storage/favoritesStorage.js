import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites_places';

export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.log('Error saving favorites', error);
  }
};

export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Error getting favorites', error);
    return [];
  }
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.log('Error clearing favorites', error);
  }
};
