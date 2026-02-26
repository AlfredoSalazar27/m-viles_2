import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  loadCart,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/slices/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@fakeStore:cartItems';

export default function Cart({ navigation }) {

  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);

  // useEffect que carga los datos guardados del carrito
// desde AsyncStorage cuando la pantalla se monta

  useEffect(() => {
    const loadSavedCart = async () => {
      const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        dispatch(loadCart(JSON.parse(savedCart)));
      }
    };
    loadSavedCart();
  }, []);

  const handlePay = () => {
    Alert.alert('Compra Exitosa', 'Gracias por su compra');
    dispatch(clearCart());
  };

  const handleCancel = () => {
    Alert.alert('Compra Cancelada');
    dispatch(clearCart());
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Carrito de Compras
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const subtotal = item.price * item.quantity;

          return (
            <View style={styles.card}>

              <View style={styles.productRow}>

                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />

                <View style={{ flex: 1, marginLeft: 10 }}>

                  <Text style={styles.productTitle}>
                    {item.title}
                  </Text>

                  <Text>
                    Precio: ${item.price.toFixed(2)}
                  </Text>

                  {/* CONTROL CANTIDAD */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                    // Disminuye la cantidad del producto en el carrito
                      onPress={() => dispatch(decreaseQuantity(item.id))}
                      style={styles.qtyButton}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                    // Aumenta la cantidad del producto en el carrito
                      onPress={() => dispatch(increaseQuantity(item.id))}
                      style={styles.qtyButton}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.subtotal}>
                    Subtotal: ${subtotal.toFixed(2)}
                  </Text>

                </View>
              </View>

              <TouchableOpacity
                onPress={() => dispatch(removeFromCart(item.id))}
                style={styles.deleteButton}
              >
                <Text style={{ color: 'white' }}>
                  Eliminar
                </Text>
              </TouchableOpacity>

            </View>
          );
        }}
      />

      <Text style={styles.total}>
        Total: ${total.toFixed(2)}
      </Text>

      <TouchableOpacity
        onPress={handlePay}
        style={styles.payButton}
      >
        <Text>Pagar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCancel}
        style={styles.cancelButton}
      >
        <Text style={{ color: 'white' }}>
          Cancelar Compra
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productImage: {
    width: 70,
    height: 70,
  },

  productTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  qtyButton: {
    backgroundColor: '#ddd',
    padding: 6,
    borderRadius: 5,
  },

  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  quantityText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },

  subtotal: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#2e7d32',
  },

  deleteButton: {
    backgroundColor: '#355DA8',
    padding: 8,
    marginTop: 8,
    alignItems: 'center',
    borderRadius: 5,
  },

  total: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },

  payButton: {
    backgroundColor: '#F4CC1B',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },

  cancelButton: {
    backgroundColor: '#355DA8',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});