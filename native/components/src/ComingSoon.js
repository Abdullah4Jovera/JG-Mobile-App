import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from './navbar/Navbar'
import FooterNavbar from './footerNavbar/FooterNavbar'

const ComingSoon = () => {
  return (
    <View style={styles.container}>
        <Navbar/>
        <View style={styles.cmingsoontext} >

        <Text style={styles.text} >Coming Soon</Text>
        </View>
    </View>
  )
}

export default ComingSoon

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
      
      },
      cmingsoontext:{
        paddingTop:40,
          justifyContent:'center',
            alignItems:'center'
      },
      text:{
        fontSize:24,
        fontWeight:'700',
      }
})