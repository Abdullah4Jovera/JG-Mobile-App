import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const OTPLog = (props) => {
  const [otp, setOtp] = useState('');
  const { route } = props;
  const { responseEmail } = route.params;

  const [otpInputs, setOtpInputs] = useState([...Array(4).keys()].map(() => useRef()));
  const [showResendButton, setShowResendButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResendButton(true);
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }, []);

  const API_BASE_URL = 'https://outdoors-casinos-achieving-vista.trycloudflare.com/api/users/verify-otp-log'; // Example base URL

  const VerifyOtp = async () => {
    try {
      setLoading(true); 
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: responseEmail,
          otp: otp,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        await AsyncStorage.setItem('userData', JSON.stringify(responseData.user));
        setOtp('');
        props.navigation.navigate('Dashboard');
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(false); // Reset loading when API request is complete
    }
  };

  const handleOtpChange = (index, value) => {
    setOtp(prevOtp => {
      let newOtp = prevOtp.substring(0, index) + value + prevOtp.substring(index + 1);
      if (value !== '' && index < otpInputs.length - 1) {
        otpInputs[index + 1].current.focus();
      }
      return newOtp;
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>OTP Verification</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/images/OTPImage.png')}
              style={styles.otpImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.otpText}>Enter OTP</Text>
          <Text style={styles.digiitCode}>A 4 digit code has been sent to your email</Text>

          <View style={styles.textField}>
            {otpInputs.map((ref, index) => (
              <TextInput
                key={index}
                ref={ref}
                style={styles.textInput}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(text) => handleOtpChange(index, text)}
                value={otp[index] || ''}
                onFocus={() => {
                  if (index === 0) {
                    setOtp('');
                  }
                }}
              />
            ))}
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#F3C147" style={{ marginTop: 20 }} />
          ) : (
            <TouchableOpacity style={styles.VerifyBtn} onPress={() => VerifyOtp()} >
              <Text style={styles.VerifyText}>Verify</Text>
            </TouchableOpacity>
          )}

          {showResendButton && (
            <TouchableOpacity style={styles.ResendBtn}>
              <Text style={styles.VerifyText}>Resend OTP</Text>
            </TouchableOpacity>
          )}

        </View>
      </ScrollView>
      <FooterNavbar />
    </>
  );
};

export default OTPLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 40
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  otpImage: {
    width: '100%',
    height: height * 0.2,
  },
  otpText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10
  },
  digiitCode: {
    color: '#575757',
    fontSize: 16,
    fontWeight: '500',
  },
  textInput: {
    width: '22%',
    height: '100%',
    maxHeight: 70,
    borderRadius: 14,
    fontSize: 45,
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    textAlign: 'center',
    fontWeight: '700',
    marginLeft: 5,
  },
  textField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  VerifyBtn: {
    backgroundColor: '#F3C147',
    width: '60%',
    marginHorizontal: 60,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 15,
  },
  ResendBtn: {
    backgroundColor: '#F3C147',
    width: '60%',
    marginHorizontal: 60,
    height: 40,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: 'center',
  },
  VerifyText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
