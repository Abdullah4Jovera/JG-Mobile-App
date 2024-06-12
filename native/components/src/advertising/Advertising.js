import { StyleSheet, Text, View,ImageBackground,  TouchableOpacity } from 'react-native'
import React from 'react'
import Navbar from '../navbar/Navbar'
import FooterNavbar from '../footerNavbar/FooterNavbar'

const Advertising = () => {
  return (
    <View style={styles.container}>
      <Navbar/>
        <ImageBackground 
        source={require('../../../assets/images/businessimage.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
        >
            <View style={styles.businessFinanceDetail} >
            <Text style={styles.businessText} >advertisement</Text>
                <Text style={styles.BusinessGeneralText}>
                  At our advertising agency, we're more than just marketers – we're storytellers, strategists, and solution-seekers. With a blend of creativity and expertise, 
                  we craft campaigns that resonate with your audience and drive meaningful results. From captivating content creation to targeted ad placements, we're dedicated 
                  to elevating your brand's presence across all channels. Partner with us and let's embark on a journey to success together.
                </Text>
            <TouchableOpacity style={styles.applybtn} >
                <Text style={styles.applytext} >Learn More</Text>
            </TouchableOpacity>
              </View>

        </ImageBackground>
        <FooterNavbar/>
    </View>
  )
}

export default Advertising

const styles = StyleSheet.create({
    container: {
        flex: 9,
        backgroundColor: '#FFFFFF',
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'start',
        alignItems: 'center',
    },
    businessText:{
      marginTop:10,
      textAlign:'center',
      fontSize:24, 
      textTransform:'uppercase',
      color:'#FFFFFF',
      fontWeight:'700'
    },
    businessFinanceDetail:{
      width: '100%',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height:'100%'
      // borderRadius: 10,
      // marginVertical: 10,
    },
    BusinessGeneralText:{
        color:'#FFFFFF',
        fontWeight:'700', 
        fontSize:12,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'justify'
    },
    applybtn: {
      backgroundColor: '#D9D9D9',
      width: '80%',
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
      marginHorizontal:30
      },
      applybtnText: {
        color: '#FFFFFF', 
        fontSize: 16, 
        fontWeight: 'bold', 
        
      },
      applytext:{
        fontSize:15, 
        fontWeight:'700',
        textAlign:'center'
      }

})