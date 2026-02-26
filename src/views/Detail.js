import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

export default function Detail({ route, navigation }) {

  
  // Agrega el producto seleccionado al carrito utilizando Redux
  const { product } = route.params;
  const dispatch = useDispatch();

  // Agrega el producto seleccionado al carrito utilizando Redux
  const handleAdd = () => {
    dispatch(addToCart(product));

    Alert.alert(
      "Producto agregado",
      "Se agregó correctamente al carrito",
      [
        {
          text: "Ir al Carrito",
          onPress: () => navigation.navigate("Cart")
        },
        {
          text: "Seguir Comprando",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>

      <Image
        source={{ uri: product.image }}
        style={{ width: 200, height: 200, alignSelf: 'center' }}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
        {product.title}
      </Text>

      <Text style={{ marginTop: 5 }}>
        Categoría: {product.category}
      </Text>

      <Text style={{ marginVertical: 10 }}>
        {product.description}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        ${product.price}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleAdd}
        style={{
          backgroundColor: '#355DA8',
          padding: 15,
          marginTop: 20,
          alignItems: 'center',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Agregar al Carrito
        </Text>
      </TouchableOpacity>

    </View>
  );
}