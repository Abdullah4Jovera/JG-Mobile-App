import { StyleSheet, Text, View,ImageBackground, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import Navbar from '../navbar/Navbar'
import FooterNavbar from '../footerNavbar/FooterNavbar'

const TravelTours = () => {
  return (
    <View style={styles.container}>
      <Navbar/>
    
      <ImageBackground 
        source={require('../../../assets/images/businessimage.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
        >
            {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
            <View style={styles.businessFinanceDetail} >
             <Text style={styles.businessText} >travel & tours</Text>
                <Text style={styles.BusinessGeneralText}>
                Embark on the adventure of a lifetime with our bespoke travel and tours services. At our agency, we curate unforgettable experiences tailored to your 
                preferences and desires. From exploring exotic destinations to immersing yourself in local culture, we specialize in crafting personalized itineraries that 
                exceed expectations.
                </Text>

                <Text style={styles.BusinessGeneralText}>
                Our team of travel experts ensures every detail is meticulously planned, leaving you free to relax and enjoy the journey. Whether you're seeking a romantic getaway,
                 a family adventure, or a solo expedition, we're here to turn your travel dreams into reality.
                </Text>

                <Text style={styles.BusinessGeneralText}>
                With access to exclusive accommodations, insider knowledge, and seamless logistics, we're your trusted partner in travel. Let us guide you to hidden gems, iconic landmarks, and unforgettable moments around the globe.
                Experience the world in a whole new way – contact us today and let the adventure begin.
                </Text>
            <TouchableOpacity style={styles.applybtn} >
                <Text style={styles.applytext} >Learn More</Text>
            </TouchableOpacity>
            </View>

            {/* </ScrollView> */}
        </ImageBackground>
        <FooterNavbar/>
    </View>
  )
}

export default TravelTours

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
      textAlign: 'center', 
      fontSize:24, 
      textTransform:'uppercase',
      color:'#FFFFFF',
      fontWeight:'700',
      marginBottom:10
    },
    businessFinanceDetail:{
      width: '100%',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 10,
      // marginVertical: 10,
      lineHeight:30,
      height:'100%'
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
      },
      scrollViewContent: {
        alignItems: 'center',
        paddingVertical: 20,
      },

})