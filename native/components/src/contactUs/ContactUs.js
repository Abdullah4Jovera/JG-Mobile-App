import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,  ScrollView, ActivityIndicator } from 'react-native'
import Navbar from '../navbar/Navbar'
import FooterNavbar from '../footerNavbar/FooterNavbar'

const ContactUs = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage,setSuccessMessage]=useState('')
  const [feedbackError,setFeedBackError]=useState('')

 // API Call
  const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/contacts/contact-us';
  const contactUsHandler =async () => {
    try {
      setLoading(true)
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: text,
        }),
        
      });
      if (response.ok) {
        setSuccessMessage('Your message has been sent successfully!')
      }else {
        setFeedBackError('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.log(error,'err')
      setFeedBackError(error.message || 'Message Failed to send')
    }
    finally{
      setLoading(false)
    }
    setName('')
    setEmail('')
    setPhone('')
    setText('')
  }

  useEffect(() => {
    let timer;
    if (successMessage || feedbackError) {
      timer = setTimeout(() => {
        setSuccessMessage(false);
        setFeedBackError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [successMessage, feedbackError]);

  return (
    <View style={styles.container}>
      <Navbar/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.contactUsText}>Contact Us</Text>
        <Text style={styles.remarks}>Any question or remarks? Feel free to write us a message.</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Your Message Here..."
            name='message'
            multiline={true}
            numberOfLines={2}
            onChangeText={(newText) => setText(newText)}
            value={text}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={()=>contactUsHandler()} >
            {
              loading ? <><ActivityIndicator size="small" color="black" style={styles.spinner}/></> : <Text style={styles.submitText}>Submit</Text>
            }
          </TouchableOpacity>
          {
            successMessage && 
              <View style={styles.successMessage}>
                <Text  style={styles.successText}> {successMessage && successMessage} </Text>
              </View>
          }

          {feedbackError && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorTextErr}> {feedbackError && feedbackError} </Text>
          </View>
          )}
           
          <Text style={styles.companyContact}>Company Contact</Text>
          <View style={styles.contactInfo}>
            <View style={styles.helplineText}>
              <Image source={require('../../../assets/images/helpline.png')} />
              <View style={styles.helpNumberView}>
                <Text style={styles.helpText}>Helpline Number</Text>
                <Text style={styles.helpNumber}>800-664000</Text>
              </View>
            </View>
            <View style={styles.helplineText}>
              <Image source={require('../../../assets/images/email.png')} />
              <View style={styles.helpNumberView}>
                <Text style={styles.helpText}>Email</Text>
                <Text style={styles.helpEmail}>info@jovera.ae</Text>
              </View>
            </View>
          </View>
          <Text style={styles.locationText}>Location</Text>
          <View style={styles.locationView}>
            <Image source={require('../../../assets/images/location.png')} />
            <View style={styles.locationBuilding}>
              <View style={styles.locationOne}>
                <Text>Location 1: </Text>
                <Text>to view on map <Text> Click Here</Text> </Text>
              </View>
              <Text style={styles.locationAddress}>8th Floor, Al Jazira Club Tower A, Al Muroor St, Abu Dhabi, UAE</Text>
            </View>
          </View>
          <View style={styles.locationView}>
            <Image source={require('../../../assets/images/location.png')} />
            <View style={styles.locationBuilding}>
              <View style={styles.locationOne}>
                <Text>Location 2: </Text>
                <Text>to view on map <Text> Click Here</Text> </Text>
              </View>
              <Text style={styles.locationAddress}>MM2 - Al Faisal Building, Hafiz Ibrahim Street, Nuaimeya 1 Ajman</Text>
            </View>
          </View>
          <View style={styles.locationView}>
            <Image source={require('../../../assets/images/location.png')} />
            <View style={styles.locationBuilding}>
              <View style={styles.locationOne}>
                <Text>Location 3: </Text>
                <Text>to view on map <Text> Click Here</Text> </Text>
              </View>
              <Text style={styles.locationAddress}>8th Floor, Al Jazira Club Tower A, Al Muroor St, Abu Dhabi, UAE</Text>
            </View>
          </View>
          <View style={styles.socialContact}>
            <TouchableOpacity>
              <Image source={require('../../../assets/images/LinkedIn.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../../assets/images/YouTube.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../../assets/images/Facebook.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../../assets/images/Instagrams.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../../assets/images/WhatsApp.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../../assets/images/Tiktoks.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
        <FooterNavbar/>
    </View>
  )
}

export default ContactUs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  contactUsText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
  },
  remarks: {
    fontSize: 12,
    fontWeight: '500',
    color: '#717171',
    marginTop: 5,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textInput: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderColor: '#8B8B8B',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#F3C147',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 46,
    marginTop: 20,
  },
  submitText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  companyContact: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 22,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helplineText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  helpText: {
    fontSize: 14,
    fontWeight: '500',
  },
  helpNumber: {
    fontSize: 18,
    fontWeight: '300',
  },
  helpEmail: {
    fontSize: 18,
    fontWeight: '300',
    textDecorationLine: 'underline',
  },
  helpNumberView: {
    marginLeft: 5,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 15,
  },
  locationOne: {
    flexDirection: 'row',
  },
  locationAddress: {
    fontSize: 10,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  locationBuilding: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  socialContact: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  textArea: {
    padding: 10,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#8B8B8B',
    borderWidth: 1,
  },
  successMessage: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width:'100%',
  },
  successText: {
    color: 'white',
    textAlign: 'center',
    fontSize:14,
    fontWeight:'500'
  },
  errorMessage: {
    marginTop: 10,
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width:'100%'
  },
  errorTextErr: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize:14,
    fontWeight:'500'
  },
})
