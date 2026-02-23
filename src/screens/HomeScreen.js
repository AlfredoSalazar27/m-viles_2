import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces } from '../redux/placesSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { places, loading, error } = useSelector((state) => state.places);

  const [category, setCategory] = useState('attraction');
  const [location, setLocation] = useState('Barcelona');

  const cities = [
    'Amsterdam',
    'Barcelona',
    'Berlin',
    'Dubai',
    'London',
    'Paris',
    'Rome',
    'Tuscany',
  ];

  useEffect(() => {
    handleSearch();
  }, [category, location]);

  const handleSearch = () => {
    dispatch(
      fetchPlaces({
        location: location,
        category: category,
        keyword: '',
      })
    );
  };

  return (
    <View style={styles.container}>

      {/* BOTÓN FAVORITOS */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.mainButtonText}>VER FAVORITOS</Text>
      </TouchableOpacity>

      {/* CIUDADES */}
      <Text style={styles.label}>Selecciona Ciudad:</Text>

      <View style={styles.cityContainer}>
        {cities.map((city) => (
          <TouchableOpacity
            key={city}
            style={[
              styles.cityButton,
              location === city && styles.activeCity,
            ]}
            onPress={() => setLocation(city)}
          >
            <Text
              style={[
                styles.cityText,
                location === city && styles.activeCityText,
              ]}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTÓN BUSCAR */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={handleSearch}
      >
        <Text style={styles.mainButtonText}>
          BUSCAR EN {location.toUpperCase()}
        </Text>
      </TouchableOpacity>

      {/* CATEGORÍAS */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            category === 'attraction' && styles.activeCategory,
          ]}
          onPress={() => setCategory('attraction')}
        >
          <Text style={styles.categoryText}>ATRACCIONES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            category === 'restaurant' && styles.activeCategory,
          ]}
          onPress={() => setCategory('restaurant')}
        >
          <Text style={styles.categoryText}>RESTAURANTES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            category === 'accommodation' && styles.activeCategory,
          ]}
          onPress={() => setCategory('accommodation')}
        >
          <Text style={styles.categoryText}>ALOJAMIENTOS</Text>
        </TouchableOpacity>
      </View>

      {/* CANTIDAD */}
      <Text style={styles.resultText}>
        Hay {places.length} lugares en {location}
      </Text>

      {loading && <ActivityIndicator size="large" />}

      {error && (
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          Error: {error}
        </Text>
      )}

      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>
              No se encontraron resultados
            </Text>
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { place: item })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>
              {item.address || location}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f2f2f2',
  },

  mainButton: {
    backgroundColor: '#1e63d6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  label: {
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  cityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  cityButton: {
    backgroundColor: '#e5e7eb',
    padding: 6,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },

  activeCity: {
    backgroundColor: '#1e63d6',
  },

  cityText: {
    fontSize: 12,
  },

  activeCityText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent: 'space-between',
  },

  categoryButton: {
    backgroundColor: '#1e63d6',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },

  activeCategory: {
    backgroundColor: '#0f3c91',
  },

  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  resultText: {
    marginVertical: 10,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  cardSubtitle: {
    color: '#666',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
