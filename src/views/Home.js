import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  setCategories,
  setLoading,
} from '../redux/slices/productSlice';
import api from '../services/api';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector(
    state => state.products
  );
  const cartItems = useSelector(state => state.cart.items);

  // useEffect que se ejecuta al iniciar la pantalla
// Carga los productos y categorías desde la API

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // Función encargada de consumir la API y cargar los productos
// en el estado global utilizando Redux

  const loadProducts = async () => {
    dispatch(setLoading(true));
    const response = await api.get('/products');
    dispatch(setProducts(response.data));
  };

  const loadCategories = async () => {
    const response = await api.get('/products/categories');
    dispatch(setCategories(response.data));
  };

  const filterByCategory = async category => {
    dispatch(setLoading(true));
    const response = await api.get(`/products/category/${category}`);
    dispatch(setProducts(response.data));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a1b6a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Text style={styles.logo}>⚛️</Text>
          <Text style={styles.title}>Fake Store</Text>
        </View>
        <View style={styles.divider} />
      </View>

      {/* CATEGORÍAS */}
      <View style={styles.categorySection}>
        <Text style={styles.categoryLabel}>Categoría:</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => filterByCategory(item)}
              style={styles.categoryButton}
            >
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* PRODUCTOS GRID */}
      <FlatList
        style={styles.productsList}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Detail', { product: item })
            }
            style={styles.productCard}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="contain"
            />

            <Text numberOfLines={1} style={styles.productTitle}>
              {item.title}
            </Text>

            <Text style={styles.productPrice}>
              ${item.price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* BOTÓN CARRITO */}
      <View style={styles.cartContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButton}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          <Text style={styles.cartText}>Ver Carrito</Text>

          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartItems.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Primera Prueba Parcial
        </Text>
        <Text style={styles.footerText}>
          Desarrollado por:
        </Text>
        <Text style={styles.footerText}>
          Alfredo Salazar
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    padding: 15,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    fontSize: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#6a1b6a',
  },

  divider: {
    borderBottomWidth: 1,
    borderColor: 'black',
    marginTop: 10,
  },

  categorySection: {
    paddingHorizontal: 15,
  },

  categoryLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  categoryButton: {
    backgroundColor: 'black',
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginRight: 8,
    borderRadius: 5,
  },

  categoryText: {
    color: 'white',
  },

  productsList: {
    flex: 1,
    marginTop: 20,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  productCard: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },

  productImage: {
    width: 90,
    height: 90,
  },

  productTitle: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  productPrice: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
  },

  cartContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  cartButton: {
    backgroundColor: '#FFC107',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    elevation: 6,
  },

  cartIcon: {
    marginRight: 8,
    fontSize: 18,
  },

  cartText: {
    fontWeight: 'bold',
  },

  badge: {
    position: 'absolute',
    right: 10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  footer: {
    backgroundColor: '#6a1b6a',
    padding: 15,
    alignItems: 'center',
  },

  footerText: {
    color: 'white',
  },
});