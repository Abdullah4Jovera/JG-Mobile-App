import { StyleSheet, Text, View,ImageBackground,ScrollView } from 'react-native'
import React from 'react'
import Navbar from '../navbar/Navbar'
import FooterNavbar from '../footerNavbar/FooterNavbar'

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Navbar/>
          <ImageBackground 
            source={require('../../../assets/images/businessimage.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.businessFinanceDetail} >
                  <Text style={styles.businessText} >ABOUT US</Text>
                    <Text style={styles.BusinessGeneralText}>
                        Who we are : Founded in 2013 in the UAE, Jovera Group has rapidly become a key player in real estate and financial services. Known for excellence and innovation, 
                        the company offers a broad range of services tailored to the dynamic UAE market, including real estate investments, property management, and financial advisory services.
                    </Text>
                    <Text style={styles.BusinessGeneralText}>
                        Jovera Group's seasoned professionals provide integrated solutions, leveraging their extensive experience to navigate complex market demands.
                        The company's strong relationships with clients and partners are built on a foundation of integrity and client satisfaction.
                    </Text>
                    <Text style={styles.BusinessGeneralText}>
                        Dedicated to helping individuals and businesses achieve their real estate and financial goals, Jovera Group’s journey is marked by growth, innovation, and a 
                        steadfast commitment to excellence, making it a trusted name in the UAE.
                    </Text>
                    <Text style={styles.BusinessGeneralText}>
                        Vision and Mission: Our Vision is to be the leading and most trusted real estate and banking services company. We prioritize our clients by providing tailored
                        solutions and building long-term relationships through trust and professionalism. We aim to be known for exceptional customer service and commitment to helping 
                        clients achieve their financial goals
                    </Text>
                    <Text style={styles.BusinessGeneralText}>
                        Our Mission is to offer exceptional financial services and help clients achieve their financial goals. We believe everyone deserves access to affordable, 
                        reliable financial services. We provide a range of services, including real estate, mortgage, business banking, and personal loans, to meet the unique needs of our 
                        clients.
                    </Text>

                    <Text style={styles.chooseUs}>Why Choose Us:</Text>
                    <Text style={styles.BusinessGeneralText}>1. Experienced Professionals.</Text>
                    <Text style={styles.BusinessGeneralText}>2. Range of Services.</Text>
                    <Text style={styles.BusinessGeneralText}>3. Competitive Rates.</Text>
                    <Text style={styles.BusinessGeneralText}>4. Exceptional Customer Service.</Text>
                    <Text style={styles.BusinessGeneralText}>5. Commitment to Our Clients</Text>
                
                </View>
            </ScrollView>
        </ImageBackground>
        <FooterNavbar/>
    </View>
  )
}

export default AboutUs

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
        marginTop:5,
        textAlign:'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize:24, 
        textTransform:'uppercase',
        color:'#FFFFFF',
        fontWeight:'700'
    },
    businessFinanceDetail:{
      width: '100%',
      height:'100%',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // borderRadius: 10,
       // marginVertical: 15,
    },
    BusinessGeneralText:{
        color:'#FFFFFF',
        fontWeight:'700', 
        fontSize:12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5,
        marginBottom:10,
        textAlign:'justify'
    },
    scrollViewContent: {
        // paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
    applybtn: {
        width: 100, 
        height: 50, 
        borderRadius: 50, 
        backgroundColor: '#D9D9D9', 
        justifyContent: 'center', 
        alignItems: 'center', marginTop:120,
      },
      applybtnText: {
        color: '#FFFFFF', 
        fontSize: 16, 
        fontWeight: 'bold', 
        
      },
      applytext:{
        fontSize:15, 
        fontWeight:'700'
      },
      chooseUs:{
        color:'#FFFFFF',
        fontWeight:'700', 
        fontSize:12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        marginBottom:5
      }

})