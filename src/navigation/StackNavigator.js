import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1e3a8a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Turismo',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('About')}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  About
                </Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Detalle del Lugar' }}
        />

        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Mis Favoritos ⭐' }}
        />

        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Acerca del Proyecto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}