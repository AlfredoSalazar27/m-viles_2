import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { saveFavorites, getFavorites } from '../storage/favoritesStorage';

export default function DetailScreen({ route }) {
  const { place } = route.params;

  const handleAddFavorite = async () => {
    const currentFavorites = await getFavorites();

    if (currentFavorites.length >= 5) {
      Alert.alert('Límite alcanzado', 'Solo puede guardar 5 favoritos.');
      return;
    }

    const exists = currentFavorites.find(
      (item) => item.name === place.name
    );

    if (exists) {
      Alert.alert('Ya existe', 'Este lugar ya está en favoritos.');
      return;
    }

    const updatedFavorites = [...currentFavorites, place];
    await saveFavorites(updatedFavorites);

    Alert.alert('Guardado', 'Lugar agregado a favoritos.');
  };

  
  const description =
    place.description ||
    place.descr ||
    place.summary ||
    place.description_en ||
    'No hay descripción disponible para este lugar.';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{description}</Text>

      {place.address && (
        <>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.text}>{place.address}</Text>
        </>
      )}

      {place.phone && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(`tel:${place.phone}`)}
        >
          <Text style={styles.buttonText}>📞 Llamar</Text>
        </TouchableOpacity>
      )}

      {place.website && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(place.website)}
        >
          <Text style={styles.buttonText}>🌐 Abrir sitio web</Text>
        </TouchableOpacity>
      )}

      {place.category && (
        <>
          <Text style={styles.label}>Categoría:</Text>
          <Text style={styles.text}>{place.category}</Text>
        </>
      )}

      {place.source && (
        <>
          <Text style={styles.label}>Fuente:</Text>
          <Text style={styles.text}>{place.source}</Text>
        </>
      )}

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleAddFavorite}
      >
        <Text style={styles.favoriteText}>⭐ Agregar a Favoritos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e3a8a',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    marginBottom: 10,
    color: '#444',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  favoriteButton: {
    backgroundColor: '#f59e0b',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  favoriteText: {
    fontWeight: 'bold',
  },
});