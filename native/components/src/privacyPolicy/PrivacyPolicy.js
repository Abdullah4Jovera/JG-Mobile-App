import { StyleSheet, Text, View,ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import Navbar from '../navbar/Navbar'
import FooterNavbar from '../footerNavbar/FooterNavbar'

const PrivacyPolicy = () => {
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
              <Text style={styles.businessText} >PRIVACY POLICY</Text>
                <Text style={styles.BusinessGeneralText}>
                  Our Privacy Policy outlines how we collect, use, share, and protect your personal information when you use our website. 
                   By using our website, you agree to these practices.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                  Information Collection: We collect personal information, such as name, contact details, and email address, provided through contact forms or subscription services.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                Use of Information: We use this information to respond to inquiries, provide requested information, improve services, and may send promotional materials.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                Sharing of Information: We don’t sell, trade, or rent your personal information but may share it with trusted third-party service providers under strict confidentiality agreements.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                Cookies and Tracking: Our website may use cookies to enhance user experience, analyse usage patterns, and improve functionality. You can control cookie usage 
                through browser settings.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                Data Security: While we take reasonable measures to protect your information, we can't guarantee absolute security due to the nature of internet transmission.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                Links to External Sites: We aren’t responsible for the content or privacy practices of external sites linked on our website. Review their privacy policies before providing personal information.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                Children’s Privacy: Our services aren’t directed at children under 13, and we don’t knowingly collect personal information from them.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                Changes to Privacy Policy: We may update the policy periodically, with changes posted on our website.
                </Text>
                <Text style={styles.BusinessGeneralText}>
                Contact Us: For questions or concerns about our Privacy Policy, contact us at [contact].
                By using our website, you acknowledge reading and understanding our Privacy Policy. If you disagree with our practices, please refrain from using our website.
                </Text>
            </View>
            {/* </ScrollView> */}
        </ImageBackground>
        <FooterNavbar/>
    </View>
  )
}
export default PrivacyPolicy

const styles = StyleSheet.create({
    container: {
        flex: 9,
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'start',
        alignItems: 'center',
    },
    scrollViewContent: {
      paddingVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    businessText:{
        marginTop:5,
        textAlign:'center',
        fontSize:24, 
        textTransform:'uppercase',
        color:'#FFFFFF',
        fontWeight:'700',
        marginBottom:10,
    },
    businessFinanceDetail:{
      width: '100%',
      height:'100%',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // borderRadius: 10,
      
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
      }

})



