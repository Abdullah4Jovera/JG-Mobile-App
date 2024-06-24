import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Navbar from '../navbar/Navbar';
import { Picker } from '@react-native-picker/picker';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const Settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedStyle, setSelectedStyle] = useState('system');

  const isDarkMode = selectedStyle === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Navbar />
      <View style={styles.containerMain}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Settings</Text>

        <View style={styles.preferencesView}>
          <Text style={[styles.preferences, isDarkMode && styles.darkText]}>PREFERENCES</Text>

          <View style={styles.languagePicker}>
            {isDarkMode ? (
              <Image source={require('../../../assets/images/UIlanguageWhite.png')} style={styles.languageIcon} />
            ) : (
              <Image source={require('../../../assets/images/uilanguage.png')} style={styles.languageIcon} />
            )}
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              style={[styles.dropdownPicker, isDarkMode && styles.darkDropdownPicker]}
            >
              <Picker.Item label="Language" />
              <Picker.Item label="English" value="english" />
              <Picker.Item label="Arabic" value="arabic" />
            </Picker>
          </View>

          <View style={styles.languagePicker}>
            {isDarkMode ? (
              <Image source={require('../../../assets/images/defaultlogowhite.png')} style={styles.languageIcon} />
            ) : (
                <Image source={require('../../../assets/images/defaultlogo.png')} style={styles.languageIcon} />
            )}
            
            <Picker
              selectedValue={selectedStyle}
              onValueChange={(itemValue) => setSelectedStyle(itemValue)}
              style={[styles.dropdownPicker, isDarkMode && styles.darkDropdownPicker]}
            >
              <Picker.Item label="Display Style" />
              <Picker.Item label="System (Default)" value="system" />
              <Picker.Item label="Dark" value="dark" />
              <Picker.Item label="Light" value="light" />
            </Picker>
          </View>

        </View>
      </View>
      <FooterNavbar />
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  containerMain: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
  settingText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 40,
  },
  darkText: {
    color: '#FFFFFF',
  },
  preferencesView: {
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 30,
  },
  preferences: {
    fontSize: 20,
    fontWeight: '500',
  },
  languagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownPicker: {
    flex: 1,
  },
  darkDropdownPicker: {
    color: '#FFFFFF',
  },
//   languageIcon: {
//     marginRight: 5,
//   },
});
