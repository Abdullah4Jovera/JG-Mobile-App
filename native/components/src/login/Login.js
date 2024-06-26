import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, Pressable,  ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const Login = (props) => {
  const [emailOrContact, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError,setPasswordError] = useState('')
  const [emailError,setEmailError] = useState('')
  const [error,setError]= useState('')
  const [errorEmailNotVerified,setErrorEmailNotVerified]= useState('')
  const [loading, setLoading] = useState(false);

  // API Call
  const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/users/login'; // Example base URL

  useEffect(() => {
    if (errorEmailNotVerified) {
      const timeout = setTimeout(() => {
        setErrorEmailNotVerified('');
        props.navigation.navigate('OTPLog', { responseEmail: emailOrContact });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorEmailNotVerified]);
  

  const LoginHandler = async () => {
    if (!emailOrContact || !password) {
      !emailOrContact && setEmailError('Email is Required');
      !password && setPasswordError('Password is Required');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrContact,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if(response.status === 401) {
          setErrorEmailNotVerified('Email is not verified');      
        } else {
          throw new Error(data.message || 'Login failed');
        }
      } else {
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        const myValue = await AsyncStorage.getItem('userData');
        props.navigation.navigate('Dashboard');
      }
    } 
    catch (error) {
      setError(error.message);
      setTimeout(() => setError(''), 4000);
    }
      finally {
      setLoading(false);
    }
    setEmail('')
    setPassword('')
  };

  const RegisterHandler = () => {
    props.navigation.navigate('Register')
  }

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text) setEmailError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text) setPasswordError('');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.loginImageContainer}>
            <Image style={styles.image} source={require('../../../assets/images/loginbg.png')} />
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Login</Text>
              <Text style={styles.welcomeLoginText}>Login to your Account</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.textInput, emailError ? styles.errorBorder : null]}
              placeholder='Enter Email or Phone'
              value={emailOrContact}
              onChangeText={handleEmailChange}
              keyboardType='emailOrContact-address'
              name='emailOrContact'
            />
            <Text style={styles.errorEmail}>{emailError} </Text>
            <TextInput
                style={[styles.textInput, passwordError ? styles.errorBorder : null]}
              placeholder='Password'
              name='password'
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
            />
            <Text style={styles.errorEmail}>{passwordError} </Text>
            <TouchableOpacity style={styles.forgotContainer} onPress={() => props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            {loading ? (
              <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
            ) : (
              <TouchableOpacity style={styles.loginBtn} onPress={LoginHandler}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            )}

            

            {
              errorEmailNotVerified && (
                <View style={styles.errorViewMessage} >
                  <Text style={styles.userMessage} > {errorEmailNotVerified && errorEmailNotVerified} </Text>
                </View>
            )
            }

            {
              error && (
                <View style={styles.errorViewMessage} >
                  <Text style={styles.userMessage} > {error && error} </Text>
                </View>
            )
            }

            <View style={styles.joveraRegister}>
              <Text style={styles.newJovera}>New to JOVERA ?
                <TouchableOpacity onPress={RegisterHandler}>
                  <Text style={styles.registerBtn}> Register Here</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <FooterNavbar />
    </>
  );
}
            
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Padding bottom to avoid the footer overlapping the content
  },
  loginImageContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    flexShrink: 0,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  textContainer: {
    position: 'absolute',
    top: '55%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
  },
  welcomeLoginText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop:8
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
  forgotPassword: {
    color: '#D5A847',
    fontSize: 14,
    fontWeight: '400'
  },
  forgotContainer: {
    display: 'flex', alignItems: 'flex-end'
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
    textAlign: 'center'
  },
  joveraRegister: {
    marginTop: 30,
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
  errorEmail: {
    color: 'red',
    marginTop: -12
  },
  errorViewMessage:{
    marginTop: 15,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    paddingVertical: 8,
    borderRadius: 10,
    width:'60%',
    marginHorizontal:65
  },
  userMessage:{
    color:'black',
    textAlign:'center',
    fontWeight:'500'
  },
  errorBorder: {
    borderColor: 'red',
  },
});


