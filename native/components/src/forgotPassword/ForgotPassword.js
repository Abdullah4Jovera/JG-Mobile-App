import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState(false);
  const [successMessage,setSuccessMessage] =useState(false)

  const scrollViewRef = useRef(null);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setSuccessMessage(false)
        setError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const API_BASE_URL = 'http://mob.lantanapk.com/api/users/forgot-password'; // Example base URL

  const OtpHandler = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (response.ok) {
        setSuccessMessage(true)
        // Handle success response
        setEmail('');
        props.navigation.navigate('OtpVerification', { email });
      } else {
        // Handle error response
        setError(true);
      }
    } catch (error) {
      console.log(error, 'error');
      setError(true);
    }
   
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.loginImageContainer}>
            <Image style={styles.image} source={require('../../../assets/images/loginbg.png')} />
            <TouchableOpacity style={styles.backbuttonContainer} onPress={() => props.navigation.navigate('Register')}>
              <Image source={require('../../../assets/images/backbutton.png')} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Forgot Password?</Text>
              <Text style={styles.welcomeLoginText}>Enter your email address</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <TextInput 
              style={styles.textInput} 
              placeholder='Enter Your Email' 
              value={email} 
              onChangeText={setEmail} 
              keyboardType='email-address'
              name='email'
              autoCapitalize='none'
              onFocus={() => {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
              }}
            />
            <Text style={styles.errorEmail}>{emailError}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={OtpHandler}>
              <Text style={styles.loginText}>Send code</Text>
            </TouchableOpacity>
            <View style={styles.joveraRegister}>
              <Text style={styles.newJovera}>New to JOVERA? 
                <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                  <Text style={styles.registerBtn}> Register Here</Text>
                </TouchableOpacity>
              </Text>
            </View>

              {/* {successMessage && (
                  <View style={styles.successMessage}>
                  <Text style={styles.successText}>Password Reset</Text>
                </View>
              )} */}

            {error && (
              <View style={styles.errorMessage}>
                <Text style={styles.errorTextErr}>An error occurred. Please try again.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <FooterNavbar />
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loginImageContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.3,
    position: 'relative',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    top: '53%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
  },
  welcomeLoginText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  formContainer: {
    paddingHorizontal: 10,
    marginTop: 8,
  },
  textInput: {
    width: '100%',
    height: 55,
    borderColor: '#8B8B8B',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#F3C147',
    width: '100%',
    height: 40,
    borderRadius: 12,
    marginTop: 15,
    justifyContent: 'center',
  },
  loginText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 22,
    textAlign: 'center',
  },
  joveraRegister: {
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerBtn: {
    color: '#D5A847',
    fontWeight: '500',
    fontSize: 16,
  },
  newJovera: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  backbuttonContainer: {
    position: 'absolute',
    top: '20%',
    left: '7%',
  },
  errorMessage: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  errorTextErr: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  errorEmail: {
    color: 'red',
    marginTop: -12,
    paddingHorizontal: 10,
  },
  successMessage: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width:'70%',
  },
  successText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize:16,
    fontWeight:'500'
  },
});
