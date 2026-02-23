import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>TurismoApp</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Integrantes:</Text>
        <Text style={styles.text}>- Alfredo Salazar</Text>
        <Text style={styles.text}>- Yadrick Aguirre</Text>
        <Text style={styles.text}>- Deyfran Aragon</Text>

        <Text style={styles.sectionTitle}>Curso:</Text>
        <Text style={styles.text}>Desarrollo de Aplicaciones Móviles</Text>

        <Text style={styles.sectionTitle}>Profesor:</Text>
        <Text style={styles.text}>Jorge Ruiz</Text>

        <Text style={styles.sectionTitle}>Fecha:</Text>
        <Text style={styles.text}>Febrero 2026</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#2c3e50',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: '#34495e',
  },
});

export default AboutScreen;
