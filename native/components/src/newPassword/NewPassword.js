import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPassword = (props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { route } = props;
  const { email } = route.params; // Get email from navigation parameters
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken !== null) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  const API_BASE_URL = 'https://outdoors-casinos-achieving-vista.trycloudflare.com/api/users/reset-password'; // Example base URL

  const SubmitHandler = async () => {
    try {
      setLoading(true); 
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
          token: token,
        }),
      });
      if (response.ok) {
        await AsyncStorage.removeItem('token');
      }
    } catch (error) {
      console.log(error, 'error');
    }
    finally {
      setLoading(false); 
    }
    props.navigation.navigate('Login');
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.loginImageContainer}>
            <Image style={styles.image} source={require('../../../assets/images/loginbg.png')} />
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>New Password</Text>
              <Text style={styles.welcomeLoginText}>Enter New Password</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter New Password'
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              name='newPassword'
              autoCapitalize='none'
              secureTextEntry
            />
            <TextInput
              style={styles.textInput}
              placeholder='Confirm password'
              name='confirmPassword'
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
              autoCapitalize='none'
            />

            {loading ? (
              <ActivityIndicator size="large" color="#F3C147" style={{ marginTop: 20 }} />
              ) : (
                <TouchableOpacity style={styles.loginBtn} onPress={SubmitHandler}>
                <Text style={styles.loginText}>Submit</Text>
              </TouchableOpacity>
              )}

          </View>



        </View>
      </ScrollView>

      <FooterNavbar />
    </>
  );
}

export default NewPassword;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loginImageContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4, // 50% of the screen height
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
    top: '60%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 35,
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
    fontWeight: '500',
  },
  backbuttonContainer: {
    position: 'absolute',
    top: '25%',
    left: '7%',
    alignItems: 'flex-start',
  },
  forgotContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  loginBtn: {
    backgroundColor: '#F3C147',
    width: '100%',
    height: 40,
    borderRadius: 12,
    marginTop: 5,
    justifyContent: 'center',
  },
  loginText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 22,
    textAlign: 'center',
  },
});

