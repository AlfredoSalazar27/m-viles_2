import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { setUser } from '../redux/slices/authSlice';

export default function Login({ navigation }) {

  const dispatch = useDispatch();

// Estados locales para manejar el usuario y contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 🔥 AUTO LOGIN
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const savedUser = await AsyncStorage.getItem('username');

      if (token) {
        dispatch(setUser({ user: savedUser, token }));
        navigation.replace('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
// Función que valida las credenciales del usuario
// y guarda la sesión en almacenamiento local
  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      const token = response.data.token;

      // Guardar en Redux
      dispatch(setUser({ user: username, token }));

      // Guardar en AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('username', username);

      navigation.replace('Home');

    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Fake Store Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#355DA8',
          padding: 15,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}