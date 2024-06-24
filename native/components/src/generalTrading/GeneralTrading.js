import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Navbar from '../navbar/Navbar';

const GeneralTradingHomePage = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.comingSoonText}>
          <Text style={styles.text}>Coming Soon</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default GeneralTradingHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
  },
  comingSoonText: {
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
