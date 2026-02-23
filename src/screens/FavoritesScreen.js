import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {
  getFavorites,
  saveFavorites,
  clearFavorites,
} from '../storage/favoritesStorage';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (name) => {
    const updated = favorites.filter((item) => item.name !== name);
    await saveFavorites(updated);
    setFavorites(updated);
  };

  const handleClearAll = async () => {
    await clearFavorites();
    setFavorites([]);
  };

  return (
    <View style={styles.container}>
      <Button title="Eliminar todos" onPress={handleClearAll} />

      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => handleRemove(item.name)}
            >
              <Text style={{ color: 'white' }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f6f8',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1e3a8a',
  },
  removeBtn: {
    backgroundColor: '#dc2626',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
});
