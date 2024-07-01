import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, ScrollView, SafeAreaView ,ActivityIndicator} from 'react-native';
import Toast from 'react-native-toast-message';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [NameError, setNameError] = useState('');
  const [contactnumberError, setcontactnumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [responseEmail,setResponseEmail]=useState('')
  const [loading, setLoading] = useState(false);
  const [alreadyRegistered,setAlreadyRegistered]=useState('')
  const [ registerationFailed,setRegistrationFailed]=useState('')


  const API_BASE_URL = 'https://outdoors-casinos-achieving-vista.trycloudflare.com/api/users/register'; // Example base URL

  const registerHandler = async () => {
    if (!name || !email || !contactNumber || !password) {
      !name && setNameError('Name is Required');
      !email && setEmailError('Email is Required');
      !contactNumber && setcontactnumberError('Phone Number is Required');
      !password && setPasswordError('Password is Required');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          contactNumber,
          password,
        }),
      });
  
      const responseData = await response.json(); // Parse JSON response
  
      if (response.ok) {
        setName('');
        setEmail('');
        setContactNumber('');
        setPassword('');
        if (responseData.user && responseData.user.email) {
          setResponseEmail(responseData.user.email);
        }
        props.navigation.navigate('OTPLog', { responseEmail: responseData.user.email });
      } else {
        if (response.status === 400) {
          const { error, message } = responseData;
          if (error && message) {
            setAlreadyRegistered(message);
          } else {
            setAlreadyRegistered('User with this email is already registered. Please login.');
          }
          setTimeout(() => {
            setAlreadyRegistered('');
          }, 4000);
        } else {
          setRegistrationFailed('Registration failed. Please try again.');
          setTimeout(() => {
            setRegistrationFailed('');
          }, 4000);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const handleNameChange = (text) => {
    setName(text);
    if (text) setNameError('');
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text) setEmailError('');
  };

  const handleContactNumberChange = (text) => {
    setContactNumber(text);
    if (text) setcontactnumberError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text) setPasswordError('');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.loginImageContainer}>
            <Image style={styles.image} source={require('../../../assets/images/loginbg.png')} />
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Register</Text>
              <Text style={styles.welcomeLoginText}>Create your new account</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.textInput, NameError ? styles.errorBorder : null]}
              placeholder='Name'
              value={name}
              onChangeText={handleNameChange}
              name='name'
            />
            <Text style={styles.errorEmail}>{NameError} </Text>
            <TextInput
             style={[styles.textInput, emailError ? styles.errorBorder : null]}
              placeholder='Email'
              name='email'
              value={email}
              onChangeText={handleEmailChange}
            />
            <Text style={styles.errorEmail}>{emailError} </Text>
            <TextInput
              style={[styles.textInput, contactnumberError ? styles.errorBorder : null]}
              placeholder='Phone'
              name='contactNumber'
              value={contactNumber}
              onChangeText={handleContactNumberChange}
            />
            <Text style={styles.errorEmail}>{contactnumberError} </Text>
            <TextInput
             style={[styles.textInput, passwordError ? styles.errorBorder : null]}
              placeholder='Password'
              name='password'
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
            />
            <Text style={styles.errorEmail}>{passwordError} </Text>
            <Text style={styles.text}>
              By signing up you agree to our{' '}
              <TouchableOpacity onPress={() => { props.navigation.navigate('TermsAndConditions') }}>
                <Text style={styles.link}>Terms & Conditions</Text>
              </TouchableOpacity>
              {' '}and{' '}
              <TouchableOpacity onPress={() => { props.navigation.navigate('PrivacyPolicy') }}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
            </Text>



            {loading ? (
              <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
            ) : (
              <TouchableOpacity style={styles.loginBtn} onPress={registerHandler}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            )}

            {
              alreadyRegistered && (
                <View style={styles.errorViewMessage} >
                  <Text style={styles.userMessage} > {alreadyRegistered && alreadyRegistered} </Text>
                </View>
            )
            }

            {
              registerationFailed && (
                <View style={styles.errorViewMessage} >
                  <Text style={styles.userMessage} > {registerationFailed && registerationFailed} </Text>
                </View>
            )
            }
            <View style={styles.joveraRegister}>
              <Text style={styles.newJovera}>Already have an Account?
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                  <Text style={styles.registerBtn}> Login in</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <FooterNavbar />
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    width:'100%',
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImageContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    top: '53%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  backbuttonContainer: {
    position: 'absolute',
    top: '20%',
    left: '7%',
    right: 0,
    alignItems: 'start',
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
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  forgotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
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
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: -3,
  },
  link: {
    color: '#D5A847',
    textDecorationLine: 'none',
  },
  errorEmail: {
    color: 'red',
    marginTop: -12,
  },
  errorViewMessage:{
    marginTop: 15,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    paddingVertical: 8,
    borderRadius: 10,
    width:'80%',
    marginHorizontal:30
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
