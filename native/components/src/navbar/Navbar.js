import { StyleSheet, Text, View,Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const Navbar = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container} >
        <View style={styles.navbar}>

          <TouchableOpacity  onPress={() => navigation.navigate('Login')} >
            <Image source={require('../../../assets/images/navbarlogo.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MianScreen')} >
            <Image source={require('../../../assets/images/Notificationlogo.png')} />
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Navbar
       
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
        paddingTop: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',paddingBottom:8
      },
})
