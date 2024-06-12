import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Image source={require('../../../assets/images/navbarlogo.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Image source={require('../../../assets/images/Notificationlogo.png')} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>☰</Text>
        </TouchableOpacity> */}
      </View>
      
      {/* {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.dropdownMenuItem}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.dropdownMenuItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
            <Text style={styles.dropdownMenuItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  navbar: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 8,
  },
  // dropdownButton: {
  //   padding: 10,
  // },
  // dropdownButtonText: {
  //   fontSize: 24,
  // },
  // dropdownMenu: {
  //   position: 'absolute',
  //   top: 80,
  //   right: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 5,
  //   elevation: 5,
  //   zIndex: -10,
  // },
  // dropdownMenuItem: {
  //   padding: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#ccc',
  // },
});
